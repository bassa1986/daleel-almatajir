export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getPlatformsForCalculator } from '@/lib/data/platforms';
import { CalculatorConfigPreview } from '@/components/admin/calculator-config-preview';

export default async function AdminCalculatorPage() {
  const [platforms, configs] = await Promise.all([
    prisma.platform.findMany({
      include: {
        pricingTiers: { orderBy: { sortOrder: 'asc' } },
        hiddenCosts: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { nameAr: 'asc' },
    }),
    getPlatformsForCalculator(),
  ]);

  const staleThresholdDays = 30;
  const now = Date.now();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-1">Calculator Config</h1>
      <p className="text-sm text-slate-500 mb-6">
        Tier/cost editing lives in each platform's "Ø§Ù„Ø£Ø³Ø¹Ø§Ø± ÙˆØ§Ù„ØªÙƒØ§Ù„ÙŠÙ" tab â€”{' '}
        <Link href="/admin/platforms" className="text-primary">go to Platforms</Link>. This page summarizes
        current config and shows a live preview.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: accordion summary per platform */}
        <div className="space-y-3">
          {platforms.map((p) => {
            const daysSinceUpdate = Math.floor((now - p.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
            const isStale = daysSinceUpdate > staleThresholdDays;
            return (
              <div key={p.id} className="glass p-4">
                <div className="flex items-center justify-between mb-3">
                  <Link href={`/admin/platforms/${p.slug}`} className="font-bold text-white hover:text-primary">
                    {p.nameAr}
                  </Link>
                  <span className={`badge text-xs ${isStale ? 'badge-warning' : 'badge-neutral'}`}>
                    {isStale ? `Stale (${daysSinceUpdate}d)` : 'Up to date'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>{p.pricingTiers.length} pricing tier(s)</div>
                  <div>{p.hiddenCosts.length} hidden cost item(s)</div>
                  {p.warningThresholdSAR && (
                    <div className="text-amber-400">Warning threshold: {p.warningThresholdSAR.toLocaleString('en-US')} SAR</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: live preview */}
        <div>
          <CalculatorConfigPreview platforms={configs} />
        </div>
      </div>
    </div>
  );
}
