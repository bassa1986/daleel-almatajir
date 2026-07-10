export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { HeroSection } from '@/components/home/hero-section';
import { PlatformGrid } from '@/components/home/platform-grid';
import { TopComparisons } from '@/components/home/top-comparisons';
import { CalculatorTeaser } from '@/components/home/calculator-teaser';
import { LatestArticles } from '@/components/home/latest-articles';
import { getHomepagePlatformData } from '@/lib/data/platforms';
import { getLatestArticles } from '@/lib/data/articles';

export const metadata: Metadata = {
  title: 'Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± â ÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© Ø¨Ø§ÙØ³Ø¹ÙØ¯ÙØ©',
  description: 'Ø§ÙÙØ±Ø¬Ø¹ Ø§ÙØ£ÙÙ Ø¹Ø±Ø¨ÙØ§Ù ÙÙÙØ§Ø±ÙØ© Ø³ÙØ©Ø Ø²Ø¯Ø Ø´ÙØ¨ÙÙØ§ÙØ ÙÙÙÙÙØ±Ø³Ø BigCommerce ÙÙØ§Ø¬ÙØªÙ â Ø¨Ø£Ø³Ø¹Ø§Ø± Ø­ÙÙÙÙØ© Ø¨Ø§ÙØ±ÙØ§Ù Ø§ÙØ³Ø¹ÙØ¯Ù',
};

export default async function HomePage() {
  const [{ configs, display }, articles] = await Promise.all([
    getHomepagePlatformData(),
    getLatestArticles(3),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection platforms={display} />
        <PlatformGrid platforms={display} />
        <TopComparisons />
        <CalculatorTeaser platforms={configs} />
        <LatestArticles articles={articles} />
      </main>
      <SiteFooter />
    </>
  );
}