'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const COMPARISONS = [
  { slugA: 'salla', slugB: 'zid', nameA: 'Ø³ÙØ©', nameB: 'Ø²Ø¯' },
  { slugA: 'salla', slugB: 'shopify', nameA: 'Ø³ÙØ©', nameB: 'Ø´ÙØ¨ÙÙØ§Ù' },
  { slugA: 'zid', slugB: 'shopify', nameA: 'Ø²Ø¯', nameB: 'Ø´ÙØ¨ÙÙØ§Ù' },
  { slugA: 'shopify', slugB: 'woocommerce', nameA: 'Ø´ÙØ¨ÙÙØ§Ù', nameB: 'ÙÙÙÙÙØ±Ø³' },
  { slugA: 'salla', slugB: 'woocommerce', nameA: 'Ø³ÙØ©', nameB: 'ÙÙÙÙÙØ±Ø³' },
  { slugA: 'shopify', slugB: 'bigcommerce', nameA: 'Ø´ÙØ¨ÙÙØ§Ù', nameB: 'Ø¨ÙØº ÙÙÙØ±Ø³' },
];

export function TopComparisons() {
  return (
    <section className="py-20 px-4 bg-white/2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ø£Ø´ÙØ± Ø§ÙÙÙØ§Ø±ÙØ§Øª</h2>
          <p className="text-slate-400">Ø§Ø®ØªØ± Ø§ÙÙÙØ§Ø±ÙØ© Ø§ÙØªÙ ØªÙØ§Ø³Ø¨ Ø§Ø­ØªÙØ§Ø¬Ø§ØªÙ</p>
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
          <Link href="/muqaranat" className="text-secondary hover:underline font-semibold">Ø¹Ø±Ø¶ ÙÙ Ø§ÙÙÙØ§Ø±ÙØ§Øª â</Link>
        </div>
      </div>
    </section>
  );
}