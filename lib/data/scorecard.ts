import type { PlatformConfig } from '../calculator/types';
import type { FeatureSupportMap } from './features';

export interface ScorecardRow {
  category: string;
  slugA: number;
  slugB: number;
  winner: 'A' | 'B' | 'tie';
}

export interface Scorecard {
  rows: ScorecardRow[];
  totalA: number;
  totalB: number;
  winner: 'A' | 'B' | 'tie';
}

const EDITORIAL_SCORES: Record<string, Record<string, number>> = {
  'التوسع الدولي': { salla: 2, zid: 2, shopify: 5, woocommerce: 4, bigcommerce: 4, magento: 4 },
  'التخصيص': { salla: 3, zid: 3, shopify: 4, woocommerce: 5, bigcommerce: 3, magento: 5 },
  'سهولة الاستخدام': { salla: 5, zid: 5, shopify: 4, woocommerce: 2, bigcommerce: 3, magento: 1 },
  'التسويق': { salla: 3, zid: 4, shopify: 5, woocommerce: 4, bigcommerce: 4, magento: 3 },
  'الدعم الفني': { salla: 5, zid: 5, shopify: 2, woocommerce: 1, bigcommerce: 2, magento: 1 },
  'دعم عربي': { salla: 5, zid: 5, shopify: 2, woocommerce: 2, bigcommerce: 1, magento: 1 },
  'بوابات الدفع': { salla: 5, zid: 5, shopify: 3, woocommerce: 4, bigcommerce: 3, magento: 4 },
};

export function buildScorecard(
  slugA: string,
  slugB: string,
  configs: PlatformConfig[],
  featureMap: FeatureSupportMap
): Scorecard {
  const rows: ScorecardRow[] = Object.entries(EDITORIAL_SCORES).map(([category, scores]) => {
    const scoreA = scores[slugA] ?? 3;
    const scoreB = scores[slugB] ?? 3;
    return {
      category,
      slugA: scoreA,
      slugB: scoreB,
      winner: scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'tie',
    };
  });

  const totalA = rows.reduce((sum, r) => sum + r.slugA, 0);
  const totalB = rows.reduce((sum, r) => sum + r.slugB, 0);

  return {
    rows,
    totalA,
    totalB,
    winner: totalA > totalB ? 'A' : totalB > totalA ? 'B' : 'tie',
  };
}