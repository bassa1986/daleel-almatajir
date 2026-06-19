'use client';

import { motion } from 'framer-motion';
import { SlidersHorizontal, BarChart3, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    number: '١',
    icon: SlidersHorizontal,
    titleAr: 'أدخل بيانات متجرك',
    descAr: 'حجم الإيرادات الشهرية وعدد الطلبات — لا حاجة للتسجيل.',
    color: '#3B82F6',
  },
  {
    number: '٢',
    icon: BarChart3,
    titleAr: 'قارن التكاليف الحقيقية',
    descAr: 'نحسب الاشتراك + رسوم المعاملات + التكاليف الخفية لكل منصة.',
    color: '#06B6D4',
  },
  {
    number: '٣',
    icon: CheckCircle2,
    titleAr: 'اختر المنصة الأنسب',
    descAr: 'احصل على توصية شخصية مع تقرير PDF للتنزيل.',
    color: '#22C55E',
  },
] as const;

export function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-white mb-3">كيف يعمل دليل المتاجر؟</h2>
          <p className="text-slate-400 text-lg">ثلاث خطوات للوصول إلى القرار الصحيح</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dotted connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 right-[calc(33.33%+24px)] left-[calc(33.33%+24px)]"
            aria-hidden
          >
            <div className="border-t-2 border-dashed border-white/10 w-full" />
          </div>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
              >
                {/* Icon circle */}
                <div
                  className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-6 border border-white/10"
                  style={{ backgroundColor: `${step.color}18` }}
                >
                  <Icon size={36} style={{ color: step.color }} strokeWidth={1.5} />
                  {/* Step number chip */}
                  <span
                    className="absolute -top-1 -right-1 w-7 h-7 rounded-full text-xs font-extrabold text-white flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-2">{step.titleAr}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[220px]">{step.descAr}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
