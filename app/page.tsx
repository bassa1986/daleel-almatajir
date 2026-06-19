export const dynamic = 'force-dynamic'
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { HeroSection } from '@/components/home/hero-section';
import { CalculatorTeaser } from '@/components/home/calculator-teaser';
import { PlatformGrid } from '@/components/home/platform-grid';
import { HowItWorks } from '@/components/home/how-it-works';
import { TopComparisons } from '@/components/home/top-comparisons';
import { LatestArticles } from '@/components/home/latest-articles';
import { getHomepagePlatformData } from '@/lib/data/platforms';
import { getLatestArticles } from '@/lib/data/articles';

export const metadata: Metadata = {
  title: 'دليل المتاجر — مقارنة منصات التجارة الإلكترونية ٢٠٢٦',
  description:
    'قارن بين سلة، زد، شوبيفاي، ووكومرس، بيغ كومرس وماجنتو من حيث الأسعار والمزايا. احسب التكلفة الفعلية لمتجرك بالريال السعودي.',
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function HomePage() {
  const [{ configs, display }, articles] = await Promise.all([
    getHomepagePlatformData(),
    getLatestArticles(3),
  ]);

  return (
    <>
      <SiteHeader />

      <main>
        {/* Section 1 — Hero */}
        <HeroSection platforms={display} />

        {/* Section 2 — Calculator Teaser */}
        <CalculatorTeaser platforms={configs} />

        {/* Section 3 — Platform Grid */}
        <PlatformGrid platforms={display} />

        {/* Section 4 — How It Works */}
        <HowItWorks />

        {/* Section 5 — Top Comparisons */}
        <TopComparisons />

        {/* Section 6 — Latest Articles */}
        <LatestArticles articles={articles} />
      </main>

      {/* Section 7 — Footer */}
      <SiteFooter />
    </>
  );
}
