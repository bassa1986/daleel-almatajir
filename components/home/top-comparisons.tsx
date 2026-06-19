'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const PLATFORM_COLORS: Record<string, string> = {
  salla: '#4CAF50',
  zid: '#2196F3',
  shopify: '#96BF48',
  woocommerce: '#7F54B3',
  bigcommerce: '#34313F',
  magento: '#F26322',
};

const PLATFORM_NAMES_AR: Record<string, string> = {
  salla: 'سلة',
  zid: 'زد',
  shopify: 'شوبيفاي',
  woocommerce: 'ووكومرس',
  bigcommerce: 'بيغ كومرس',
  magento: 'ماجنتو',
};

const TOP_COMPARISONS: Array<[string, string]> = [
  ['salla', 'zid'],
  ['salla', 'shopify'],
  ['zid', 'shopify'],
  ['salla', 'woocommerce'],
  ['shopify', 'woocommerce'],
  ['zid', 'woocommerce'],
];

function vsSlug(a: string, b: string) {
  return `${a}-vs-${b}`;
}

export function TopComparisons() {
  return (
    <section className="py-20 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-white mb-3">المقارنات الأكثر بحثاً</h2>
          <p className="text-slate-400 text-lg">
            مقارنات شاملة جنباً إلى جنب بين المنصات الأكثر طلباً
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_COMPARISONS.map(([slugA, slugB], i) => (
            <motion.div
              key={`${slugA}-${slugB}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                href={`/مقارنات/${vsSlug(slugA, slugB)}`}
                className="group glass glass-hover flex items-center gap-4 p-5"
              >
                {/* Platform A */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PLATFORM_COLORS[slugA] }}
                  />
                  <span className="font-bold text-white text-sm truncate">
                    {PLATFORM_NAMES_AR[slugA]}
                  </span>
                </div>

                {/* VS badge */}
                <span className="badge badge-neutral text-xs flex-shrink-0 font-extrabold">
                  VS
                </span>

                {/* Platform B */}
                <div className="flex items-center gap-2 min-w-0 flex-1 flex-row-reverse">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PLATFORM_COLORS[slugB] }}
                  />
                  <span className="font-bold text-white text-sm truncate">
                    {PLATFORM_NAMES_AR[slugB]}
                  </span>
                </div>

                <ArrowLeft
                  size={16}
                  className="text-slate-500 group-hover:text-primary transition-colors flex-shrink-0"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/مقارنات" className="btn-glass text-sm px-6 py-3">
            عرض جميع المقارنات
            <ArrowLeft size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
