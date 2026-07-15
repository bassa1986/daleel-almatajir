'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingDown } from 'lucide-react';
import type { PlatformConfig } from '@/lib/calculator/types';

interface CalculatorTeaserProps { platforms: PlatformConfig[]; }

export function CalculatorTeaser({ platforms }: CalculatorTeaserProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-secondary mb-6">
            <TrendingDown size={16} />
            <span>وفّر آلاف الريالات سنوياً</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            احسب تكلفتك الحقيقية
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            أدخل حجم مبيعاتك وعدد المنتجات وتعرّف على التكلفة الفعلية لكل منصة بالريال السعودي
          </p>
          <Link href="/calculator" className="btn btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold">
            <ArrowLeft size={20} />
            احسب تكاليفك الآن مجاناً
          </Link>
          <p className="text-slate-500 text-sm mt-4">مجاني تماماً — لا يتطلب تسجيل</p>
        </motion.div>
      </div>
    </section>
  );
}
