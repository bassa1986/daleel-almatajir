'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Lightbulb, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/calculator/currency';
import { WooCommerceScenarioSelector } from './woocommerce-scenario-selector';
import type { PlatformCostResult, WooCommerceScenario } from '@/lib/calculator/types';

const PLATFORM_COLORS: Record<string, string> = {
  salla: '#4CAF50',
  zid: '#2196F3',
  shopify: '#96BF48',
  woocommerce: '#7F54B3',
  bigcommerce: '#34313F',
  magento: '#F26322',
};

interface ResultCardProps {
  result: PlatformCostResult;
  wooCommerceScenario: WooCommerceScenario;
  onWooCommerceScenarioChange: (scenario: WooCommerceScenario) => void;
}

export function ResultCard({ result, wooCommerceScenario, onWooCommerceScenarioChange }: ResultCardProps) {
  const [expanded, setExpanded] = useState(result.isRecommended);
  const color = PLATFORM_COLORS[result.slug] ?? result.brandColor;
  const currency = result.displayCurrency;

  return (
    <motion.div
      layout
      className={`glass overflow-hidden border ${
        result.isRecommended ? 'border-primary/30' : 'border-white/10'
      }`}
    >
      {/* Header row */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-right"
      >
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
            result.isRecommended ? 'bg-primary text-white' : 'bg-white/10 text-slate-400'
          }`}
        >
          {result.rank}
        </span>

        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-white">{result.nameAr}</span>
            {result.isRecommended && <span className="badge badge-success text-xs">Ø§ÙØ£ÙÙØ±</span>}
            <span className="text-xs text-slate-500">Ø¨Ø§ÙØ© {result.selectedTier.nameAr}</span>
          </div>
        </div>

        <div className="text-left flex-shrink-0">
          <div className="figure font-extrabold text-white text-lg">
            {formatCurrency(result.primaryCostConverted, currency)}
          </div>
          <div className="text-xs text-slate-500">
            {result.savingsVsMostExpensive > 0 && (
              <span className="text-emerald-400">
                ÙÙÙØ± {formatCurrency(result.savingsVsMostExpensive, currency)}/Ø´ÙØ±
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 pt-1 border-t border-white/6">
          {/* WooCommerce scenario selector inline */}
          {result.wooCommerceScenario !== null && (
            <WooCommerceScenarioSelector value={wooCommerceScenario} onChange={onWooCommerceScenarioChange} />
          )}

          {/* Cost breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
            <BreakdownItem label="Ø§ÙØ§Ø´ØªØ±Ø§Ù Ø§ÙØ´ÙØ±Ù" value={formatCurrency(result.monthlySubscription, currency)} />
            <BreakdownItem label="Ø±Ø³ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª" value={formatCurrency(result.transactionFees, currency)} />
            <BreakdownItem label="Ø±Ø³ÙÙ Ø§ÙØ·ÙØ¨Ø§Øª" value={formatCurrency(result.perOrderFees, currency)} />
            <BreakdownItem label="ØªÙØ§ÙÙÙ Ø®ÙÙØ©" value={formatCurrency(result.hiddenCostsTotal, currency)} />
            <BreakdownItem label="Ø§ÙØªÙÙÙØ© ÙÙÙ Ø·ÙØ¨" value={formatCurrency(result.costPerOrder, currency)} />
            <BreakdownItem label="ÙÙ Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª" value={formatPercent(result.costAsRevenuePercent)} />
          </div>

          <div className="flex items-center justify-between text-sm mb-3 pt-3 border-t border-white/6">
            <span className="text-slate-400">Ø§ÙØªÙÙÙØ© Ø§ÙØ´ÙØ±ÙØ© Ø§ÙØ¥Ø¬ÙØ§ÙÙØ©</span>
            <span className="figure font-bold text-white">{formatCurrency(result.totalMonthlyCostConverted, currency)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-slate-400">Ø§ÙØªÙÙÙØ© Ø§ÙØ³ÙÙÙØ© Ø§ÙØ¥Ø¬ÙØ§ÙÙØ©</span>
            <span className="figure font-bold text-white">{formatCurrency(result.totalAnnualCostConverted, currency)}</span>
          </div>

          {/* Warnings & insights */}
          {result.magentoWarningTextAr && (
            <AlertBox icon={AlertTriangle} tone="danger" text={result.magentoWarningTextAr} />
          )}
          {result.tierUpgradeWarningTextAr && (
            <AlertBox icon={TrendingDown} tone="warning" text={result.tierUpgradeWarningTextAr} />
          )}
          {result.shopifyInsightAr && (
            <AlertBox icon={Lightbulb} tone="primary" text={result.shopifyInsightAr} />
          )}
        </div>
      )}
    </motion.div>
  );
}

function BreakdownItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/3 border border-white/6 p-3">
      <div className="text-[11px] text-slate-500 mb-1">{label}</div>
      <div className="figure text-sm font-bold text-white">{value}</div>
    </div>
  );
}

function AlertBox({
  icon: Icon,
  tone,
  text,
}: {
  icon: typeof AlertTriangle;
  tone: 'danger' | 'warning' | 'primary';
  text: string;
}) {
  const toneClasses = {
    danger: 'border-danger/30 bg-danger/10 text-red-300',
    warning: 'border-warning/30 bg-warning/10 text-amber-300',
    primary: 'border-primary/30 bg-primary/10 text-blue-300',
  }[tone];

  return (
    <div className={`flex items-start gap-2 rounded-lg border p-3 text-xs mb-2 ${toneClasses}`}>
      <Icon size={14} className="flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </div>
  );
}
