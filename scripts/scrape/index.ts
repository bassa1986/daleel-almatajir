/**
 * Platform Pricing Scraper — Orchestrator
 * ========================================
 *
 * Usage:
 *   npm run scrape:dry      # fetch + parse + write JSON report only (SAFE, default)
 *   npm run scrape:apply    # fetch + parse + upsert PricingTier rows into the DB
 *
 * Why dry-run by default: a broken CSS selector after a site redesign could
 * otherwise silently write $0 prices or garbage data into your live
 * database. Always review the JSON report (scripts/scrape/output/*.json)
 * after a site's HTML structure might have changed, before applying.
 *
 * WooCommerce and PrestaShop are intentionally NOT included here — both are
 * free, open-source software where the real cost is hosting + paid
 * extensions, which doesn't fit a "pricing tier" scrape. Their costs are
 * modeled as HiddenCost scenarios in this project and should stay manually
 * curated. See prisma/seed.ts for how they're structured.
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { sallaScraper } from './sources/salla';
import { zidScraper } from './sources/zid';
import { shopifyScraper } from './sources/shopify';
import { bigcommerceScraper } from './sources/bigcommerce';
import type { PlatformScraper, ScrapeResult } from './lib/types';

const scrapers: PlatformScraper[] = [sallaScraper, zidScraper, shopifyScraper, bigcommerceScraper];

const APPLY = process.argv.includes('--apply');

async function runScraper(scraper: PlatformScraper): Promise<ScrapeResult> {
  const scrapedAt = new Date().toISOString();
  try {
    const tiers = await scraper.scrape();
    if (tiers.length === 0) {
      return {
        platformSlug: scraper.platformSlug,
        sourceUrl: scraper.sourceUrl,
        scrapedAt,
        status: 'skipped',
        reason: 'No pricing tiers parsed — selectors likely need updating for this site.',
        tiers: [],
      };
    }
    return {
      platformSlug: scraper.platformSlug,
      sourceUrl: scraper.sourceUrl,
      scrapedAt,
      status: 'ok',
      tiers,
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return {
      platformSlug: scraper.platformSlug,
      sourceUrl: scraper.sourceUrl,
      scrapedAt,
      status: 'error',
      reason,
      tiers: [],
    };
  }
}

async function applyToDatabase(prisma: PrismaClient, results: ScrapeResult[]) {
  for (const result of results) {
    if (result.status !== 'ok') continue;

    const platform = await prisma.platform.findUnique({ where: { slug: result.platformSlug } });
    if (!platform) {
      console.warn(`⚠️  Platform "${result.platformSlug}" not found in DB — skipping. Add it in /admin first.`);
      continue;
    }

    // Replace this platform's pricing tiers atomically: delete old, insert new.
    // This keeps tier ordering/data consistent rather than trying to diff/merge.
    await prisma.$transaction([
      prisma.pricingTier.deleteMany({ where: { platformId: platform.id } }),
      prisma.pricingTier.createMany({
        data: result.tiers.map((tier, index) => ({
          platformId: platform.id,
          name: tier.name,
          nameAr: tier.nameAr,
          minRevenueSAR: tier.minRevenueSAR ?? 0,
          maxRevenueSAR: tier.maxRevenueSAR,
          monthlyFeeSAR: tier.monthlyFeeSAR,
          transactionFeePct: tier.transactionFeePct ?? 0,
          perOrderFee: tier.perOrderFee ?? 0,
          maxOrders: tier.maxOrders,
          annualRevLimitSAR: tier.annualRevLimitSAR,
          sortOrder: index,
        })),
      }),
    ]);

    console.log(`✓ Updated ${result.tiers.length} pricing tier(s) for "${result.platformSlug}"`);
  }
}

async function main() {
  console.log(`\n=== Daleel Al-Matajir Pricing Scraper ===`);
  console.log(`Mode: ${APPLY ? 'APPLY (writing to database)' : 'DRY RUN (report only)'}\n`);

  const results: ScrapeResult[] = [];
  for (const scraper of scrapers) {
    console.log(`Scraping ${scraper.platformSlug}...`);
    const result = await runScraper(scraper);
    results.push(result);

    if (result.status === 'ok') {
      console.log(`  ✓ ${result.tiers.length} tier(s) found`);
    } else {
      console.log(`  ✗ ${result.status}: ${result.reason}`);
    }
  }

  // Always write the JSON report, even in apply mode, for an audit trail.
  const outputDir = path.join(__dirname, 'output');
  fs.mkdirSync(outputDir, { recursive: true });
  const reportPath = path.join(outputDir, `scrape-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nReport written to: ${reportPath}`);

  const okCount = results.filter((r) => r.status === 'ok').length;
  const skippedOrErrored = results.length - okCount;

  if (skippedOrErrored > 0) {
    console.log(
      `\n⚠️  ${skippedOrErrored} source(s) skipped or errored. Check the report and update selectors as needed.`
    );
  }

  if (APPLY) {
    if (okCount === 0) {
      console.log('\nNothing to apply — no sources returned valid data.');
      return;
    }
    console.log(`\nApplying ${okCount} successful result(s) to the database...`);
    const prisma = new PrismaClient();
    try {
      await applyToDatabase(prisma, results);
    } finally {
      await prisma.$disconnect();
    }
    console.log('\n✓ Database updated.');
  } else {
    console.log('\nDry run complete. Review the report, then re-run with --apply to write to the database.');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
