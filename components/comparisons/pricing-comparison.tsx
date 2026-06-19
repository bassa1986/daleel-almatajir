import { formatCurrency } from '@/lib/calculator/currency';
import { calculatePlatformCosts } from '@/lib/calculator/engine';
import { DEFAULT_MERCHANT_INPUTS } from '@/lib/calculator/constants';
import { SCORECARD_EXAMPLE_REVENUE_SAR, SCORECARD_EXAMPLE_ORDERS } from '@/lib/data/scorecard';
import type { PlatformFullRelations } from '@/lib/data/platforms';
import type { PlatformConfig } from '@/lib/calculator/types';

interface PricingComparisonProps {
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
  configs: PlatformConfig[];
}

export function PricingComparison({ platformA, platformB, configs }: PricingComparisonProps) {
  const output = calculatePlatformCosts(
    {
      ...DEFAULT_MERCHANT_INPUTS,
      monthlyRevenue: SCORECARD_EXAMPLE_REVENUE_SAR,
      monthlyOrders: SCORECARD_EXAMPLE_ORDERS,
    },
    configs
  );
  const resultA = output.results.find((r) => r.slug === platformA.slug);
  const resultB = output.results.find((r) => r.slug === platformB.slug);

  return (
    <section id="pricing" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-2">مقارنة الأسعار</h2>
      <p className="text-sm text-slate-500 mb-6">
        مثال حسابي بافتراض إيرادات {SCORECARD_EXAMPLE_REVENUE_SAR.toLocaleString('en-US')} ر.س و
        {SCORECARD_EXAMPLE_ORDERS} طلب شهرياً
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { platform: platformA, result: resultA },
          { platform: platformB, result: resultB },
        ].map(({ platform, result }) => (
          <div key={platform.slug} className="glass p-5">
            <h3 className="font-extrabold text-white mb-4">{platform.nameAr}</h3>

            <div className="space-y-2 mb-4">
              {platform.pricingTiers.map((tier) => (
                <div key={tier.id} className="flex items-center justify-between text-sm py-1.5 border-b border-white/6 last:border-0">
                  <span className="text-slate-400">{tier.nameAr}</span>
                  <span className="figure font-semibold text-white">
                    {tier.monthlyFeeSAR === 0 ? 'مجاني' : `${tier.monthlyFeeSAR.toLocaleString('en-US')} ر.س/شهر`}
                  </span>
                </div>
              ))}
            </div>

            {result && (
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
                <div className="text-xs text-slate-400 mb-1">التكلفة الإجمالية في المثال أعلاه</div>
                <div className="figure text-xl font-extrabold text-white">
                  {formatCurrency(result.totalMonthlyCost, 'SAR')}/شهر
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <a href="#mini-calculator" className="text-sm text-primary font-semibold hover:underline">
          جرّب الحاسبة التفاعلية لهذه المنصتين ↓
        </a>
      </div>
    </section>
  );
}
