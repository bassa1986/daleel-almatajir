'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarRating } from '@/components/ui/star-rating';
import type { PlatformDisplay } from '@/lib/data/platforms';

interface PlatformGridProps { platforms: PlatformDisplay[]; }

const PLATFORM_LOGOS: Record<string, string> = {
  salla: 'https://seeklogo.com/images/S/Salla-logo-A9F3A1C0D4-seeklogo.com.png',
  zid: 'https://seeklogo.com/images/Z/ZID-logo-8C8A4D5C1E-seeklogo.com.png',
  shopify: 'https://seeklogo.com/images/S/Shopify-logo-CF0D2E47C4-seeklogo.com.png',
  woocommerce: 'https://seeklogo.com/images/W/WooCommerce-logo-D5A233D58E-seeklogo.com.png',
  bigcommerce: 'https://seeklogo.com/images/B/BigCommerce-logo-D0D6E9E4FC-seeklogo.com.png',
  magento: 'https://seeklogo.com/images/M/Magento-logo-A987E32300-seeklogo.com.png',
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
          {platforms.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={`/muqaranat/${p.slug}`} className="glass glass-hover p-6 block h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center p-2" style={{ backgroundColor: `${p.brandColor}22` }}>
                    <div className="relative w-12 h-12">
                      <Image
                        src={PLATFORM_LOGOS[p.slug] || ''}
                        alt={p.nameAr}
                        width={48}
                        height={48}
                        className="object-contain"
                        unoptimized
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.style.display = 'none';
                          el.parentElement!.innerHTML = `<span className="text-2xl font-extrabold" style="color: ${p.brandColor}">${p.nameEn?.[0] || '●'}</span>`;
                        }}
                      />
                    </div>
                  </div>
                  <span className={`badge text-xs ${p.origin === 'GCC' ? 'badge-secondary' : 'badge-primary'}`}>{p.origin === 'GCC' ? 'خليجي' : 'عالمي'}</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">{p.nameAr}</h3>
                <StarRating rating={p.rating} className="mb-3" />
                <div className="mt-auto">
                  <div className="text-lg font-bold text-white">
                    {p.startingPriceSAR === 0
                      ? <span className="text-emerald-400">مجاني</span>
                      : <>{p.startingPriceSAR.toLocaleString('en-US')} <span className="text-sm text-slate-400">ر.س/شهر</span></>}
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