import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StarRating } from '@/components/ui/star-rating';
import { ComparisonView } from '@/components/comparisons/comparison-view';
import { prisma } from '@/lib/db';

export const revalidate = 3600;
interface Props { params: Promise<{ slug: string }> }

const VS_PAIRS = [
  ['salla','zid'],['salla','shopify'],['salla','woocommerce'],['salla','bigcommerce'],['salla','magento'],
  ['zid','shopify'],['zid','woocommerce'],['zid','bigcommerce'],['zid','magento'],
  ['shopify','woocommerce'],['shopify','bigcommerce'],['shopify','magento'],
  ['woocommerce','bigcommerce'],['woocommerce','magento'],['bigcommerce','magento'],
] as const;

function parseVsSlug(slug: string): [string,string]|null {
  const p = slug.split('-vs-');
  if (p.length !== 2 || !p[0] || !p[1]) return null;
  return [p[0], p[1]];
}

export async function generateStaticParams() {
  const platforms = await prisma.platform.findMany({ select: { slug: true } });
  return [
    ...platforms.map(p => ({ slug: p.slug })),
    ...VS_PAIRS.map(([a,b]) => ({ slug: `${a}-vs-${b}` })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vs = parseVsSlug(slug);
  if (vs) {
    const [a,b] = vs;
    const [pa,pb] = await Promise.all([
      prisma.platform.findUnique({ where: { slug: a }, select: { nameAr: true } }),
      prisma.platform.findUnique({ where: { slug: b }, select: { nameAr: true } }),
    ]);
    if (!pa || !pb) return {};
    return { title: `${pa.nameAr} vs ${pb.nameAr}: مقارنة شاملة ٢٠٢٦` };
  }
  const p = await prisma.platform.findUnique({ where: { slug } });
  if (!p) return {};
  return { title: `مراجعة ${p.nameAr} ٢٠٢٦` };
}

export default async function PlatformOrComparisonPage({ params }: Props) {
  const { slug } = await params;
  const vs = parseVsSlug(slug);

  if (vs) {
    const [slugA, slugB] = vs;
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen pt-16">
          <ComparisonView slugA={slugA} slugB={slugB} />
        </main>
        <SiteFooter />
      </>
    );
  }

  const platform = await prisma.platform.findUnique({
    where: { slug },
    include: {
      pricingTiers: { orderBy: { sortOrder: 'asc' } },
      hiddenCosts: { orderBy: { sortOrder: 'asc' } },
      pros: { orderBy: { sortOrder: 'asc' } },
      cons: { orderBy: { sortOrder: 'asc' } },
    },
  });
  if (!platform) notFound();

  const entryTier = platform.pricingTiers[0];
  const faqs = [
    {
      q: `كم تكلفة استخدام ${platform.nameAr} شهرياً؟`,
      a: entryTier ? (entryTier.monthlyFeeSAR === 0 ? `تبدأ باقات ${platform.nameAr} مجانية.` : `تبدأ من ${entryTier.monthlyFeeSAR} ر.س شهرياً.`) : `تختلف حسب الباقة.`,
    },
    {
      q: `هل ${platform.nameAr} مناسب للمبتدئين؟`,
      a: platform.isEnterprise ? `${platform.nameAr} مصمم للمؤسسات الكبرى.` : `${platform.nameAr} مناسب نسبياً للمبتدئين.`,
    },
    {
      q: `هل يدعم ${platform.nameAr} السوق السعودي؟`,
      a: platform.origin === 'GCC' ? `نعم، ${platform.nameAr} مصمم خصيصاً للسوق السعودي والخليجي.` : `${platform.nameAr} منصة عالمية.`,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>/</span>
            <Link href="/muqaranat" className="hover:text-white">المقارنات</Link>
            <span>/</span>
            <span className="text-white">{platform.nameAr}</span>
          </nav>
          <div className="glass p-8 mb-8">
            <div className="flex items-start gap-6 flex-wrap">
              <div className="w-20 h-20 rounded-2xl border border-white/10 flex items-center justify-center p-2 flex-shrink-0"
                style={{ backgroundColor: `${platform.brandColor}22` }}>
                <img src={`/logos/${platform.slug}.png`} alt={platform.nameAr}
                  className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-4xl font-extrabold text-white">{platform.nameAr}</h1>
                  <span className={`badge text-sm ${platform.origin === 'GCC' ? 'badge-secondary' : 'badge-primary'}`}>
                    {platform.origin === 'GCC' ? 'خليجي' : 'عالمي'}
                  </span>
                  {platform.isEnterprise && <span className="badge badge-warning text-sm">مؤسسي</span>}
                </div>
                <StarRating rating={platform.rating} size="md" className="mb-3" />
                <p className="text-slate-300 leading-relaxed">{platform.descriptionAr}</p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-extrabold text-white mb-4">الباقات والأسعار</h2>
            <div className="grid gap-4">
              {platform.pricingTiers.map((tier) => (
                <div key={tier.id} className="glass p-5 flex items-center gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="font-extrabold text-white text-lg">{tier.nameAr}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-white">
                      {tier.monthlyFeeSAR === 0
                        ? <span className="text-emerald-400">مجاني</span>
                        : <>{tier.monthlyFeeSAR.toLocaleString('en-US')} <span className="text-sm text-slate-400">ر.س/شهر</span></>}
                    </div>
                    {tier.transactionFeePct > 0 && (
                      <div className="text-xs text-amber-400">+ {tier.transactionFeePct}% رسوم معاملات</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <section>
              <h2 className="text-xl font-extrabold text-white mb-4">المميزات</h2>
              <ul className="space-y-3">
                {platform.pros.map((pro) => (
                  <li key={pro.id} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                    {pro.textAr}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-extrabold text-white mb-4">العيوب</h2>
              <ul className="space-y-3">
                {platform.cons.map((con) => (
                  <li key={con.id} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    {con.textAr}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {platform.quickVerdictAr && (
            <div className="glass p-6 border-r-4 border-secondary mb-8">
              <h3 className="text-lg font-extrabold text-white mb-2">الحكم السريع</h3>
              <p className="text-slate-300 leading-relaxed">{platform.quickVerdictAr}</p>
            </div>
          )}

          {platform.commissionInfo && (
            <div className="glass p-6 mb-8">
              <h3 className="text-lg font-extrabold text-white mb-2">العمولات والرسوم</h3>
              <p className="text-slate-300 leading-relaxed">{platform.commissionInfo}</p>
            </div>
          )}

          <section>
            <h2 className="text-2xl font-extrabold text-white mb-4">الأسئلة الشائعة</h2>
            <div className="glass overflow-hidden">
              {faqs.map((faq, i) => (
                <div key={i} className={`p-5 ${i < faqs.length - 1 ? 'border-b border-white/6' : ''}`}>
                  <h3 className="font-bold text-white text-sm mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}