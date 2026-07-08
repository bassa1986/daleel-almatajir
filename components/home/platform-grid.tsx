'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarRating } from '@/components/ui/star-rating';
import type { PlatformDisplay } from '@/lib/data/platforms';

interface PlatformGridProps { platforms: PlatformDisplay[]; }

const PLATFORM_LOGOS: Record<string, string> = {
  salla: 'https://i.imgur.com/placeholder-salla.png',
  zid: 'https://i.imgur.com/placeholder-zid.png',
  shopify: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/200px-Shopify_logo_2018.svg.png',
  woocommerce: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/200px-WooCommerce_logo.svg.png',
  bigcommerce: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/BigCommerce-logo.svg/200px-BigCommerce-logo.svg.png',
  magento: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magento_Logo.svg/200px-Magento_Logo.svg.png',
};

const PLATFORM_INITIALS: Record<string, { letter: string; color: string }> = {
  salla:       { letter: 'س', color: '#004956' },
  zid:         { letter: 'ز', color: '#54421C' },
  shopify:     { letter: 'S', color: '#96bf48' },
  woocommerce: { letter: 'W', color: '#96588a' },
  bigcommerce: { letter: 'B', color: '#34313F' },
  magento:     { letter: 'M', color: '#EE6F2A' },
};

export function PlatformGrid({ platforms }: PlatformGridProps) {
  if (!platforms || platforms.length === 0) return null;
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">المنصات المقارنة</h2>
          <p className="text-slate-400">٦ منصات بأسعار حقيقية بالريال السعودي</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((p, i) => {
            const initials = PLATFORM_INITIALS[p.slug];
            return (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/muqaranat/${p.slug}`} className="glass glass-hover p-6 block h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: `${p.brandColor}22` }}>
                      <LogoWithFallback slug={p.slug} nameAr={p.nameAr} brandColor={p.brandColor} />
                    </div>
                    <span className={`badge text-xs ${p.origin === 'GCC' ? 'badge-secondary' : 'badge-primary'}`}>
                      {p.origin === 'GCC' ? 'خليجي' : 'عالمي'}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">{p.nameAr}</h3>
                  <StarRating rating={p.rating} className="mb-3" />
                  <div className="mt-auto text-lg font-bold text-white">
                    {p.startingPriceSAR === 0
                      ? <span className="text-emerald-400">مجاني</span>
                      : <>{p.startingPriceSAR.toLocaleString('en-US')} <span className="text-sm text-slate-400">ر.س/شهر</span></>}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LogoWithFallback({ slug, nameAr, brandColor }: { slug: string; nameAr: string; brandColor: string }) {
  const initials = PLATFORM_INITIALS[slug];
  const logo = PLATFORM_LOGOS[slug];

  // For salla and zid use styled text logo since no good CDN source
  if (slug === 'salla') {
    return <span className="text-2xl font-extrabold" style={{ color: '#004956', textShadow: '0 0 20px rgba(0,73,86,0.5)' }}>سلة</span>;
  }
  if (slug === 'zid') {
    return <span className="text-2xl font-extrabold" style={{ color: '#C8A96E' }}>زد</span>;
  }

  return (
    <Image
      src={logo}
      alt={nameAr}
      width={52}
      height={52}
      className="object-contain p-1"
      unoptimized
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = 'none';
        const parent = el.parentElement;
        if (parent) {
          parent.innerHTML = `<span style="font-size:1.5rem;font-weight:900;color:${brandColor}">${initials?.letter || '●'}</span>`;
        }
      }}
    />
  );
}