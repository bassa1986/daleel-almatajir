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
      title: `${pa.nameAr} vs ${pb.nameAr}: ÙÙØ§Ø±ÙØ© Ø´Ø§ÙÙØ© Ù¢Ù Ù¢Ù¦`,
      description: `ÙÙØ§Ø±ÙØ© Ø´Ø§ÙÙØ© Ø¨ÙÙ ${pa.nameAr} Ù${pb.nameAr} ÙÙ Ø­ÙØ« Ø§ÙØ£Ø³Ø¹Ø§Ø±Ø Ø§ÙÙØ²Ø§ÙØ§Ø Ø§ÙØ¯Ø¹Ù Ø§ÙØ¹Ø±Ø¨Ù ÙØ¨ÙØ§Ø¨Ø§Øª Ø§ÙØ¯ÙØ¹.`.slice(0, 155),
    };
  }

  const p = await prisma.platform.findUnique({ where: { slug } });
  if (!p) return {};
  return {
    title: `ÙØ±Ø§Ø¬Ø¹Ø© ${p.nameAr} Ù¢Ù Ù¢Ù¦: Ø§ÙØ£Ø³Ø¹Ø§Ø± ÙØ§ÙÙÙÙØ²Ø§Øª`,
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
      q: `ÙÙ ØªÙÙÙØ© Ø§Ø³ØªØ®Ø¯Ø§Ù ${platform.nameAr} Ø´ÙØ±ÙØ§ÙØ`,
      a: entryTier
        ? entryTier.monthlyFeeSAR === 0
          ? `ØªØ¨Ø¯Ø£ Ø¨Ø§ÙØ§Øª ${platform.nameAr} ÙØ¬Ø§ÙÙØ©Ø ÙØ¹ ØªÙØ§ÙÙÙ Ø¥Ø¶Ø§ÙÙØ© ÙØ­ØªÙÙØ© Ø¨Ø­Ø³Ø¨ Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù.`
          : `ØªØ¨Ø¯Ø£ Ø¨Ø§ÙØ§Øª ${platform.nameAr} ÙÙ ${entryTier.monthlyFeeSAR.toLocaleString('en-US')} Ø±.Ø³ Ø´ÙØ±ÙØ§Ù ÙÙØ¨Ø§ÙØ© ${entryTier.nameAr}.`
        : `ØªØ®ØªÙÙ ØªÙÙÙØ© ${platform.nameAr} Ø­Ø³Ø¨ Ø§ÙØ¨Ø§ÙØ© Ø§ÙÙØ®ØªØ§Ø±Ø©.`,
    },
    {
      q: `ÙÙ ${platform.nameAr} ÙÙØ§Ø³Ø¨ ÙÙÙØ¨ØªØ¯Ø¦ÙÙØ`,
      a: platform.isEnterprise
        ? `${platform.nameAr} ÙØµÙÙ Ø¨Ø´ÙÙ Ø£Ø³Ø§Ø³Ù ÙÙÙØ¤Ø³Ø³Ø§Øª Ø§ÙÙØ¨Ø±Ù ÙÙØªØ·ÙØ¨ ÙØ±ÙÙØ§Ù ØªÙÙÙØ§ÙØ ÙÙØ¯ ÙØ§ ÙÙÙÙ Ø§ÙØ®ÙØ§Ø± Ø§ÙØ£ÙØ«Ù ÙÙÙØ¨ØªØ¯Ø¦ÙÙ.`
        : `${platform.nameAr} ÙÙØ§Ø³Ø¨ ÙØ³Ø¨ÙØ§Ù ÙØ£ØµØ­Ø§Ø¨ Ø§ÙÙØªØ§Ø¬Ø± Ø§ÙØ¬Ø¯Ø¯Ø Ø®ØµÙØµØ§Ù Ø¹ÙØ¯ ÙÙØ§Ø±ÙØªÙ Ø¨Ø§ÙÙÙØµØ§Øª Ø§ÙØªÙ ØªØªØ·ÙØ¨ Ø®Ø¨Ø±Ø© ØªÙÙÙØ© ÙØªØ¹ÙÙØ©.`,
    },
    {
      q: `ÙØ§ ÙÙ Ø£ÙÙ ÙØ²Ø§ÙØ§ ${platform.nameAr}Ø`,
      a: platform.pros.slice(0, 2).map((p) => p.textAr).join(' ÙÙØ§ Ø£Ù ') || `${platform.nameAr} ÙÙØ¯Ù ÙØ¬ÙÙØ¹Ø© ÙÙ Ø§ÙÙØ²Ø§ÙØ§ Ø§ÙØªÙØ§ÙØ³ÙØ© ÙÙ Ø§ÙØ³ÙÙ.`,
    },
    {
      q: `ÙÙ ÙØ¯Ø¹Ù ${platform.nameAr} Ø§ÙØ³ÙÙ Ø§ÙØ³Ø¹ÙØ¯Ù ÙØ§ÙØ®ÙÙØ¬ÙØ`,
      a: platform.origin === 'GCC'
        ? `ÙØ¹ÙØ ${platform.nameAr} ÙØµÙÙ Ø®ØµÙØµØ§Ù ÙÙØ³ÙÙ Ø§ÙØ³Ø¹ÙØ¯Ù ÙØ§ÙØ®ÙÙØ¬Ù ÙØ¹ Ø¯Ø¹Ù ÙØ§ÙÙ ÙÙØºØ© Ø§ÙØ¹Ø±Ø¨ÙØ© ÙØ¨ÙØ§Ø¨Ø§Øª Ø§ÙØ¯ÙØ¹ Ø§ÙÙØ­ÙÙØ©.`
        : `${platform.nameAr} ÙÙØµØ© Ø¹Ø§ÙÙÙØ©Ø ÙÙØ®ØªÙÙ ÙØ³ØªÙÙ Ø¯Ø¹ÙÙØ§ ÙÙØ³ÙÙ Ø§ÙØ³Ø¹ÙØ¯Ù ÙØ§ÙØ®ÙÙØ¬Ù Ø¨Ø­Ø³Ø¨ Ø§ÙÙÙØ²Ø© â Ø±Ø§Ø¬Ø¹ ÙØµÙÙÙØ© Ø§ÙÙØ²Ø§ÙØ§ ÙÙØªÙØ§ØµÙÙ Ø§ÙØ¯ÙÙÙØ©.`,
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ø§ÙØ±Ø¦ÙØ³ÙØ©', item: 'https://daleel-almatajir.com' },
        { '@type': 'ListItem', position: 2, name: 'Ø§ÙÙÙØ§Ø±ÙØ§Øª', item: 'https://daleel-almatajir.com/ÙÙØ§Ø±ÙØ§Øª' },
        { '@type': 'ListItem', position: 3, name: platform.nameAr, item: `https://daleel-almatajir.com/ÙÙØ§Ø±ÙØ§Øª/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: { '@type': 'SoftwareApplication', name: platform.nameAr, applicationCategory: 'BusinessApplication' },
      reviewRating: { '@type': 'Rating', ratingValue: platform.rating, bestRating: 5 },
      author: { '@type': 'Organization', name: 'Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±' },
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
            <Link href="/" className="hover:text-white transition-colors">Ø§ÙØ±Ø¦ÙØ³ÙØ©</Link>
            <span>/</span>
            <Link href="/ÙÙØ§Ø±ÙØ§Øª" className="hover:text-white transition-colors">Ø§ÙÙÙØ§Ø±ÙØ§Øª</Link>
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
                <span style={{ color: platform.brandColor }}>â</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-4xl font-extrabold text-white">{platform.nameAr}</h1>
                  <span className={`badge text-sm ${platform.origin === 'GCC' ? 'badge-secondary' : 'badge-primary'}`}>
                    {platform.origin === 'GCC' ? 'Ø®ÙÙØ¬Ù' : 'Ø¹Ø§ÙÙÙ'}
                  </span>
                  {platform.isEnterprise && <span className="badge badge-warning text-sm">ÙØ¤Ø³Ø³Ù</span>}
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
                  Ø§Ø¨Ø¯Ø£ ÙØ¹ {platform.nameAr} â
                </a>
              </div>
            )}
          </div>

          {/* Pricing tiers */}
          <section className="mb-8">
            <h2 className="text-2xl font-extrabold text-white mb-4">Ø§ÙØ¨Ø§ÙØ§Øª ÙØ§ÙØ£Ø³Ø¹Ø§Ø±</h2>
            <div className="grid gap-4">
              {platform.pricingTiers.map((tier) => (
                <div key={tier.id} className="glass p-5 flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-white text-lg">{tier.nameAr}</div>
                    {tier.maxRevenueSAR && (
                      <div className="text-xs text-slate-500 mt-0.5">
                        Ø­ØªÙ {tier.maxRevenueSAR.toLocaleString('en-US')} Ø±.Ø³ Ø¥ÙØ±Ø§Ø¯Ø§Øª Ø´ÙØ±ÙØ©
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="figure text-2xl font-extrabold text-white">
                      {tier.monthlyFeeSAR === 0 ? <span className="text-emerald-400">ÙØ¬Ø§ÙÙ</span>
                        : <>{tier.monthlyFeeSAR.toLocaleString('en-US')} <span className="text-sm text-slate-400">Ø±.Ø³/Ø´ÙØ±</span></>}
                    </div>
                    {tier.transactionFeePct > 0 && (
                      <div className="text-xs text-amber-400">+ {tier.transactionFeePct}% Ø±Ø³ÙÙ ÙØ¹Ø§ÙÙØ§Øª</div>
                    )}
                    {tier.maxOrders && (
                      <div className="text-xs text-slate-500">Ø­ØªÙ {tier.maxOrders.toLocaleString('en-US')} Ø·ÙØ¨/Ø´ÙØ±</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hidden costs */}
          {platform.hiddenCosts.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-extrabold text-white mb-4">Ø§ÙØªÙØ§ÙÙÙ Ø§ÙØ¥Ø¶Ø§ÙÙØ©</h2>
              <div className="glass overflow-hidden">
                {platform.hiddenCosts.map((cost, i) => (
                  <div key={cost.id} className={`flex items-center justify-between p-4 ${i < platform.hiddenCosts.length - 1 ? 'border-b border-white/6' : ''}`}>
                    <span className="text-slate-300 text-sm">{cost.labelAr}</span>
                    <div className="text-right">
                      <span className="figure font-bold text-white text-sm">
                        {cost.monthlySAR.toLocaleString('en-US')} Ø±.Ø³/Ø´ÙØ±
                      </span>
                      <span className={`block text-xs ${cost.isRequired ? 'text-red-400' : 'text-slate-500'}`}>
                        {cost.isRequired ? 'Ø¥ÙØ²Ø§ÙÙ' : 'Ø§Ø®ØªÙØ§Ø±Ù'}
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
                <span className="text-emerald-400">â</span> Ø§ÙÙÙÙØ²Ø§Øª
              </h2>
              <ul className="space-y-3">
                {platform.pros.map((pro) => (
                  <li key={pro.id} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">â</span>
                    {pro.textAr}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
                <span className="text-red-400">â</span> Ø§ÙØ¹ÙÙØ¨
              </h2>
              <ul className="space-y-3">
                {platform.cons.map((con) => (
                  <li key={con.id} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">â</span>
                    {con.textAr}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Quick verdict */}
          {platform.quickVerdictAr && (
            <div className="glass p-6 border-r-4 border-secondary mb-8">
              <h3 className="text-lg font-extrabold text-white mb-2">Ø§ÙØ­ÙÙ Ø§ÙØ³Ø±ÙØ¹</h3>
              <p className="text-slate-300 leading-relaxed">{platform.quickVerdictAr}</p>
            </div>
          )}

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-extrabold text-white mb-4">Ø§ÙØ£Ø³Ø¦ÙØ© Ø§ÙØ´Ø§Ø¦Ø¹Ø©</h2>
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
