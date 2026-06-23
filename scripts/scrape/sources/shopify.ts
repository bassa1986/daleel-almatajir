import * as cheerio from 'cheerio';
import { fetchHtml } from '../lib/fetch';
import type { PlatformScraper, ScrapedPricingTier } from '../lib/types';

/**
 * Shopify pricing scraper. See salla.ts for the explanation of why
 * selectors need manual verification before this is trusted.
 *
 * NOTE: Shopify's pricing page shows USD by default and may localize
 * based on IP/locale. If you need SAR specifically, consider fetching
 * the locale-specific URL (e.g. https://www.shopify.com/sa/pricing if
 * it exists) or convert from USD using a fixed/approximate FX rate —
 * but a converted price is an *estimate*, not Shopify's actual SAR
 * pricing. Mark converted tiers clearly via the `notes` field.
 */

const SOURCE_URL = 'https://www.shopify.com/pricing';

async function scrape(): Promise<ScrapedPricingTier[]> {
  const result = await fetchHtml(SOURCE_URL);
  if (!result.ok) {
    throw new Error(result.reason);
  }

  const $ = cheerio.load(result.html);
  const tiers: ScrapedPricingTier[] = [];

  // TODO: verify against the live page. Shopify's marketing site is a
  // heavily-componentized React/Hydrogen app — the real pricing data
  // may be server-rendered into the HTML, or may load client-side via
  // JS, in which case a simple HTML fetch won't see it. If tiers come
  // back empty, that's likely why — consider Playwright/Puppeteer
  // (headless browser) for this source instead of raw fetch+cheerio.
  $('[data-pricing-card], .pricing-card, .plan-card').each((_, el) => {
    const card = $(el);
    const nameEn = card.find('.plan-name, [data-plan-name]').first().text().trim();
    const priceText = card
      .find('.plan-price, [data-plan-price]')
      .first()
      .text()
      .replace(/[^\d.]/g, '');
    const monthlyFeeUSD = parseFloat(priceText);

    if (!nameEn || Number.isNaN(monthlyFeeUSD)) return;

    // Approximate USD->SAR conversion (SAR is pegged ~3.75 to USD).
    // This is an ESTIMATE — flagged via notes, not authoritative.
    const monthlyFeeSAR = Math.round(monthlyFeeUSD * 3.75 * 100) / 100;

    tiers.push({
      name: nameEn,
      nameAr: nameEn,
      monthlyFeeSAR,
      transactionFeePct: 0,
      perOrderFee: 0,
      notes: `Converted from $${monthlyFeeUSD} USD at ~3.75 SAR/USD — verify against Shopify's actual SAR pricing if available.`,
    });
  });

  return tiers;
}

export const shopifyScraper: PlatformScraper = {
  platformSlug: 'shopify',
  sourceUrl: SOURCE_URL,
  scrape,
};
