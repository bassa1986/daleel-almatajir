// =============================================================
// ONE-TIME SEED ENDPOINT — /api/admin/seed
//
// Populates: feature categories, 6 platforms (with pricing tiers,
// hidden costs, pros/cons, features), and 5 starter articles.
//
// USAGE:
//   1. Deploy this file to app/api/admin/seed/route.ts
//   2. Push to GitHub, let Vercel deploy
//   3. Call it ONCE: POST https://your-site.vercel.app/api/admin/seed
//      with header  x-seed-key: <SEED_SECRET>
//   4. DELETE this file and push again (don't leave a write
//      endpoint live in production)
//
// SEED_SECRET must be set as a Vercel environment variable —
// pick any long random string, it's just to stop randoms from
// hitting this URL and wiping/reseeding your DB.
// =============================================================

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { featureCategories, platforms, articles } from './seed-data';
// ⚠️ Move seed-data.ts into the same app/api/admin/seed/ folder
// alongside this route.ts so the relative import above resolves.

export async function POST(request: Request) {
  const key = request.headers.get('x-seed-key');
  if (!key || key !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const log: string[] = [];

  try {
    // ---------------------------------------------------------
    // 1. Feature categories (idempotent — upsert by slug)
    // ---------------------------------------------------------
    const categoryIdBySlug = new Map<string, string>();
    for (const cat of featureCategories) {
      const created = await prisma.featureCategory.upsert({
        where: { slug: cat.slug },
        update: { nameAr: cat.nameAr, sortOrder: cat.sortOrder },
        create: cat,
      });
      categoryIdBySlug.set(cat.slug, created.id);
    }
    log.push(`✓ ${featureCategories.length} feature categories`);

    // ---------------------------------------------------------
    // 2. Platforms (idempotent — upsert by slug, then replace
    //    child rows so re-running this is always safe)
    // ---------------------------------------------------------
    for (const p of platforms) {
      const platform = await prisma.platform.upsert({
        where: { slug: p.slug },
        update: {
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          origin: p.origin,
          logo: p.logo,
          brandColor: p.brandColor,
          websiteUrl: p.websiteUrl,
          affiliateUrl: p.affiliateUrl,
          cookieDurationDays: p.cookieDurationDays,
          commissionInfo: p.commissionInfo,
          descriptionAr: p.descriptionAr,
          rating: p.rating,
          setupFeeSAR: p.setupFeeSAR,
          isEnterprise: p.isEnterprise,
          warningThresholdSAR: p.warningThresholdSAR,
          warningTextAr: p.warningTextAr,
          quickVerdictAr: p.quickVerdictAr,
          bestForTypes: p.bestForTypes,
        },
        create: {
          slug: p.slug,
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          origin: p.origin,
          logo: p.logo,
          brandColor: p.brandColor,
          websiteUrl: p.websiteUrl,
          affiliateUrl: p.affiliateUrl,
          cookieDurationDays: p.cookieDurationDays,
          commissionInfo: p.commissionInfo,
          descriptionAr: p.descriptionAr,
          rating: p.rating,
          setupFeeSAR: p.setupFeeSAR,
          isEnterprise: p.isEnterprise,
          warningThresholdSAR: p.warningThresholdSAR,
          warningTextAr: p.warningTextAr,
          quickVerdictAr: p.quickVerdictAr,
          bestForTypes: p.bestForTypes,
        },
      });

      // Replace tiers
      await prisma.pricingTier.deleteMany({ where: { platformId: platform.id } });
      await prisma.pricingTier.createMany({
        data: p.pricingTiers.map((t, i) => ({
          platformId: platform.id,
          name: t.name,
          nameAr: t.nameAr,
          minRevenueSAR: t.minRevenueSAR,
          maxRevenueSAR: t.maxRevenueSAR,
          monthlyFeeSAR: t.monthlyFeeSAR,
          transactionFeePct: t.transactionFeePct,
          perOrderFee: t.perOrderFee,
          maxOrders: t.maxOrders,
          annualRevLimitSAR: t.annualRevLimitSAR,
          sortOrder: i + 1,
        })),
      });

      // Replace hidden costs
      await prisma.hiddenCost.deleteMany({ where: { platformId: platform.id } });
      await prisma.hiddenCost.createMany({
        data: p.hiddenCosts.map((c, i) => ({
          platformId: platform.id,
          labelAr: c.labelAr,
          monthlySAR: c.monthlySAR,
          isRequired: c.isRequired,
          scenarios: c.scenarios,
          sortOrder: i + 1,
        })),
      });

      // Replace pros/cons
      await prisma.platformPro.deleteMany({ where: { platformId: platform.id } });
      await prisma.platformCon.deleteMany({ where: { platformId: platform.id } });
      await prisma.platformPro.createMany({
        data: p.pros.map((textAr, i) => ({ platformId: platform.id, textAr, sortOrder: i + 1 })),
      });
      await prisma.platformCon.createMany({
        data: p.cons.map((textAr, i) => ({ platformId: platform.id, textAr, sortOrder: i + 1 })),
      });

      // Replace features
      await prisma.platformFeature.deleteMany({ where: { platformId: platform.id } });
      await prisma.platformFeature.createMany({
        data: p.features.map((f) => {
          const categoryId = categoryIdBySlug.get(f.categorySlug);
          if (!categoryId) throw new Error(`Unknown category slug: ${f.categorySlug}`);
          return {
            platformId: platform.id,
            categoryId,
            featureNameAr: f.featureNameAr,
            supported: f.supported,
            noteAr: f.noteAr ?? null,
          };
        }),
      });

      log.push(`✓ ${p.slug} (${p.pricingTiers.length} tiers, ${p.hiddenCosts.length} hidden costs, ${p.features.length} features)`);
    }

    // ---------------------------------------------------------
    // 3. Articles (idempotent — upsert by slug)
    // ---------------------------------------------------------
    for (const a of articles) {
      await prisma.article.upsert({
        where: { slug: a.slug },
        update: {
          titleAr: a.titleAr,
          bodyHtml: a.bodyHtml,
          category: a.category,
          status: a.status,
          tags: a.tags,
          metaTitleAr: a.metaTitleAr,
          metaDescAr: a.metaDescAr,
          readingTimeMin: a.readingTimeMin,
          publishedAt: a.status === 'published' ? new Date() : null,
        },
        create: {
          slug: a.slug,
          titleAr: a.titleAr,
          bodyHtml: a.bodyHtml,
          category: a.category,
          status: a.status,
          tags: a.tags,
          metaTitleAr: a.metaTitleAr,
          metaDescAr: a.metaDescAr,
          readingTimeMin: a.readingTimeMin,
          publishedAt: a.status === 'published' ? new Date() : null,
        },
      });
    }
    log.push(`✓ ${articles.length} articles`);

    return NextResponse.json({ success: true, log });
  } catch (error) {
    return NextResponse.json(
      { success: false, log, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
