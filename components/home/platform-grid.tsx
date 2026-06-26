'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { StarRating } from '@/components/ui/star-rating';
import { cn } from '@/lib/cn';
import type { PlatformDisplay } from '@/lib/data/platforms';

interface PlatformGridProps {
  platforms: PlatformDisplay[];
}

const PLATFORM_EMOJI: Record<string, string> = {
  salla: 'ðŸ›’',
  zid: 'âš¡',
  shopify: 'ðŸŒ',
  woocommerce: 'ðŸ”§',
  bigcommerce: 'ðŸ“¦',
  magento: 'ðŸ¢',
};

export function PlatformGrid({ platforms }: PlatformGridProps) {
  return (
    <section className="py-20 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-white mb-3">Ø§Ù„Ù…Ù†ØµØ§Øª Ø§Ù„Ù…Ù‚Ø§Ø±Ù†Ø©</h2>
          <p className="text-slate-400 text-lg">Ù¦ Ù…Ù†ØµØ§ØªØŒ Ø¨ÙŠØ§Ù†Ø§Øª Ø­Ù‚ÙŠÙ‚ÙŠØ©ØŒ Ø¨Ø§Ù„Ø±ÙŠØ§Ù„ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠ</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <Link
                href={`/Ù…Ù‚Ø§Ø±Ù†Ø§Øª/${platform.slug}`}
                className="group block glass glass-hover h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Top row: emoji + badges */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border border-white/10"
                      style={{ backgroundColor: `${platform.brandColor}22` }}
                    >
                      {PLATFORM_EMOJI[platform.slug] ?? 'ðŸ›ï¸'}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={cn(
                        'badge text-xs',
                        platform.origin === 'GCC' ? 'badge-secondary' : 'badge-primary'
                      )}>
                        {platform.origin === 'GCC' ? 'Ø®Ù„ÙŠØ¬ÙŠ' : 'Ø¹Ø§Ù„Ù…ÙŠ'}
                      </span>
                      {platform.hasAdditionalCosts && (
                        <span className="badge badge-warning text-xs">ØªÙƒØ§Ù„ÙŠÙ Ø¥Ø¶Ø§ÙÙŠØ©</span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-primary transition-colors">
                    {platform.nameAr}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">{platform.nameEn}</p>

                  {/* Rating */}
                  <StarRating rating={platform.rating} className="mb-4" />

                  {/* Starting price */}
                  <div className="mt-auto pt-4 border-t border-white/6">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-500 mb-0.5">ÙŠØ¨Ø¯Ø£ Ù…Ù†</div>
                        <div className="figure text-2xl font-extrabold text-white">
                          {platform.startingPriceSAR === 0 ? (
                            <span className="text-emerald-400">Ù…Ø¬Ø§Ù†ÙŠ</span>
                          ) : (
                            <>
                              {platform.startingPriceSAR.toLocaleString('en-US')}
                              <span className="text-base font-semibold text-slate-400 mr-1">Ø±.Ø³/Ø´Ù‡Ø±</span>
                            </>
                          )}
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all">
                        Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© <ArrowLeft size={15} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
