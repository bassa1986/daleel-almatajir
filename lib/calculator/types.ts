// =============================================================
// Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± â Calculator types
// =============================================================

export type Currency = 'SAR' | 'USD' | 'AED';

export type WooCommerceScenario = 'minimal' | 'typical' | 'managed';

export type SupportLevel = 'yes' | 'no' | 'partial';

// -------------------------------------------------------------
// Inputs
// -------------------------------------------------------------

/**
 * All revenue figures are stored internally in SAR regardless of the
 * `currency` the merchant chose for display. `currency` only affects how
 * results are *converted and formatted* for display/export.
 */
export interface MerchantInputs {
  /** Monthly store revenue, in SAR. */
  monthlyRevenue: number;
  /** Number of orders per month. */
  monthlyOrders: number;
  /** Display currency for results. */
  currency: Currency;
  /** Whether the UI should emphasize annual cost over monthly cost. */
  annualToggle: boolean;
  /** Whether one-time setup fees should be included in annual cost totals. */
  includeSetup: boolean;
  /** Which WooCommerce hidden-cost scenario to apply. */
  wooCommerceScenario: WooCommerceScenario;
}

// -------------------------------------------------------------
// Platform configuration (shape compatible with the Prisma models
// from prisma/schema.prisma â a `Platform` with its relations loaded
// can be passed directly).
// -------------------------------------------------------------

export interface PricingTierConfig {
  id: string;
  name: string;
  nameAr: string;
  minRevenueSAR: number;
  maxRevenueSAR: number | null;
  monthlyFeeSAR: number;
  /** Percentage points, e.g. `2` means 2%. */
  transactionFeePct: number;
  perOrderFee: number;
  maxOrders: number | null;
  annualRevLimitSAR: number | null;
  sortOrder: number;
}

export interface HiddenCostConfig {
  id: string;
  labelAr: string;
  monthlySAR: number;
  isRequired: boolean;
  /**
   * If non-empty, this cost only applies when the active
   * `wooCommerceScenario` is included in this list (used by WooCommerce).
   * If empty, the cost applies whenever `isRequired` is true
   * (used by platforms like Magento).
   */
  scenarios: string[];
  sortOrder: number;
}

export interface PlatformConfig {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  brandColor: string;
  affiliateUrl: string;
  setupFeeSAR: number;
  warningThresholdSAR: number | null;
  warningTextAr: string | null;
  pricingTiers: PricingTierConfig[];
  hiddenCosts: HiddenCostConfig[];
}

// -------------------------------------------------------------
// Output
// -------------------------------------------------------------

export interface PlatformCostResult {
  platformId: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  brandColor: string;
  affiliateUrl: string;

  /** The tier selected by the resolution logic for this platform. */
  selectedTier: PricingTierConfig;

  // Cost breakdown (all values in SAR)
  monthlySubscription: number;
  transactionFees: number;
  perOrderFees: number;
  hiddenCostsTotal: number;
  totalMonthlyCost: number;
  totalAnnualCost: number;
  costPerOrder: number;
  /** What the platform costs as a percentage of monthly revenue. */
  costAsRevenuePercent: number;
  /** How much cheaper this platform is than the most expensive option (SAR/mo). */
  savingsVsMostExpensive: number;

  /** 1 = cheapest. */
  rank: number;
  isRecommended: boolean;

  // Warnings / insights
  showMagentoWarning: boolean;
  magentoWarningTextAr: string | null;
  showTierUpgradeWarning: boolean;
  tierUpgradeWarningTextAr: string | null;
  /** Only set for the Shopify platform, when an upgrade saves money. */
  shopifyInsightAr: string | null;
  /** Only set for the WooCommerce platform. */
  wooCommerceScenario: WooCommerceScenario | null;

  // Display-currency conversions (formatting is left to the UI layer)
  displayCurrency: Currency;
  totalMonthlyCostConverted: number;
  totalAnnualCostConverted: number;

  /** totalAnnualCost if annualToggle is on, otherwise totalMonthlyCost (SAR). */
  primaryCost: number;
  primaryCostConverted: number;
}

export interface CalculatorOutput {
  inputs: MerchantInputs;
  results: PlatformCostResult[];
  cheapestPlatformSlug: string | null;
  mostExpensivePlatformSlug: string | null;
}
