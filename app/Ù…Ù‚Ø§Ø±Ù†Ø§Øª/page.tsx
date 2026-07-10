import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { getPlatformsForDisplay } from '@/lib/data/platforms';
import { StarRating } from '@/components/ui/star-rating';

export const metadata: Metadata = {
  title: 'ÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© Ù¢Ù Ù¢Ù¦',
  description: 'ÙÙØ§Ø±ÙØ© Ø´Ø§ÙÙØ© Ø¨ÙÙ Ø³ÙØ©Ø Ø²Ø¯Ø Ø´ÙØ¨ÙÙØ§ÙØ ÙÙÙÙÙØ±Ø³Ø Ø¨ÙØº ÙÙÙØ±Ø³ ÙÙØ§Ø¬ÙØªÙ.',
};

export const revalidate = 3600;

const VS_PAIRS = [
  ['salla','zid'],['salla','shopify'],['salla','woocommerce'],
  ['zid','shopify'],['zid','woocommerce'],['shopify','woocommerce'],
  ['salla','bigcommerce'],['zid','bigcommerce'],['shopify','bigcommerce'],
  ['woocommerce','bigcommerce'],['salla','magento'],['zid','magento'],
  ['shopify','magento'],['woocommerce','magento'],['bigcommerce','magento'],
] as const;

export default async function ComparisonsPage() {
  const platforms = await getPlatformsForDisplay();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-white mb-4">ÙÙØ§Ø±ÙØ© Ø§ÙÙÙØµØ§Øª</h1>
            <p className="text-slate-400 text-xl">Ø§Ø®ØªØ± ÙÙØµØ© ÙÙÙØ±Ø§Ø¬Ø¹Ø© Ø§ÙÙØ§ÙÙØ© Ø£Ù ÙØ§Ø±Ù Ø¨ÙÙ ÙÙØµØªÙÙ</p>
          </div>

          {/* Platform review cards */}
          <h2 className="text-2xl font-extrabold text-white mb-6">ÙØ±Ø§Ø¬Ø¹Ø§Øª Ø§ÙÙÙØµØ§Øª</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {platforms.map((p) => (
              <Link key={p.slug} href={`/ÙÙØ§Ø±ÙØ§Øª/${p.slug}`} className="glass glass-hover p-6 block">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${p.brandColor}22` }}
                  >â</div>
                  <span className={`badge text-xs ${p.origin === 'GCC' ? 'badge-secondary' : 'badge-primary'}`}>
                    {p.origin === 'GCC' ? 'Ø®ÙÙØ¬Ù' : 'Ø¹Ø§ÙÙÙ'}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">{p.nameAr}</h3>
                <StarRating rating={p.rating} className="mb-3" />
                <div className="figure text-lg font-bold text-white">
                  {p.startingPriceSAR === 0 ? <span className="text-emerald-400">ÙØ¬Ø§ÙÙ</span> : <>{p.startingPriceSAR.toLocaleString('en-US')} <span className="text-sm text-slate-400">Ø±.Ø³/Ø´ÙØ±</span></>}
                </div>
              </Link>
            ))}
          </div>

          {/* VS comparison pairs */}
          <h2 className="text-2xl font-extrabold text-white mb-6">ÙÙØ§Ø±ÙØ§Øª ÙØ¨Ø§Ø´Ø±Ø© (VS)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VS_PAIRS.map(([a, b]) => {
              const pa = platforms.find(p => p.slug === a);
              const pb = platforms.find(p => p.slug === b);
              if (!pa || !pb) return null;
              return (
                <Link key={`${a}-${b}`} href={`/ÙÙØ§Ø±ÙØ§Øª/${a}-vs-${b}`}
                  className="glass glass-hover flex items-center gap-3 p-4">
                  <span className="font-bold text-white text-sm flex-1">{pa.nameAr}</span>
                  <span className="badge badge-neutral text-xs font-extrabold">VS</span>
                  <span className="font-bold text-white text-sm flex-1 text-left">{pb.nameAr}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
