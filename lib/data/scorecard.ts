import { calculatePlatformCosts } from '../calculator/engine';
import { DEFAULT_MERCHANT_INPUTS } from '../calculator/constants';
import type { PlatformConfig } from '../calculator/types';
import type { FeatureSupportMap } from './features';

/**
 * Editorial scorecard categories (SECTION 6, "SCORECARD TABLE"):
 *   الأسعار, الدعم العربي, بوابات الدفع, التوسع الدولي, التخصيص,
 *   سهولة الاستخدام, التسويق, الدعم الفني
 *
 * Three of the eight categories are computed from real data already in the
 * database/calculator (الأسعار, الدعم العربي, بوابات الدفع). The remaining
 * five (التوسع الدولي, التخصيص, سهولة الاستخدام, التسويق, الدعم الفني) have
 * no underlying numeric field in the schema to derive a score from, so they
 * use a fixed 1–5 editorial score per platform — written to be consistent
 * with each platform's seeded pros/cons and descriptionAr. This mirrors how
 * quickVerdictAr/pros/cons were already hand-authored in the seed data.
 */
const EDITORIAL_SCORES: Record<string, Record<string, number>> = {
  'التوسع الدولي': { salla: 2, zid: 2, shopify: 5, woocommerce: 4, bigcommerce: 4, magento: 4 },
  التخصيص: { salla: 3, zid: 3, shopify: 4, woocommerce: 5, bigcommerce: 3, magento: 5 },
  'سهولة الاستخدام': { salla: 5, zid: 5, shopify: 4, woocommerce: 2, bigcommerce: 3, magento: 1 },
  التسويق: { salla: 3, zid: 4, shopify: 5, woocommerce: 4, bigcommerce: 4, magento: 3 },
  'الدعم الفني': { salla: 5, zid: 5, shopify: 2, woocommerce: 1, bigcommerce: 2, magento: 1 },
};

const ARABIC_SUPPORT_FEATURES = ['واجهة عربية كاملة', 'دعم عربي 24/7'];
const PAYMENT_GATEWAY_FEATURES = ['مدى (Mada)', 'Apple Pay', 'STC Pay', 'تاب للمدفوعات'];

const SUPPORT_WEIGHT: Record<string, number> = { yes: 2, partial: 1, no: 0 };

/** Standard revenue figure used for the "example cost" comparison (SECTION 6, "PRICING COMPARISON"). */
export const SCORECARD_EXAMPLE_REVENUE_SAR = 100000;
export const SCORECARD_EXAMPLE_ORDERS = 200;

export interface ScorecardCategory {
  key: string;
  labelAr: string;
  scoreA: number; // 0-100, for bar width
  scoreB: number;
  winner: 'a' | 'b' | 'tie';
  noteAr?: string;
  isComputed: boolean;
}

export interface ScorecardResult {
  categories: ScorecardCategory[];
  totalWinsA: number;
  totalWinsB: number;
  overallWinner: 'a' | 'b' | 'tie';
}

function sumWeights(featureMap: Record<string, string> | undefined, features: string[]): number {
  if (!featureMap) return 0;
  return features.reduce((sum, f) => sum + (SUPPORT_WEIGHT[featureMap[f]] ?? 0), 0);
}

export function buildScorecard(
  slugA: string,
  slugB: string,
  platforms: PlatformConfig[],
  featureMap: FeatureSupportMap
): ScorecardResult {
  const categories: ScorecardCategory[] = [];

  // 1. Pricing — computed live from the calculator engine.
  const costOutput = calculatePlatformCosts(
    {
      ...DEFAULT_MERCHANT_INPUTS,
      monthlyRevenue: SCORECARD_EXAMPLE_REVENUE_SAR,
      monthlyOrders: SCORECARD_EXAMPLE_ORDERS,
    },
    platforms
  );
  const costA = costOutput.results.find((r) => r.slug === slugA)?.totalMonthlyCost ?? 0;
  const costB = costOutput.results.find((r) => r.slug === slugB)?.totalMonthlyCost ?? 0;
  const totalCost = costA + costB;
  categories.push({
    key: 'pricing',
    labelAr: 'الأسعار',
    scoreA: totalCost > 0 ? Math.round((costB / totalCost) * 100) : 50,
    scoreB: totalCost > 0 ? Math.round((costA / totalCost) * 100) : 50,
    winner: costA === costB ? 'tie' : costA < costB ? 'a' : 'b',
    noteAr: `بافتراض إيرادات ${SCORECARD_EXAMPLE_REVENUE_SAR.toLocaleString('en-US')} ر.س و${SCORECARD_EXAMPLE_ORDERS} طلب شهرياً`,
    isComputed: true,
  });

  // 2. Arabic support — computed from seeded feature flags.
  const arSupportA = sumWeights(featureMap[slugA], ARABIC_SUPPORT_FEATURES);
  const arSupportB = sumWeights(featureMap[slugB], ARABIC_SUPPORT_FEATURES);
  const arMax = ARABIC_SUPPORT_FEATURES.length * 2;
  categories.push({
    key: 'arabic-support',
    labelAr: 'الدعم العربي',
    scoreA: arMax > 0 ? Math.round((arSupportA / arMax) * 100) : 0,
    scoreB: arMax > 0 ? Math.round((arSupportB / arMax) * 100) : 0,
    winner: arSupportA === arSupportB ? 'tie' : arSupportA > arSupportB ? 'a' : 'b',
    isComputed: true,
  });

  // 3. Payment gateways — computed from seeded feature flags.
  const payA = sumWeights(featureMap[slugA], PAYMENT_GATEWAY_FEATURES);
  const payB = sumWeights(featureMap[slugB], PAYMENT_GATEWAY_FEATURES);
  const payMax = PAYMENT_GATEWAY_FEATURES.length * 2;
  categories.push({
    key: 'payment-gateways',
    labelAr: 'بوابات الدفع',
    scoreA: payMax > 0 ? Math.round((payA / payMax) * 100) : 0,
    scoreB: payMax > 0 ? Math.round((payB / payMax) * 100) : 0,
    winner: payA === payB ? 'tie' : payA > payB ? 'a' : 'b',
    isComputed: true,
  });

  // 4-8. Editorial categories.
  for (const [labelAr, scores] of Object.entries(EDITORIAL_SCORES)) {
    const scoreA = scores[slugA] ?? 3;
    const scoreB = scores[slugB] ?? 3;
    categories.push({
      key: labelAr,
      labelAr,
      scoreA: scoreA * 20,
      scoreB: scoreB * 20,
      winner: scoreA === scoreB ? 'tie' : scoreA > scoreB ? 'a' : 'b',
      isComputed: false,
    });
  }

  const totalWinsA = categories.filter((c) => c.winner === 'a').length;
  const totalWinsB = categories.filter((c) => c.winner === 'b').length;

  return {
    categories,
    totalWinsA,
    totalWinsB,
    overallWinner: totalWinsA === totalWinsB ? 'tie' : totalWinsA > totalWinsB ? 'a' : 'b',
  };
}
