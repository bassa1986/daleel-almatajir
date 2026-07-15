// =============================================================
// دليل المتاجر — Calculator constants
// =============================================================

import type { Currency, WooCommerceScenario } from './types';

/**
 * Fixed exchange rates expressed as "SAR per 1 unit of currency".
 * e.g. USD: 3.75 means 1 USD = 3.75 SAR.
 */
export const EXCHANGE_RATES: Record<Currency, number> = {
  SAR: 1,
  USD: 3.75,
  AED: 1.02,
};

export const CURRENCY_SYMBOLS_AR: Record<Currency, string> = {
  SAR: 'ر.س',
  USD: '$',
  AED: 'د.إ',
};

export const DEFAULT_WOOCOMMERCE_SCENARIO: WooCommerceScenario = 'typical';

export const WOOCOMMERCE_SCENARIO_LABELS_AR: Record<WooCommerceScenario, string> = {
  minimal: 'الحد الأدنى',
  typical: 'النموذجي',
  managed: 'المُدار',
};

export const SHOPIFY_SLUG = 'shopify';
export const WOOCOMMERCE_SLUG = 'woocommerce';

/** A tier is flagged for upgrade once revenue exceeds this fraction of its max. */
export const TIER_UPGRADE_THRESHOLD_RATIO = 0.8;

export const TIER_UPGRADE_WARNING_AR = 'ستحتاج إلى الترقية قريباً';

export const DEFAULT_MERCHANT_INPUTS = {
  monthlyRevenue: 50000,
  monthlyOrders: 150,
  currency: 'SAR' as Currency,
  annualToggle: false,
  includeSetup: false,
  wooCommerceScenario: DEFAULT_WOOCOMMERCE_SCENARIO,
};
