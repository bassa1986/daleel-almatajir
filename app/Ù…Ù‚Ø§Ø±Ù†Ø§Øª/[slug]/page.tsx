export const dynamic = 'force-dynamic'
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

function parseVsSlug(slug: string): [string, string] | null {
  const parts = slug.split('-vs-');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return [parts[0], parts[1]];
}

export async function generateStaticParams() {
  const platforms = await prisma.platform.findMany({ select: { slug: true } });
  const platformParams = platforms.map((p) => ({ slug: p.slug }));
  const vsParams = VS_PAIRS.map(([a, b]) => ({ slug: `${a}-vs-${b}` }));
  return [...platformParams, ...vsParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vs = parseVsSlug(slug);

  if (vs) {
    const [slugA, slugB] = vs;
    const [pa, pb] = await Promise.all([
      prisma.platform.findUnique({ where: { slug: slugA }, select: { nameAr: true } }),
      prisma.platform.findUnique({ where: { slug: slugB }, select: { nameAr: true } }),
    ]);
    if (!pa || !pb) return {};
    return {
      title: `${pa.nameAr} vs ${pb.nameAr}: مقارنة شاملة ٢٠٢٦`,
      description: `مقارنة شاملة بين ${pa.nameAr} و${pb.nameAr} من حيث الأسعار، المزايا، الدعم العربي وبوابات الدفع.`.slice(0, 155),
    };
  }

  const p = await prisma.platform.findUnique({ where: { slug } });
  if (!p) return {};
  return {
    title: `مراجعة ${p.nameAr} ٢٠٢٦: الأسعار والمميزات`,
    description: p.descriptionAr.slice(0, 155),
  };
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
      hiddenCosts:  { orderBy: { sortOrder: 'asc' } },
      pros:         { orderBy: { sortOrder: 'asc' } },
      cons:         { orderBy: { sortOrder: 'asc' } },
    },
  });
  if (!platform) notFound();

  const entryTier = platform.pricingTiers[0];

  // FAQPage + Review + BreadcrumbList JSON-LD (SECTION 8 SEO SYSTEM)
  const faqs = [
    {
      q: `كم تكلفة استخدام ${platform.nameAr} شهرياً؟`,
      a: entryTier
        ? entryTier.monthlyFeeSAR === 0
          ? `تبدأ باقات ${platform.nameAr} مجانية، مع تكاليف إضافية محتملة بحسب الاستخدام.`
          : `تبدأ باقات ${platform.nameAr} من ${entryTier.monthlyFeeSAR.toLocaleString('en-US')} ر.س شهرياً للباقة ${entryTier.nameAr}.`
        : `تختلف تكلفة ${platform.nameAr} حسب الباقة المختارة.`,
    },
    {
      q: `هل ${platform.nameAr} مناسب للمبتدئين؟`,
      a: platform.isEnterprise
        ? `${platform.nameAr} مصمم بشكل أساسي للمؤسسات الكبرى ويتطلب فريقاً تقنياً، وقد لا يكون الخيار الأمثل للمبتدئين.`
        : `${platform.nameAr} مناسب نسبياً لأصحاب المتاجر الجدد، خصوصاً عند مقارنته بالمنصات التي تتطلب خبرة تقنية متعمقة.`,
    },
    {
      q: `ما هي أهم مزايا ${platform.nameAr}؟`,
      a: platform.pros.slice(0, 2).map((p) => p.textAr).join(' كما أن ') || `${platform.nameAr} يقدم مجموعة من المزايا التنافسية في السوق.`,
    },
    {
      q: `هل يدعم ${platform.nameAr} السوق السعودي والخليجي؟`,
      a: platform.origin === 'GCC'
        ? `نعم، ${platform.nameAr} مصمم خصيصاً للسوق السعودي والخليجي مع دعم كامل للغة العربية وبوابات الدفع المحلية.`
        : `${platform.nameAr} منصة عالمية، ويختلف مستوى دعمها للسوق السعودي والخليجي بحسب الميزة — راجع مصفوفة المزايا للتفاصيل الدقيقة.`,
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://daleel-almatajir.com' },
        { '@type': 'ListItem', position: 2, name: 'المقارنات', item: 'https://daleel-almatajir.com/مقارنات' },
        { '@type': 'ListItem', position: 3, name: platform.nameAr, item: `https://daleel-almatajir.com/مقارنات/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: { '@type': 'SoftwareApplication', name: platform.nameAr, applicationCategory: 'BusinessApplication' },
      reviewRating: { '@type': 'Rating', ratingValue: platform.rating, bestRating: 5 },
      author: { '@type': 'Organization', name: 'دليل المتاجر' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/مقارنات" className="hover:text-white transition-colors">المقارنات</Link>
            <span>/</span>
            <span className="text-white">{platform.nameAr}</span>
          </nav>

          {/* Header */}
          <div className="glass p-8 mb-8">
            <div className="flex items-start gap-6 flex-wrap">
              <div
                className="w-20 h-20 rounded-2xl border border-white/10 flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${platform.brandColor}22` }}
              >
                <span style={{ color: platform.brandColor }}>●</span>
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
            {platform.affiliateUrl && (
              <div className="mt-6 pt-6 border-t border-white/8">
                <a
                  href={platform.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary text-sm px-6 py-3"
                  style={{ backgroundColor: platform.brandColor }}
                >
                  ابدأ مع {platform.nameAr} ←
                </a>
              </div>
            )}
          </div>

          {/* Pricing tiers */}
          <section className="mb-8">
            <h2 className="text-2xl font-extrabold text-white mb-4">الباقات والأسعار</h2>
            <div className="grid gap-4">
              {platform.pricingTiers.map((tier) => (
                <div key={tier.id} className="glass p-5 flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-white text-lg">{tier.nameAr}</div>
                    {tier.maxRevenueSAR && (
                      <div className="text-xs text-slate-500 mt-0.5">
                        حتى {tier.maxRevenueSAR.toLocaleString('en-US')} ر.س إيرادات شهرية
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="figure text-2xl font-extrabold text-white">
                      {tier.monthlyFeeSAR === 0 ? <span className="text-emerald-400">مجاني</span>
                        : <>{tier.monthlyFeeSAR.toLocaleString('en-US')} <span className="text-sm text-slate-400">ر.س/شهر</span></>}
                    </div>
                    {tier.transactionFeePct > 0 && (
                      <div className="text-xs text-amber-400">+ {tier.transactionFeePct}% رسوم معاملات</div>
                    )}
                    {tier.maxOrders && (
                      <div className="text-xs text-slate-500">حتى {tier.maxOrders.toLocaleString('en-US')} طلب/شهر</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hidden costs */}
          {platform.hiddenCosts.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-extrabold text-white mb-4">التكاليف الإضافية</h2>
              <div className="glass overflow-hidden">
                {platform.hiddenCosts.map((cost, i) => (
                  <div key={cost.id} className={`flex items-center justify-between p-4 ${i < platform.hiddenCosts.length - 1 ? 'border-b border-white/6' : ''}`}>
                    <span className="text-slate-300 text-sm">{cost.labelAr}</span>
                    <div className="text-right">
                      <span className="figure font-bold text-white text-sm">
                        {cost.monthlySAR.toLocaleString('en-US')} ر.س/شهر
                      </span>
                      <span className={`block text-xs ${cost.isRequired ? 'text-red-400' : 'text-slate-500'}`}>
                        {cost.isRequired ? 'إلزامي' : 'اختياري'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <section>
              <h2 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400">✓</span> المميزات
              </h2>
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
              <h2 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
                <span className="text-red-400">✗</span> العيوب
              </h2>
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

          {/* Quick verdict */}
          {platform.quickVerdictAr && (
            <div className="glass p-6 border-r-4 border-secondary mb-8">
              <h3 className="text-lg font-extrabold text-white mb-2">الحكم السريع</h3>
              <p className="text-slate-300 leading-relaxed">{platform.quickVerdictAr}</p>
            </div>
          )}

          {/* FAQ */}
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
