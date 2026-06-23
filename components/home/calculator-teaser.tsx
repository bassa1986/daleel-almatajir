<<<<<<< HEAD
﻿'use client';
=======
'use client';
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingDown } from 'lucide-react';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { formatCurrency } from '@/lib/calculator/currency';
import type { PlatformConfig } from '@/lib/calculator/types';

const PLATFORM_COLORS: Record<string, string> = {
  salla: '#4CAF50',
  zid: '#2196F3',
  shopify: '#96BF48',
  woocommerce: '#7F54B3',
  bigcommerce: '#34313F',
  magento: '#F26322',
};

interface CalculatorTeaserProps {
  platforms: PlatformConfig[];
}

export function CalculatorTeaser({ platforms }: CalculatorTeaserProps) {
  const { inputs, output, updateRevenue, updateOrders } = useCalculator(platforms);
  const top3 = output.results.slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass p-8 md:p-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-2">احسب تكلفتك الفعلية</h2>
            <p className="text-slate-400">أدخل بيانات متجرك واحصل على مقارنة فورية</p>
          </div>

          {/* Sliders */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-slate-300">الإيرادات الشهرية</label>
                <span className="figure text-primary font-bold text-sm">
                  {formatCurrency(inputs.monthlyRevenue, 'SAR')}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={2000000}
                step={5000}
                value={inputs.monthlyRevenue}
                onChange={(e) => updateRevenue(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer
                  bg-white/10 [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/40
                  [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>٥,٠٠٠</span><span>٢,٠٠٠,٠٠٠ ر.س</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-slate-300">عدد الطلبات الشهرية</label>
                <span className="figure text-secondary font-bold text-sm">
                  {inputs.monthlyOrders.toLocaleString('en-US')} طلب
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={inputs.monthlyOrders}
                onChange={(e) => updateOrders(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer
                  bg-white/10 [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-secondary/40
                  [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>١٠</span><span>٥,٠٠٠ طلب</span>
              </div>
            </div>
          </div>

          {/* Top 3 results */}
          <div className="space-y-3 mb-8">
            {top3.map((result, i) => {
              const isWinner = i === 0;
              return (
                <motion.div
                  key={result.slug}
                  layout
                  className={`flex items-center gap-4 rounded-xl p-4 border transition-all duration-300 ${
                    isWinner
                      ? 'border-primary/30 bg-primary/8'
                      : 'border-white/6 bg-white/3'
                  }`}
                >
                  {/* Rank */}
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isWinner ? 'bg-primary text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {i + 1}
                  </span>

                  {/* Color dot + name */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: PLATFORM_COLORS[result.slug] ?? result.brandColor }}
                    />
                    <span className="font-bold text-white text-sm truncate">{result.nameAr}</span>
                    {isWinner && (
                      <span className="badge badge-success text-xs py-0.5 px-2 flex-shrink-0">الأوفر</span>
                    )}
                  </div>

                  {/* Cost */}
                  <div className="text-right flex-shrink-0">
                    <div className="figure font-bold text-white text-base">
                      {formatCurrency(result.totalMonthlyCost, 'SAR')}
                    </div>
                    <div className="text-xs text-slate-500">/شهر</div>
                  </div>

                  {/* Savings vs most expensive */}
                  {result.savingsVsMostExpensive > 0 && (
                    <div className="hidden md:flex items-center gap-1 text-xs text-emerald-400 flex-shrink-0">
                      <TrendingDown size={13} />
                      <span className="figure">وفّر {formatCurrency(result.savingsVsMostExpensive, 'SAR')}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
<<<<<<< HEAD
              href={`/calculator?r=${inputs.monthlyRevenue}&o=${inputs.monthlyOrders}&c=SAR&s=0`}
=======
              href={`/حاسبة-التكاليف?r=${inputs.monthlyRevenue}&o=${inputs.monthlyOrders}&c=SAR&s=0`}
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f
              className="btn-primary text-sm px-8 py-3"
            >
              عرض المقارنة الكاملة لجميع المنصات الست
              <ArrowLeft size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
<<<<<<< HEAD

=======
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f
