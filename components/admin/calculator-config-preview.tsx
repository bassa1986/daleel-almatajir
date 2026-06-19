'use client';

import { useCalculator } from '@/lib/hooks/useCalculator';
import { formatCurrency } from '@/lib/calculator/currency';
import type { PlatformConfig } from '@/lib/calculator/types';

interface CalculatorConfigPreviewProps {
  platforms: PlatformConfig[];
}

export function CalculatorConfigPreview({ platforms }: CalculatorConfigPreviewProps) {
  const { inputs, output, updateRevenue, updateOrders } = useCalculator(platforms);

  return (
    <div className="glass p-5 sticky top-6">
      <h3 className="font-bold text-white mb-4 text-sm">Live Preview</h3>

      <div className="space-y-4 mb-5">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Monthly revenue</span>
            <span className="figure">{formatCurrency(inputs.monthlyRevenue, 'SAR')}</span>
          </div>
          <input
            type="range"
            min={5000}
            max={2000000}
            step={5000}
            value={inputs.monthlyRevenue}
            onChange={(e) => updateRevenue(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Monthly orders</span>
            <span className="figure">{inputs.monthlyOrders.toLocaleString('en-US')}</span>
          </div>
          <input
            type="range"
            min={10}
            max={5000}
            step={10}
            value={inputs.monthlyOrders}
            onChange={(e) => updateOrders(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10"
          />
        </div>
      </div>

      <div className="space-y-2">
        {output.results.map((r) => (
          <div key={r.slug} className="flex items-center justify-between text-xs py-2 border-b border-white/6 last:border-0">
            <span className={r.isRecommended ? 'text-white font-bold' : 'text-slate-400'}>
              #{r.rank} {r.nameAr}
            </span>
            <span className="figure text-slate-300">{formatCurrency(r.totalMonthlyCost, 'SAR')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
