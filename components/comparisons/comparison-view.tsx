import { notFound } from 'next/navigation';
import { getPlatformWithFullRelations, getPlatformsForCalculator } from '@/lib/data/platforms';
import { getFeatureSupportMap, getFeatureMatrix } from '@/lib/data/features';
import { buildScorecard } from '@/lib/data/scorecard';
import { DisclosureBanner } from './disclosure-banner';
import { VsHero } from './vs-hero';
import { QuickVerdict } from './quick-verdict';
import { ScorecardTable } from './scorecard-table';
import { PricingComparison } from './pricing-comparison';
import { FeatureMatrix } from './feature-matrix';
import { MiniCalculatorEmbedded } from './mini-calculator-embedded';
import { CategoryDeepDives } from './category-deep-dives';
import { UseCaseQuiz } from './use-case-quiz';
import { FinalVerdict } from './final-verdict';
import { RelatedComparisons } from './related-comparisons';
import { TocSidebar } from './toc-sidebar';

interface ComparisonViewProps {
  slugA: string;
  slugB: string;
}

export async function ComparisonView({ slugA, slugB }: ComparisonViewProps) {
  const [platformA, platformB, allConfigs, featureMap, featureMatrixRows] = await Promise.all([
    getPlatformWithFullRelations(slugA),
    getPlatformWithFullRelations(slugB),
    getPlatformsForCalculator(),
    getFeatureSupportMap([slugA, slugB]),
    getFeatureMatrix(slugA, slugB),
  ]);

  if (!platformA || !platformB) notFound();

  const configA = allConfigs.find((c) => c.slug === slugA);
  const configB = allConfigs.find((c) => c.slug === slugB);
  if (!configA || !configB) notFound();

  const scorecard = buildScorecard(slugA, slugB, [configA, configB], featureMap);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `مقارنة ${platformA.nameAr} و${platformB.nameAr}`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: platformA.nameAr, url: `https://daleel-almatajir.com/muqaranat/${slugA}` },
        { '@type': 'ListItem', position: 2, name: platformB.nameAr, url: `https://daleel-almatajir.com/muqaranat/${slugB}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://daleel-almatajir.com' },
        { '@type': 'ListItem', position: 2, name: 'المقارنات', item: 'https://daleel-almatajir.com/muqaranat' },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${platformA.nameAr} vs ${platformB.nameAr}`,
          item: `https://daleel-almatajir.com/muqaranat/${slugA}-vs-${slugB}`,
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <DisclosureBanner />

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-20 flex gap-10">
        <TocSidebar />

        <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
          <VsHero platformA={platformA} platformB={platformB} />
          <QuickVerdict platformA={platformA} platformB={platformB} />
          <ScorecardTable scorecard={scorecard} platformA={platformA} platformB={platformB} />
          <PricingComparison platformA={platformA} platformB={platformB} configs={[configA, configB]} />
          <FeatureMatrix rows={featureMatrixRows} nameA={platformA.nameAr} nameB={platformB.nameAr} />
          <MiniCalculatorEmbedded configA={configA} configB={configB} />
          <CategoryDeepDives scorecard={scorecard} platformA={platformA} platformB={platformB} />
          <UseCaseQuiz scorecard={scorecard} platformA={platformA} platformB={platformB} />
          <FinalVerdict platformA={platformA} platformB={platformB} scorecard={scorecard} />
          <RelatedComparisons currentSlugA={slugA} currentSlugB={slugB} />
        </div>
      </div>
    </>
  );
}
