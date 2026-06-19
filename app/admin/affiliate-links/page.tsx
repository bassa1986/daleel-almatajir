import { prisma } from '@/lib/db';
import { AffiliateLinksTable } from '@/components/admin/affiliate-links-table';

export default async function AdminAffiliateLinksPage() {
  const platforms = await prisma.platform.findMany({
    orderBy: { nameAr: 'asc' },
    select: { id: true, nameAr: true, affiliateUrl: true, cookieDurationDays: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-2">Affiliate Links</h1>
      <p className="text-sm text-slate-500 mb-6">
        Edit affiliate URLs inline, append standard UTM tracking params, and save per row.
      </p>
      <AffiliateLinksTable rows={platforms} />
    </div>
  );
}
