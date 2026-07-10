'use client';

import { WOOCOMMERCE_SCENARIO_LABELS_AR } from '@/lib/calculator/constants';
import type { WooCommerceScenario } from '@/lib/calculator/types';
import { cn } from '@/lib/cn';

const SCENARIOS: WooCommerceScenario[] = ['minimal', 'typical', 'managed'];

interface WooCommerceScenarioSelectorProps {
  value: WooCommerceScenario;
  onChange: (scenario: WooCommerceScenario) => void;
}

export function WooCommerceScenarioSelector({ value, onChange }: WooCommerceScenarioSelectorProps) {
  return (
    <div className="mb-3">
      <div className="text-xs text-slate-500 mb-2">Ø³ÙÙØ§Ø±ÙÙ Ø§ÙØªÙØ§ÙÙÙ Ø§ÙØ®ÙÙØ©:</div>
      <div className="flex gap-2 flex-wrap">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario}
            type="button"
            onClick={() => onChange(scenario)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-semibold border transition-all',
              value === scenario
                ? 'border-primary/40 bg-primary/15 text-blue-300'
                : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
            )}
          >
            {WOOCOMMERCE_SCENARIO_LABELS_AR[scenario]}
          </button>
        ))}
      </div>
    </div>
  );
}
