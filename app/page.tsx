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
  title: 'دليل المتاجر — مقارنة منصات التجارة الإلكترونية بالسعودية',
  description: 'المرجع الأول عربياً لمقارنة سلة، زد، شوبيفاي، ووكومرس، BigCommerce وماجنتو — بأسعار حقيقية بالريال السعودي',
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
        <CalculatorTeaser />
        <LatestArticles articles={articles} />
      </main>
      <SiteFooter />
    </>
  );
}