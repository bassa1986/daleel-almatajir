'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, RefreshCw, BarChart2 } from 'lucide-react';
import type { PlatformDisplay } from '@/lib/data/platforms';

const TRUST_ITEMS = [
  { icon: BarChart2, text: 'Ù¦ ÙÙØµØ§Øª' },
  { icon: RefreshCw, text: 'Ø¨ÙØ§ÙØ§Øª ÙØ­Ø¯ÙØ«Ø© ÙÙÙÙÙ Ù¢Ù Ù¢Ù¦' },
  { icon: Shield, text: 'ÙØ³ØªÙÙ ÙÙÙØ¶ÙØ¹Ù' },
];

const PLATFORM_COLORS: Record<string, string> = {
  salla: '#4CAF50', zid: '#2196F3', shopify: '#96BF48',
  woocommerce: '#7F54B3', bigcommerce: '#34313F', magento: '#F26322',
};

interface HeroSectionProps { platforms: PlatformDisplay[]; }

export function HeroSection({ platforms }: HeroSectionProps) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden mesh-gradient flex flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Ø§ÙÙØ±Ø¬Ø¹ Ø§ÙØªÙÙÙ Ø§ÙØ£ÙÙ ÙÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© Ø¨Ø§ÙØ³Ø¹ÙØ¯ÙØ©
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
          Ø§Ø®ØªØ± ÙÙØµØ© ÙØªØ¬Ø±Ù
          <span className="block text-secondary mt-2">Ø¨Ø«ÙØ©</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Ø§ÙÙØ±Ø¬Ø¹ Ø§ÙØ£ÙÙ Ø¹Ø±Ø¨ÙØ§Ù ÙÙÙØ§Ø±ÙØ© Ø³ÙØ©Ø Ø²Ø¯Ø Ø´ÙØ¨ÙÙØ§ÙØ ÙÙÙÙÙØ±Ø³Ø BigCommerce ÙÙØ§Ø¬ÙØªÙ â Ø¨Ø£Ø³Ø¹Ø§Ø± Ø­ÙÙÙÙØ© Ø¨Ø§ÙØ±ÙØ§Ù Ø§ÙØ³Ø¹ÙØ¯Ù
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/calculator" className="btn btn-primary px-8 py-4 rounded-full text-lg font-bold">â Ø§Ø­Ø³Ø¨ ØªÙØ§ÙÙÙÙ Ø§ÙØ¢Ù</Link>
          <Link href="/muqaranat" className="btn btn-ghost px-8 py-4 rounded-full text-lg font-bold">â ÙØ§Ø±Ù Ø§ÙÙÙØµØ§Øª</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 mb-14">
          {TRUST_ITEMS.map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon size={16} className="text-secondary" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        {platforms && platforms.length > 0 && (
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {platforms.map((platform, i) => (
              <motion.div key={platform.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                className="glass px-4 py-2 rounded-full text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[platform.slug] || '#fff' }} />
                {platform.nameAr}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}