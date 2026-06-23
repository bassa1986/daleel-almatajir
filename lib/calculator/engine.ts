// =============================================================
// دليل المتاجر — Calculator engine
//
// Core function: calculatePlatformCosts(inputs, platforms)
//
// See SECTION 3 of the master build prompt for the full spec this
// implements: tier resolution, Shopify optimal-tier selection,
// WooCommerce scenario costs, Magento threshold warning, tier
// upgrade warnings, ranking and savings.
// =============================================================

import { convertFromSAR, formatNumber } from './currency';
import {
  SHOPIFY_SLUG,
  TIER_UPGRADE_THRESHOLD_RATIO,
  TIER_UPGRADE_WARNING_AR,
} from './constants';
import { round2 } from './utils';
import type {
  CalculatorOutput,
  HiddenCostConfig,
  MerchantInputs,
  PlatformConfig,
  PlatformCostResult,
  PricingTierConfig,
  WooCommerceScenario,
} from './types';

// -------------------------------------------------------------
// Tier resolution
// -------------------------------------------------------------

/**
 * Standard tier resolution (SECTION 3, "TIER RESOLUTION LOGIC"):
 *  1. revenue >= tier.minRevenue AND (tier.maxRevenue === null OR revenue < tier.maxRevenue)
 *  2. AND orders <= tier.maxOrders (if maxOrders is set)
 *  3. If no match -> use the last tier (by sortOrder)
 */
function resolveStandardTier(
  tiers: PricingTierConfig[],
  monthlyRevenue: number,
  monthlyOrders: number
): PricingTierConfig {
  const sorted = [...tiers].sort((a, b) => a.sortOrder - b.sortOrder);

  for (const tier of sorted) {
    const inRevenueRange =
      monthlyRevenue >= tier.minRevenueSAR &&
      (tier.maxRevenueSAR === null || monthlyRevenue < tier.maxRevenueSAR);
    const inOrderRange = tier.maxOrders === null || monthlyOrders <= tier.maxOrders;

    if (inRevenueRange && inOrderRange) {
      return tier;
    }
  }

  return sorted[sorted.length - 1];
}

/**
 * Shopify's tiers aren't revenue-banded — the calculator picks whichever
 * tier yields the lowest combined cost (monthly fee + transaction fees) for
 * the merchant's revenue (SECTION 3, "SHOPIFY SPECIAL LOGIC").
 */
function resolveShopifyTier(
  tiers: PricingTierConfig[],
  monthlyRevenue: number
): PricingTierConfig {
  const sorted = [...tiers].sort((a, b) => a.sortOrder - b.sortOrder);

  let best = sorted[0];
  let bestCost = shopifyTierCost(best, monthlyRevenue);

  for (const tier of sorted.slice(1)) {
    const cost = shopifyTierCost(tier, monthlyRevenue);
    if (cost < bestCost) {
      bestCost = cost;
      best = tier;
    }
  }

  return best;
}

function shopifyTierCost(tier: PricingTierConfig, monthlyRevenue: number): number {
  return tier.monthlyFeeSAR + (tier.transactionFeePct / 100) * monthlyRevenue;
}

/**
 * "ترقيتك لخطة [X] توفر عليك [Y] ر.س شهرياً"
 * Compares the optimal (selected) Shopify tier against the entry-level tier
 * (lowest sortOrder). If the optimal tier is cheaper than what a merchant
 * would default to, surface the savings as an insight string.
 */
function getShopifyInsightAr(
  tiers: PricingTierConfig[],
  monthlyRevenue: number,
  selectedTier: PricingTierConfig
): string | null {
  const sorted = [...tiers].sort((a, b) => a.sortOrder - b.sortOrder);
  const baseline = sorted[0];

  if (selectedTier.id === baseline.id) return null;

  const baselineCost = shopifyTierCost(baseline, monthlyRevenue);
  const selectedCost = shopifyTierCost(selectedTier, monthlyRevenue);
  const savings = baselineCost - selectedCost;

  if (savings <= 0) return null;

  return `ترقيتك لخطة ${selectedTier.nameAr} توفر عليك ${formatNumber(savings, 0)} ر.س شهرياً`;
}

// -------------------------------------------------------------
// Hidden costs
// -------------------------------------------------------------

/**
 * SECTION 3, "WOOCOMMERCE SCENARIO LOGIC" + general hidden-cost handling:
 *  - A cost with a non-empty `scenarios` list (e.g. WooCommerce) applies
 *    only when the active scenario is in that list.
 *  - A cost with an empty `scenarios` list applies only when `isRequired`
 *    is true (e.g. Magento's mandatory hosting/dev-maintenance costs).
 *    Optional add-ons (isRequired: false, scenarios: []) are excluded by
 *    default and can be surfaced separately by the UI if desired.
 */
function calculateHiddenCostsTotal(
  hiddenCosts: HiddenCostConfig[],
  wooCommerceScenario: WooCommerceScenario
): number {
  return hiddenCosts.reduce((sum, cost) => {
    if (cost.scenarios.length > 0) {
      return cost.scenarios.includes(wooCommerceScenario) ? sum + cost.monthlySAR : sum;
    }
    return cost.isRequired ? sum + cost.monthlySAR : sum;
  }, 0);
}

// -------------------------------------------------------------
// Main entry point
// -------------------------------------------------------------

export function calculatePlatformCosts(
  inputs: MerchantInputs,
  platforms: PlatformConfig[]
): CalculatorOutput {
  const { monthlyRevenue, monthlyOrders, currency, annualToggle, includeSetup, wooCommerceScenario } =
    inputs;

  type PlatformCostPartial = {
    platform: PlatformConfig;
    tier: PricingTierConfig;
    monthlySubscription: number;
    transactionFees: number;
    perOrderFees: number;
    hiddenCostsTotal: number;
    totalMonthlyCost: number;
    totalAnnualCost: number;
    costPerOrder: number;
    costAsRevenuePercent: number;
    showMagentoWarning: boolean;
    showTierUpgradeWarning: boolean;
    shopifyInsightAr: string | null;
  };

  const partials: PlatformCostPartial[] = platforms.map((platform) => {
    const tier =
      platform.slug === SHOPIFY_SLUG
        ? resolveShopifyTier(platform.pricingTiers, monthlyRevenue)
        : resolveStandardTier(platform.pricingTiers, monthlyRevenue, monthlyOrders);

    const monthlySubscription = tier.monthlyFeeSAR;
    const transactionFees = (tier.transactionFeePct / 100) * monthlyRevenue;
    const perOrderFees = tier.perOrderFee * monthlyOrders;
    const hiddenCostsTotal = calculateHiddenCostsTotal(platform.hiddenCosts, wooCommerceScenario);

    const totalMonthlyCost = monthlySubscription + transactionFees + perOrderFees + hiddenCostsTotal;
    const totalAnnualCost = totalMonthlyCost * 12 + (includeSetup ? platform.setupFeeSAR : 0);

    const costPerOrder = monthlyOrders > 0 ? totalMonthlyCost / monthlyOrders : 0;
    const costAsRevenuePercent = monthlyRevenue > 0 ? (totalMonthlyCost / monthlyRevenue) * 100 : 0;

    const showMagentoWarning =
      platform.warningThresholdSAR !== null && monthlyRevenue < platform.warningThresholdSAR;

    const showTierUpgradeWarning =
      tier.maxRevenueSAR !== null && monthlyRevenue > tier.maxRevenueSAR * TIER_UPGRADE_THRESHOLD_RATIO;

    const shopifyInsightAr =
      platform.slug === SHOPIFY_SLUG
        ? getShopifyInsightAr(platform.pricingTiers, monthlyRevenue, tier)
        : null;

    return {
      platform,
      tier,
      monthlySubscription,
      transactionFees,
      perOrderFees,
      hiddenCostsTotal,
      totalMonthlyCost,
      totalAnnualCost,
      costPerOrder,
      costAsRevenuePercent,
      showMagentoWarning,
      showTierUpgradeWarning,
      shopifyInsightAr,
    };
  });

  const maxMonthlyCost = partials.length > 0 ? Math.max(...partials.map((p) => p.totalMonthlyCost)) : 0;

  // SORT: ascending by totalMonthlyCost. RANK: 1 = cheapest = recommended.
  const sorted = [...partials].sort((a, b) => a.totalMonthlyCost - b.totalMonthlyCost);

  const results: PlatformCostResult[] = sorted.map((p, index) => {
    const rank = index + 1;
    const primaryCost = annualToggle ? p.totalAnnualCost : p.totalMonthlyCost;

    return {
      platformId: p.platform.id,
      slug: p.platform.slug,
      nameAr: p.platform.nameAr,
      nameEn: p.platform.nameEn,
      logo: p.platform.logo,
      brandColor: p.platform.brandColor,
      affiliateUrl: p.platform.affiliateUrl,

      selectedTier: p.tier,

      monthlySubscription: round2(p.monthlySubscription),
      transactionFees: round2(p.transactionFees),
      perOrderFees: round2(p.perOrderFees),
      hiddenCostsTotal: round2(p.hiddenCostsTotal),
      totalMonthlyCost: round2(p.totalMonthlyCost),
      totalAnnualCost: round2(p.totalAnnualCost),
      costPerOrder: round2(p.costPerOrder),
      costAsRevenuePercent: round2(p.costAsRevenuePercent),
      savingsVsMostExpensive: round2(maxMonthlyCost - p.totalMonthlyCost),

      rank,
      isRecommended: rank === 1,

      showMagentoWarning: p.showMagentoWarning,
      magentoWarningTextAr: p.showMagentoWarning ? p.platform.warningTextAr : null,

      showTierUpgradeWarning: p.showTierUpgradeWarning,
      tierUpgradeWarningTextAr: p.showTierUpgradeWarning ? TIER_UPGRADE_WARNING_AR : null,

      shopifyInsightAr: p.shopifyInsightAr,
      wooCommerceScenario: p.platform.slug === 'woocommerce' ? wooCommerceScenario : null,

      displayCurrency: currency,
      totalMonthlyCostConverted: round2(convertFromSAR(p.totalMonthlyCost, currency)),
      totalAnnualCostConverted: round2(convertFromSAR(p.totalAnnualCost, currency)),

      primaryCost: round2(primaryCost),
      primaryCostConverted: round2(convertFromSAR(primaryCost, currency)),
    };
  });

  return {
    inputs,
    results,
    cheapestPlatformSlug: results[0]?.slug ?? null,
    mostExpensivePlatformSlug: results[results.length - 1]?.slug ?? null,
  };
}
