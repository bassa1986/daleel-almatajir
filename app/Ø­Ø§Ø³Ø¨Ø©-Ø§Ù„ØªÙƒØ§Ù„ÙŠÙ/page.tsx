import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CalculatorApp } from '@/components/calculator/calculator-app';
import { getPlatformsForCalculator } from '@/lib/data/platforms';

export const metadata: Metadata = {
  title: 'Ø­Ø§Ø³Ø¨Ø© ØªÙØ§ÙÙÙ ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© Ù¢Ù Ù¢Ù¦',
  description:
    'Ø§Ø­Ø³Ø¨ Ø§ÙØªÙÙÙØ© Ø§ÙÙØ¹ÙÙØ© ÙÙØªØ¬Ø±Ù Ø¹ÙÙ Ø³ÙØ©Ø Ø²Ø¯Ø Ø´ÙØ¨ÙÙØ§ÙØ ÙÙÙÙÙØ±Ø³Ø Ø¨ÙØº ÙÙÙØ±Ø³ ÙÙØ§Ø¬ÙØªÙ Ø¨Ø§ÙØ±ÙØ§Ù Ø§ÙØ³Ø¹ÙØ¯Ù. ÙÙØ§Ø±ÙØ© ÙÙØ±ÙØ© ÙÙØ­Ø¯Ø«Ø©Ø ÙØ¹ ØªØµØ¯ÙØ± ØªÙØ±ÙØ± PDF.',
};

export const revalidate = 3600;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Ø­Ø§Ø³Ø¨Ø© ØªÙØ§ÙÙÙ ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ©',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'SAR' },
};

export default async function CalculatorPage() {
  const platforms = await getPlatformsForCalculator();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Ø­Ø§Ø³Ø¨Ø© ØªÙØ§ÙÙÙ Ø§ÙÙÙØµØ§Øª
          </h1>
          <p className="text-slate-400 text-lg">
            Ø£Ø¯Ø®Ù Ø¨ÙØ§ÙØ§Øª ÙØªØ¬Ø±Ù ÙØ§Ø­ØµÙ Ø¹ÙÙ ÙÙØ§Ø±ÙØ© Ø¯ÙÙÙØ© Ø¨ÙÙ {platforms.length} ÙÙØµØ§Øª Ø¨Ø§ÙØ±ÙØ§Ù Ø§ÙØ³Ø¹ÙØ¯Ù
          </p>
        </div>

        <Suspense fallback={<CalculatorSkeleton />}>
          <CalculatorApp platforms={platforms} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

function CalculatorSkeleton() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass h-64 mb-8 animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass h-20 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
