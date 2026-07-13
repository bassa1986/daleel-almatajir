'use client'
import Link from "next/link";
import { motion } from "framer-motion";

const COMPARISONS = [
  { slugA: "salla", slugB: "zid", nameA: "سلة", nameB: "زد" },
  { slugA: "salla", slugB: "shopify", nameA: "سلة", nameB: "شوبيفاي" },
  { slugA: "zid", slugB: "shopify", nameA: "زد", nameB: "شوبيفاي" },
  { slugA: "shopify", slugB: "woocommerce", nameA: "شوبيفاي", nameB: "ووكومرس" },
  { slugA: "salla", slugB: "woocommerce", nameA: "سلة", nameB: "ووكومرس" },
  { slugA: "shopify", slugB: "bigcommerce", nameA: "شوبيفاي", nameB: "بيغ كومرس" },
];

export function TopComparisons() {
  return (
    <section className="py-20 px-4 bg-white/2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">أشهر المقارنات</h2>
          <p className="text-slate-400">اختر المقارنة التي تناسب احتياجاتك</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISONS.map(({ slugA, slugB, nameA, nameB }) => (
            <motion.div key={`${slugA}-${slugB}`} whileHover={{ scale: 1.02 }}>
              <Link href={`/muqaranat/${slugA}-vs-${slugB}`} className="glass glass-hover flex items-center justify-between p-5 block">
                <span className="font-bold text-white">{nameA}</span>
                <span className="badge badge-neutral text-xs font-extrabold px-3 py-1">VS</span>
                <span className="font-bold text-white">{nameB}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/muqaranat" className="text-secondary hover:underline font-semibold">عرض كل المقارنات ←</Link>
        </div>
      </div>
    </section>
  );
}