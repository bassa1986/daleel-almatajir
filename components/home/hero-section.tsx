'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, RefreshCw, BarChart2 } from 'lucide-react';
import type { PlatformDisplay } from '@/lib/data/platforms';

const TRUST_ITEMS = [
  { icon: BarChart2, text: 'Ù¦ Ù…Ù†ØµØ§Øª' },
  { icon: RefreshCw, text: 'Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø­Ø¯Ù‘Ø«Ø© ÙŠÙˆÙ†ÙŠÙˆ Ù¢Ù Ù¢Ù¦' },
  { icon: Shield, text: 'Ù…Ø³ØªÙ‚Ù„ ÙˆÙ…ÙˆØ¶ÙˆØ¹ÙŠ' },
];

const PLATFORM_COLORS: Record<string, string> = {
  salla: '#4CAF50',
  zid: '#2196F3',
  shopify: '#96BF48',
  woocommerce: '#7F54B3',
  bigcommerce: '#34313F',
  magento: '#F26322',
};

interface HeroSectionProps {
  platforms: PlatformDisplay[];
}

export function HeroSection({ platforms }: HeroSectionProps) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden mesh-gradient flex flex-col items-center justify-center px-4 py-24 text-center">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-blue-300 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          Ø§Ù„Ù…Ø±Ø¬Ø¹ Ø§Ù„ØªÙ‚Ù†ÙŠ Ø§Ù„Ø£ÙˆÙ„ Ù„Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ© Ø¨Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©
        </motion.div>

        {/* H1 */}
        <h1
          className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Ø§Ø®ØªØ± Ù…Ù†ØµØ© Ù…ØªØ¬Ø±Ùƒ
          <br />
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
            Ø¨Ø«Ù‚Ø©
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ø§Ù„Ù…Ø±Ø¬Ø¹ Ø§Ù„Ø£ÙˆÙ„ Ø¹Ø±Ø¨ÙŠØ§Ù‹ Ù„Ù…Ù‚Ø§Ø±Ù†Ø© Ø³Ù„Ø©ØŒ Ø²Ø¯ØŒ Ø´ÙˆØ¨ÙŠÙØ§ÙŠØŒ ÙˆÙˆÙƒÙˆÙ…Ø±Ø³ØŒ BigCommerce ÙˆÙ…Ø§Ø¬Ù†ØªÙˆ â€”
          Ø¨Ø£Ø³Ø¹Ø§Ø± Ø­Ù‚ÙŠÙ‚ÙŠØ© Ø¨Ø§Ù„Ø±ÙŠØ§Ù„ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠ
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="/Ø­Ø§Ø³Ø¨Ø©-Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ"
            className="btn-primary text-base px-8 py-4 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            Ø§Ø­Ø³Ø¨ ØªÙƒÙ„ÙØªÙƒ Ø§Ù„Ø¢Ù†
            <ArrowLeft size={18} />
          </Link>
          <Link href="/Ù…Ù‚Ø§Ø±Ù†Ø§Øª" className="btn-glass text-base px-8 py-4">
            Ù‚Ø§Ø±Ù† Ø§Ù„Ù…Ù†ØµØ§Øª
            <ArrowLeft size={18} />
          </Link>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 mb-16">
          {TRUST_ITEMS.map(({ icon: Icon, text }, i) => (
            <span key={i} className="flex items-center gap-2">
              <Icon size={15} className="text-secondary" />
              {text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Animated platform logos row */}
      <div className="relative z-10 w-full max-w-3xl mx-auto overflow-hidden">
        <div className="flex items-center justify-center gap-3 flex-wrap px-4">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <Link
                href={`/Ù…Ù‚Ø§Ø±Ù†Ø§Øª/${platform.slug}`}
                className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-all duration-200"
              >
                <span
                  className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: PLATFORM_COLORS[platform.slug] ?? platform.brandColor }}
                />
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {platform.nameAr}
                </span>
                <span className="text-xs text-slate-500">
                  {platform.origin === 'GCC' ? 'Ø®Ù„ÙŠØ¬ÙŠ' : 'Ø¹Ø§Ù„Ù…ÙŠ'}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}
