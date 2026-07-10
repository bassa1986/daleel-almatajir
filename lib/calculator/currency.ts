// =============================================================
// Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± â Currency conversion & formatting
// =============================================================

import { CURRENCY_SYMBOLS_AR, EXCHANGE_RATES } from './constants';
import type { Currency } from './types';

/** Converts an amount in SAR into the given display currency. */
export function convertFromSAR(amountSAR: number, currency: Currency): number {
  return amountSAR / EXCHANGE_RATES[currency];
}

/** Converts an amount in the given currency back into SAR. */
export function convertToSAR(amount: number, currency: Currency): number {
  return amount * EXCHANGE_RATES[currency];
}

/**
 * Formats a numeric amount with an Arabic currency label, e.g. "1,234 Ø±.Ø³".
 * Uses Western (Latin) digits regardless of locale, which is the
 * convention used across Saudi e-commerce platforms.
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  return `${formatted} ${CURRENCY_SYMBOLS_AR[currency]}`;
}

/** Formats a plain number with Western digits and thousands separators. */
export function formatNumber(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** Formats a percentage value (e.g. 12.3 -> "12.3%"). */
export function formatPercent(value: number, fractionDigits = 1): string {
  return `${formatNumber(value, fractionDigits)}%`;
}
