'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Download, RotateCcw, FileDown } from 'lucide-react';
import { useCalculator } from '@/lib/hooks/useCalculator';
import {
  buildCalculatorUrl,
  parseCalculatorInputs,
  formatCurrency,
  buildPdfReportData,
  exportCalculatorReportPdf,
} from '@/lib/calculator';
import type { Currency, PlatformConfig } from '@/lib/calculator/types';
import { ResultCard } from './result-card';
import { PrintableReport } from './printable-report';

const CURRENCIES: Currency[] = ['SAR', 'USD', 'AED'];

interface CalculatorAppProps {
  platforms: PlatformConfig[];
}

export function CalculatorApp({ platforms }: CalculatorAppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialInputs = parseCalculatorInputs(searchParams);
  const {
    inputs,
    output,
    updateRevenue,
    updateOrders,
    updateCurrency,
    toggleAnnual,
    toggleSetupFees,
    updateWooCommerceScenario,
    reset,
  } = useCalculator(platforms, initialInputs);

  // Sync state to URL (shallow, no scroll, no extra history entries)
  useEffect(() => {
    const url = buildCalculatorUrl(inputs, pathname);
    router.replace(url, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, pathname]);

  const printableRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleExportPdf = useCallback(async () => {
    if (!printableRef.current) return;
    setExporting(true);
    try {
      await exportCalculatorReportPdf(printableRef.current, {
        filename: 'تقرير-تكاليف-دليل-المتاجر.pdf',
      });
    } finally {
      setExporting(false);
    }
  }, []);

  const pdfData = buildPdfReportData(output);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Controls panel */}
      <motion.div
        className="glass p-6 md:p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Revenue */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">الإيرادات الشهرية</label>
              <span className="figure text-primary font-bold text-sm">
                {formatCurrency(inputs.monthlyRevenue, 'SAR')}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={2000000}
              step={5000}
              value={inputs.monthlyRevenue}
              onChange={(e) => updateRevenue(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:cursor-grab"
            />
            <input
              type="number"
              value={inputs.monthlyRevenue}
              onChange={(e) => updateRevenue(Number(e.target.value))}
              className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white figure focus:outline-none focus:border-primary/50"
              dir="ltr"
            />
          </div>

          {/* Orders */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">عدد الطلبات الشهرية</label>
              <span className="figure text-secondary font-bold text-sm">
                {inputs.monthlyOrders.toLocaleString('en-US')} طلب
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={5000}
              step={10}
              value={inputs.monthlyOrders}
              onChange={(e) => updateOrders(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary
                [&::-webkit-slider-thumb]:cursor-grab"
            />
            <input
              type="number"
              value={inputs.monthlyOrders}
              onChange={(e) => updateOrders(Number(e.target.value))}
              className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white figure focus:outline-none focus:border-primary/50"
              dir="ltr"
            />
          </div>
        </div>

        {/* Secondary controls row */}
        <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/8">
          {/* Currency */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                onClick={() => updateCurrency(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  inputs.currency === c ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Annual toggle */}
          <ToggleChip active={inputs.annualToggle} onClick={toggleAnnual} label="عرض التكلفة السنوية" />

          {/* Setup fee toggle */}
          <ToggleChip active={inputs.includeSetup} onClick={toggleSetupFees} label="تضمين رسوم الإعداد" />

          <div className="flex-1" />

          {/* Reset */}
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-2"
          >
            <RotateCcw size={13} />
            إعادة ضبط
          </button>

          {/* PDF export */}
          <button
            onClick={handleExportPdf}
            disabled={exporting}
            className="btn-glass text-xs px-4 py-2.5 disabled:opacity-50"
          >
            <FileDown size={14} />
            {exporting ? 'جارٍ التصدير...' : 'تصدير PDF'}
          </button>
        </div>
      </motion.div>

      {/* Results */}
      <div className="space-y-3">
        {output.results.map((result) => (
          <ResultCard
            key={result.slug}
            result={result}
            wooCommerceScenario={inputs.wooCommerceScenario}
            onWooCommerceScenarioChange={updateWooCommerceScenario}
          />
        ))}
      </div>

      {/* Hidden printable report for PDF export */}
      <div style={{ position: 'fixed', top: 0, left: '-9999px', zIndex: -1 }} aria-hidden>
        <div ref={printableRef}>
          <PrintableReport data={pdfData} />
        </div>
      </div>
    </div>
  );
}

function ToggleChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
        active ? 'border-secondary/40 bg-secondary/15 text-cyan-300' : 'border-white/10 bg-white/5 text-slate-400 hover:text-slate-200'
      }`}
    >
      <span
        className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all ${
          active ? 'bg-secondary border-secondary' : 'border-white/30 bg-transparent'
        }`}
      />
      {label}
    </button>
  );
}
