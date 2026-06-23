'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';
import { calculatePlatformCosts } from '../calculator/engine';
import { DEFAULT_MERCHANT_INPUTS } from '../calculator/constants';
import { nonNegative } from '../calculator/utils';
import type {
  CalculatorOutput,
  Currency,
  MerchantInputs,
  PlatformConfig,
  WooCommerceScenario,
} from '../calculator/types';

export interface UseCalculatorResult {
  /** Live (un-debounced) inputs — bind directly to sliders/inputs for instant UI feedback. */
  inputs: MerchantInputs;
  /** Inputs debounced by 300ms — what `output` is actually computed from. */
  debouncedInputs: MerchantInputs;
  /** Calculated, ranked results for every platform. */
  output: CalculatorOutput;
  /** True while `debouncedInputs` hasn't caught up with `inputs` yet. */
  isPending: boolean;

  updateRevenue: (monthlyRevenue: number) => void;
  updateOrders: (monthlyOrders: number) => void;
  updateCurrency: (currency: Currency) => void;
  toggleAnnual: () => void;
  toggleSetupFees: () => void;
  updateWooCommerceScenario: (scenario: WooCommerceScenario) => void;
  /** Replace the entire inputs object at once (e.g. when restoring from a URL). */
  setInputs: React.Dispatch<React.SetStateAction<MerchantInputs>>;
  /** Reset all inputs back to defaults. */
  reset: () => void;
}

/**
 * Drives the cost calculator: holds merchant inputs, debounces them, and
 * derives ranked per-platform results via `calculatePlatformCosts`.
 *
 * @param platforms - platform configs (e.g. from Prisma, with relations loaded)
 * @param initialInputs - optional overrides merged over DEFAULT_MERCHANT_INPUTS,
 *   typically decoded from the URL via `parseCalculatorInputs`.
 */
export function useCalculator(
  platforms: PlatformConfig[],
  initialInputs?: Partial<MerchantInputs>
): UseCalculatorResult {
  const [inputs, setInputs] = useState<MerchantInputs>({
    ...DEFAULT_MERCHANT_INPUTS,
    ...initialInputs,
  });

  const debouncedInputs = useDebounce(inputs, 300);

  const output = useMemo(
    () => calculatePlatformCosts(debouncedInputs, platforms),
    [debouncedInputs, platforms]
  );

  const isPending = inputs !== debouncedInputs;

  const updateRevenue = useCallback((monthlyRevenue: number) => {
    setInputs((prev) => ({ ...prev, monthlyRevenue: nonNegative(monthlyRevenue) }));
  }, []);

  const updateOrders = useCallback((monthlyOrders: number) => {
    setInputs((prev) => ({ ...prev, monthlyOrders: Math.round(nonNegative(monthlyOrders)) }));
  }, []);

  const updateCurrency = useCallback((currency: Currency) => {
    setInputs((prev) => ({ ...prev, currency }));
  }, []);

  const toggleAnnual = useCallback(() => {
    setInputs((prev) => ({ ...prev, annualToggle: !prev.annualToggle }));
  }, []);

  const toggleSetupFees = useCallback(() => {
    setInputs((prev) => ({ ...prev, includeSetup: !prev.includeSetup }));
  }, []);

  const updateWooCommerceScenario = useCallback((scenario: WooCommerceScenario) => {
    setInputs((prev) => ({ ...prev, wooCommerceScenario: scenario }));
  }, []);

  const reset = useCallback(() => {
    setInputs({ ...DEFAULT_MERCHANT_INPUTS, ...initialInputs });
  }, [initialInputs]);

  return {
    inputs,
    debouncedInputs,
    output,
    isPending,
    updateRevenue,
    updateOrders,
    updateCurrency,
    toggleAnnual,
    toggleSetupFees,
    updateWooCommerceScenario,
    setInputs,
    reset,
  };
}
