export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { PlatformEditor } from '@/components/admin/platform-editor';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminPlatformEditPage({ params }: Props) {
  const { slug } = await params;

  const [platform, categories] = await Promise.all([
    prisma.platform.findUnique({
      where: { slug },
      include: {
        pricingTiers: { orderBy: { sortOrder: 'asc' } },
        hiddenCosts: { orderBy: { sortOrder: 'asc' } },
        pros: { orderBy: { sortOrder: 'asc' } },
        cons: { orderBy: { sortOrder: 'asc' } },
        features: { include: { category: { select: { nameAr: true } } } },
      },
    }),
    prisma.featureCategory.findMany({ orderBy: { sortOrder: 'asc' }, select: { id: true, nameAr: true } }),
  ]);

  if (!platform) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-1">{platform.nameAr}</h1>
      <p className="text-sm text-slate-500 mb-6">{platform.nameEn} · /{platform.slug}</p>

      <PlatformEditor
        platform={{
          id: platform.id,
          slug: platform.slug,
          nameAr: platform.nameAr,
          nameEn: platform.nameEn,
          logo: platform.logo,
          brandColor: platform.brandColor,
          websiteUrl: platform.websiteUrl,
          affiliateUrl: platform.affiliateUrl,
          cookieDurationDays: platform.cookieDurationDays,
          commissionInfo: platform.commissionInfo,
          descriptionAr: platform.descriptionAr,
          rating: platform.rating,
          setupFeeSAR: platform.setupFeeSAR,
          isEnterprise: platform.isEnterprise,
          warningThresholdSAR: platform.warningThresholdSAR,
          warningTextAr: platform.warningTextAr,
          quickVerdictAr: platform.quickVerdictAr,
          bestForTypes: platform.bestForTypes,
          pricingTiers: platform.pricingTiers.map((t) => ({
            id: t.id,
            name: t.name,
            nameAr: t.nameAr,
            minRevenueSAR: t.minRevenueSAR,
            maxRevenueSAR: t.maxRevenueSAR,
            monthlyFeeSAR: t.monthlyFeeSAR,
            transactionFeePct: t.transactionFeePct,
            perOrderFee: t.perOrderFee,
            maxOrders: t.maxOrders,
            annualRevLimitSAR: t.annualRevLimitSAR,
          })),
          hiddenCosts: platform.hiddenCosts.map((c) => ({
            labelAr: c.labelAr,
            monthlySAR: c.monthlySAR,
            isRequired: c.isRequired,
            scenarios: c.scenarios,
          })),
          pros: platform.pros.map((p) => ({ textAr: p.textAr })),
          cons: platform.cons.map((c) => ({ textAr: c.textAr })),
          features: platform.features.map((f) => ({
            categoryId: f.categoryId,
            categoryNameAr: f.category.nameAr,
            featureNameAr: f.featureNameAr,
            supported: f.supported as 'yes' | 'no' | 'partial',
            noteAr: f.noteAr ?? undefined,
          })),
        }}
        categories={categories}
      />
    </div>
  );
}
