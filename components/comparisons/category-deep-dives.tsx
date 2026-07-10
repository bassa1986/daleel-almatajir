'use client';

import { useState } from 'react';
import { ChevronDown, Trophy } from 'lucide-react';
import type { ScorecardResult } from '@/lib/data/scorecard';
import type { PlatformFullRelations } from '@/lib/data/platforms';

interface CategoryDeepDivesProps {
  scorecard: ScorecardResult;
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
}

/**
 * Generates a short data-driven explanation for a scorecard category.
 * With 15 platform pairs ÃÂ 8 categories (120 combinations), hand-authoring
 * unique editorial essays for every combination isn't feasible Ã¢ÂÂ instead
 * each category has a template that plugs in the actual winner's name, so
 * the text stays accurate as scores/winners change.
 */
function getCategoryProse(categoryKey: string, winnerName: string | null): string {
  if (!winnerName) {
    return 'ÃÂ§ÃÂÃÂÃÂÃÂµÃÂªÃÂ§ÃÂ ÃÂÃÂªÃÂÃÂ§ÃÂ±ÃÂ¨ÃÂªÃÂ§ÃÂ ÃÂ¬ÃÂ¯ÃÂ§ÃÂ ÃÂÃÂ ÃÂÃÂ°ÃÂ ÃÂ§ÃÂÃÂÃÂ¦ÃÂ© ÃÂÃÂÃÂ§ ÃÂÃÂÃÂ¬ÃÂ¯ ÃÂÃÂ§ÃÂ±ÃÂ ÃÂ¬ÃÂÃÂÃÂ±ÃÂ ÃÂ¨ÃÂÃÂÃÂÃÂÃÂ§.';
  }

  const templates: Record<string, string> = {
    pricing: `${winnerName} ÃÂÃÂ ÃÂ§ÃÂÃÂ®ÃÂÃÂ§ÃÂ± ÃÂ§ÃÂÃÂ£ÃÂÃÂÃÂ± ÃÂÃÂ ÃÂ§ÃÂÃÂÃÂ«ÃÂ§ÃÂ ÃÂ§ÃÂÃÂ­ÃÂ³ÃÂ§ÃÂ¨ÃÂ ÃÂ§ÃÂÃÂÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ ÃÂÃÂ ÃÂÃÂ°ÃÂ ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ±ÃÂÃÂ© ÃÂ¹ÃÂÃÂ¯ ÃÂÃÂ°ÃÂ§ ÃÂ§ÃÂÃÂÃÂ³ÃÂªÃÂÃÂ ÃÂÃÂ ÃÂ§ÃÂÃÂ¥ÃÂÃÂ±ÃÂ§ÃÂ¯ÃÂ§ÃÂª.`,
    'arabic-support': `${winnerName} ÃÂÃÂÃÂ¯ÃÂÃÂ ÃÂ¯ÃÂ¹ÃÂÃÂ§ÃÂ ÃÂ£ÃÂ¹ÃÂÃÂ ÃÂÃÂÃÂºÃÂ© ÃÂ§ÃÂÃÂ¹ÃÂ±ÃÂ¨ÃÂÃÂ© ÃÂÃÂªÃÂ¬ÃÂ±ÃÂ¨ÃÂ© ÃÂÃÂ§ÃÂ¬ÃÂÃÂ© ÃÂÃÂµÃÂÃÂÃÂ© ÃÂ®ÃÂµÃÂÃÂµÃÂ§ÃÂ ÃÂÃÂÃÂ³ÃÂÃÂ ÃÂ§ÃÂÃÂ®ÃÂÃÂÃÂ¬ÃÂ.`,
    'payment-gateways': `${winnerName} ÃÂÃÂ¯ÃÂ¹ÃÂ ÃÂ¹ÃÂ¯ÃÂ¯ÃÂ§ÃÂ ÃÂ£ÃÂÃÂ¨ÃÂ± ÃÂÃÂ ÃÂ¨ÃÂÃÂ§ÃÂ¨ÃÂ§ÃÂª ÃÂ§ÃÂÃÂ¯ÃÂÃÂ¹ ÃÂ§ÃÂÃÂÃÂ­ÃÂÃÂÃÂ© ÃÂ§ÃÂÃÂ´ÃÂ§ÃÂ¦ÃÂ¹ÃÂ© ÃÂÃÂ ÃÂ§ÃÂÃÂ³ÃÂ¹ÃÂÃÂ¯ÃÂÃÂ© ÃÂÃÂ§ÃÂÃÂ®ÃÂÃÂÃÂ¬ÃÂ ÃÂÃÂ«ÃÂ ÃÂÃÂ¯ÃÂ ÃÂSTC Pay.`,
    'ÃÂ§ÃÂÃÂªÃÂÃÂ³ÃÂ¹ ÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂ': `${winnerName} ÃÂ£ÃÂÃÂ«ÃÂ± ÃÂÃÂÃÂ§ÃÂ¡ÃÂÃÂ© ÃÂÃÂÃÂªÃÂÃÂ³ÃÂ¹ ÃÂÃÂ ÃÂ£ÃÂ³ÃÂÃÂ§ÃÂ ÃÂ®ÃÂ§ÃÂ±ÃÂ¬ ÃÂ§ÃÂÃÂÃÂÃÂ·ÃÂÃÂ© ÃÂ§ÃÂÃÂ¹ÃÂ±ÃÂ¨ÃÂÃÂ© ÃÂ¨ÃÂÃÂ¶ÃÂ ÃÂÃÂ±ÃÂÃÂÃÂªÃÂ ÃÂÃÂªÃÂÃÂ§ÃÂÃÂÃÂ ÃÂÃÂ¹ ÃÂ´ÃÂ¨ÃÂÃÂ§ÃÂª ÃÂ§ÃÂÃÂ´ÃÂ­ÃÂ ÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂ¹ ÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ©.`,
    ÃÂ§ÃÂÃÂªÃÂ®ÃÂµÃÂÃÂµ: `${winnerName} ÃÂÃÂÃÂÃÂ­ ÃÂ§ÃÂÃÂªÃÂ§ÃÂ¬ÃÂ± ÃÂ­ÃÂ±ÃÂÃÂ© ÃÂ£ÃÂÃÂ¨ÃÂ± ÃÂÃÂ ÃÂªÃÂ®ÃÂµÃÂÃÂµ ÃÂ§ÃÂÃÂªÃÂµÃÂÃÂÃÂ ÃÂÃÂ§ÃÂÃÂÃÂ¸ÃÂ§ÃÂ¦ÃÂ ÃÂ­ÃÂ³ÃÂ¨ ÃÂ­ÃÂ§ÃÂ¬ÃÂ© ÃÂ§ÃÂÃÂÃÂªÃÂ¬ÃÂ±.`,
    'ÃÂ³ÃÂÃÂÃÂÃÂ© ÃÂ§ÃÂÃÂ§ÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ§ÃÂ': `${winnerName} ÃÂ£ÃÂ³ÃÂÃÂ ÃÂÃÂ ÃÂ§ÃÂÃÂ¥ÃÂ¹ÃÂ¯ÃÂ§ÃÂ¯ ÃÂÃÂ§ÃÂÃÂ§ÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ§ÃÂ ÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂ®ÃÂµÃÂÃÂµÃÂ§ÃÂ ÃÂÃÂÃÂ ÃÂÃÂ§ ÃÂÃÂÃÂÃÂ ÃÂ®ÃÂ¨ÃÂ±ÃÂ© ÃÂªÃÂÃÂÃÂÃÂ© ÃÂÃÂªÃÂ¹ÃÂÃÂÃÂ©.`,
    ÃÂ§ÃÂÃÂªÃÂ³ÃÂÃÂÃÂ: `${winnerName} ÃÂÃÂÃÂ¯ÃÂÃÂ ÃÂ£ÃÂ¯ÃÂÃÂ§ÃÂª ÃÂªÃÂ³ÃÂÃÂÃÂ ÃÂÃÂªÃÂ­ÃÂÃÂÃÂ ÃÂ£ÃÂÃÂ«ÃÂ± ÃÂªÃÂ·ÃÂÃÂ±ÃÂ§ÃÂ ÃÂÃÂÃÂ¯ÃÂÃÂ¬ÃÂ© ÃÂ¨ÃÂ´ÃÂÃÂ ÃÂÃÂ¨ÃÂ§ÃÂ´ÃÂ± ÃÂÃÂ ÃÂ§ÃÂÃÂÃÂÃÂµÃÂ©.`,
    'ÃÂ§ÃÂÃÂ¯ÃÂ¹ÃÂ ÃÂ§ÃÂÃÂÃÂÃÂ': `${winnerName} ÃÂÃÂÃÂÃÂÃÂ± ÃÂ¯ÃÂ¹ÃÂÃÂ§ÃÂ ÃÂÃÂÃÂÃÂ§ÃÂ ÃÂ£ÃÂ³ÃÂ±ÃÂ¹ ÃÂÃÂ£ÃÂÃÂ«ÃÂ± ÃÂ§ÃÂ¹ÃÂªÃÂÃÂ§ÃÂ¯ÃÂÃÂ© ÃÂÃÂÃÂÃÂ§ÃÂ ÃÂÃÂªÃÂ¬ÃÂ§ÃÂ±ÃÂ¨ ÃÂ§ÃÂÃÂªÃÂ¬ÃÂ§ÃÂ±.`,
  };

  return templates[categoryKey] ?? `${winnerName} ÃÂÃÂªÃÂÃÂ¯ÃÂÃÂ ÃÂÃÂ ÃÂÃÂ°ÃÂ ÃÂ§ÃÂÃÂÃÂ¦ÃÂ©.`;
}

export function CategoryDeepDives({ scorecard, platformA, platformB }: CategoryDeepDivesProps) {
  const [openKey, setOpenKey] = useState<string | null>(scorecard.categories[0]?.key ?? null);

  return (
    <section id="deep-dives" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">ÃÂªÃÂÃÂµÃÂÃÂ ÃÂÃÂ ÃÂÃÂ¦ÃÂ©</h2>

      <div className="glass overflow-hidden">
        {scorecard.categories.map((cat) => {
          const isOpen = openKey === cat.key;
          const winnerName = cat.winner === 'a' ? platformA.nameAr : cat.winner === 'b' ? platformB.nameAr : null;

          return (
            <div key={cat.key} className="border-b border-white/6 last:border-0">
              <button
                onClick={() => setOpenKey(isOpen ? null : cat.key)}
                className="w-full flex items-center justify-between px-5 py-4 text-right"
              >
                <span className="flex items-center gap-2.5">
                  <span className="font-bold text-white text-sm">{cat.labelAr}</span>
                  {winnerName && (
                    <span className="badge badge-success text-xs flex items-center gap-1">
                      <Trophy size={11} /> {winnerName}
                    </span>
                  )}
                </span>
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed">
                  {getCategoryProse(cat.key, winnerName)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
