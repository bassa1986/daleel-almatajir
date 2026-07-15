// =============================================================
// دليل المتاجر — Calculator URL state encoding
//
// SECTION 3: /calculator?r=120000&o=250&c=SAR&s=0
//   r = monthlyRevenue, o = monthlyOrders, c = currency, s = includeSetup (0/1)
//
// Two extra (optional) params are supported beyond the spec so the full
// MerchantInputs shape is shareable via URL:
//   a = annualToggle (0/1), w = wooCommerceScenario
// =============================================================

import { DEFAULT_MERCHANT_INPUTS, DEFAULT_WOOCOMMERCE_SCENARIO } from './constants';
import { nonNegative } from './utils';
import type { Currency, MerchantInputs, WooCommerceScenario } from './types';

export const CALCULATOR_PATH = '/calculator';

const CURRENCIES: readonly Currency[] = ['SAR', 'USD', 'AED'];
const WOOCOMMERCE_SCENARIOS: readonly WooCommerceScenario[] = ['minimal', 'typical', 'managed'];

/** Accepts URLSearchParams (client) or a Next.js searchParams record (server). */
type SearchParamsLike = URLSearchParams | Record<string, string | string[] | undefined>;

function getParam(searchParams: SearchParamsLike, key: string): string | undefined {
  if (searchParams instanceof URLSearchParams) {
    return searchParams.get(key) ?? undefined;
  }
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Encodes a full MerchantInputs object into URLSearchParams.
 * Omits params that match the defaults to keep URLs short, except for the
 * core `r`, `o`, `c`, `s` params which are always present per the spec.
 */
export function encodeCalculatorState(inputs: MerchantInputs): URLSearchParams {
  const params = new URLSearchParams();

  params.set('r', String(Math.round(inputs.monthlyRevenue)));
  params.set('o', String(Math.round(inputs.monthlyOrders)));
  params.set('c', inputs.currency);
  params.set('s', inputs.includeSetup ? '1' : '0');

  if (inputs.annualToggle) {
    params.set('a', '1');
  }

  if (inputs.wooCommerceScenario !== DEFAULT_WOOCOMMERCE_SCENARIO) {
    params.set('w', inputs.wooCommerceScenario);
  }

  return params;
}

/** Builds a full calculator URL (e.g. for sharing or the PDF export footer). */
export function buildCalculatorUrl(inputs: MerchantInputs, basePath: string = CALCULATOR_PATH): string {
  const params = encodeCalculatorState(inputs);
  return `${basePath}?${params.toString()}`;
}

/**
 * Decodes calculator state from URL search params. Returns only the keys
 * that were present and valid â callers should merge this with defaults,
 * e.g.: `{ ...DEFAULT_MERCHANT_INPUTS, ...decodeCalculatorState(searchParams) }`
 */
export function decodeCalculatorState(searchParams: SearchParamsLike): Partial<MerchantInputs> {
  const result: Partial<MerchantInputs> = {};

  const r = getParam(searchParams, 'r');
  const o = getParam(searchParams, 'o');
  const c = getParam(searchParams, 'c');
  const s = getParam(searchParams, 's');
  const a = getParam(searchParams, 'a');
  const w = getParam(searchParams, 'w');

  if (r !== undefined) {
    const n = Number(r);
    if (Number.isFinite(n)) result.monthlyRevenue = nonNegative(n);
  }

  if (o !== undefined) {
    const n = Number(o);
    if (Number.isFinite(n)) result.monthlyOrders = Math.round(nonNegative(n));
  }

  if (c !== undefined && (CURRENCIES as string[]).includes(c)) {
    result.currency = c as Currency;
  }

  if (s === '0' || s === '1') {
    result.includeSetup = s === '1';
  }

  if (a === '0' || a === '1') {
    result.annualToggle = a === '1';
  }

  if (w !== undefined && (WOOCOMMERCE_SCENARIOS as string[]).includes(w)) {
    result.wooCommerceScenario = w as WooCommerceScenario;
  }

  return result;
}

/** Convenience: decode and merge with defaults in one call. */
export function parseCalculatorInputs(searchParams: SearchParamsLike): MerchantInputs {
  return { ...DEFAULT_MERCHANT_INPUTS, ...decodeCalculatorState(searchParams) };
}
