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
            <span>ÙÙÙØ± Ø¢ÙØ§Ù Ø§ÙØ±ÙØ§ÙØ§Øª Ø³ÙÙÙØ§Ù</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Ø§Ø­Ø³Ø¨ ØªÙÙÙØªÙ Ø§ÙØ­ÙÙÙÙØ©
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Ø£Ø¯Ø®Ù Ø­Ø¬Ù ÙØ¨ÙØ¹Ø§ØªÙ ÙØ¹Ø¯Ø¯ Ø§ÙÙÙØªØ¬Ø§Øª ÙØªØ¹Ø±ÙÙ Ø¹ÙÙ Ø§ÙØªÙÙÙØ© Ø§ÙÙØ¹ÙÙØ© ÙÙÙ ÙÙØµØ© Ø¨Ø§ÙØ±ÙØ§Ù Ø§ÙØ³Ø¹ÙØ¯Ù
          </p>
          <Link href="/calculator" className="btn btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold">
            <ArrowLeft size={20} />
            Ø§Ø­Ø³Ø¨ ØªÙØ§ÙÙÙÙ Ø§ÙØ¢Ù ÙØ¬Ø§ÙØ§Ù
          </Link>
          <p className="text-slate-500 text-sm mt-4">ÙØ¬Ø§ÙÙ ØªÙØ§ÙØ§Ù â ÙØ§ ÙØªØ·ÙØ¨ ØªØ³Ø¬ÙÙ</p>
        </motion.div>
      </div>
    </section>
  );
}