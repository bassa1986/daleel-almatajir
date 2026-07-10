'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { formatCurrency } from '@/lib/calculator/currency';
import type { PlatformConfig } from '@/lib/calculator/types';

interface MiniCalculatorEmbeddedProps {
  configA: PlatformConfig;
  configB: PlatformConfig;
}

export function MiniCalculatorEmbedded({ configA, configB }: MiniCalculatorEmbeddedProps) {
  const { inputs, output, updateRevenue, updateOrders } = useCalculator([configA, configB]);
  const [first, second] = output.results;
  const winner = first;
  const diff = second ? second.totalMonthlyCost - first.totalMonthlyCost : 0;

  return (
    <section id="mini-calculator" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">ÃÂ­ÃÂ§ÃÂ³ÃÂ¨ÃÂ© Ãâ¦ÃÂµÃÂºÃâÃÂ±ÃÂ©: {configA.nameAr} ÃÂ¶ÃÂ¯ {configB.nameAr}</h2>

      <div className="glass p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-300">ÃÂ§ÃâÃÂ¥ÃÅ ÃÂ±ÃÂ§ÃÂ¯ÃÂ§ÃÂª ÃÂ§ÃâÃÂ´Ãâ¡ÃÂ±ÃÅ ÃÂ©</label>
              <span className="figure text-primary font-bold text-sm">{formatCurrency(inputs.monthlyRevenue, 'SAR')}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={2000000}
              step={5000}
              value={inputs.monthlyRevenue}
              onChange={(e) => updateRevenue(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-300">ÃÂ¹ÃÂ¯ÃÂ¯ ÃÂ§ÃâÃÂ·ÃâÃÂ¨ÃÂ§ÃÂª ÃÂ§ÃâÃÂ´Ãâ¡ÃÂ±ÃÅ ÃÂ©</label>
              <span className="figure text-secondary font-bold text-sm">{inputs.monthlyOrders.toLocaleString('en-US')}</span>
            </div>
            <input
              type="range"
              min={10}
              max={5000}
              step={10}
              value={inputs.monthlyOrders}
              onChange={(e) => updateOrders(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {output.results.map((r) => (
            <div
              key={r.slug}
              className={`rounded-xl p-4 border ${r.isRecommended ? 'border-primary/30 bg-primary/8' : 'border-white/8 bg-white/3'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-sm">{r.nameAr}</span>
                {r.isRecommended && <span className="badge badge-success text-xs">ÃÂ§ÃâÃÂ£ÃËÃÂÃÂ±</span>}
              </div>
              <div className="figure text-xl font-extrabold text-white">{formatCurrency(r.totalMonthlyCost, 'SAR')}/ÃÂ´Ãâ¡ÃÂ±</div>
            </div>
          ))}
        </div>

        {diff > 0 && (
          <div className="text-center text-sm text-emerald-400 font-semibold mb-6">
            ÃÂªÃËÃÂÃÂ± Ãâ¦ÃÂ¹ {winner.nameAr}: {formatCurrency(diff, 'SAR')}/ÃÂ´Ãâ¡ÃÂ±
          </div>
        )}

        <div className="text-center">
          <Link href="/ÃÂ­ÃÂ§ÃÂ³ÃÂ¨ÃÂ©-ÃÂ§ÃâÃÂªÃÆÃÂ§ÃâÃÅ ÃÂ" className="btn-primary text-sm px-6 py-3">
            ÃâÃÂ§ÃÂ±Ãâ  Ãâ¦ÃÂ¹ ÃÂ¬Ãâ¦ÃÅ ÃÂ¹ ÃÂ§ÃâÃâ¦Ãâ ÃÂµÃÂ§ÃÂª ÃÂ§ÃâÃÂ³ÃÂª
            <ArrowLeft size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
