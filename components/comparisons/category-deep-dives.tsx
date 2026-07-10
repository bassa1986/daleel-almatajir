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
 * With 15 platform pairs Ã 8 categories (120 combinations), hand-authoring
 * unique editorial essays for every combination isn't feasible â instead
 * each category has a template that plugs in the actual winner's name, so
 * the text stays accurate as scores/winners change.
 */
function getCategoryProse(categoryKey: string, winnerName: string | null): string {
  if (!winnerName) {
    return 'Ø§ÙÙÙØµØªØ§Ù ÙØªÙØ§Ø±Ø¨ØªØ§Ù Ø¬Ø¯Ø§Ù ÙÙ ÙØ°Ù Ø§ÙÙØ¦Ø© ÙÙØ§ ÙÙØ¬Ø¯ ÙØ§Ø±Ù Ø¬ÙÙØ±Ù Ø¨ÙÙÙÙØ§.';
  }

  const templates: Record<string, string> = {
    pricing: `${winnerName} ÙÙ Ø§ÙØ®ÙØ§Ø± Ø§ÙØ£ÙÙØ± ÙÙ Ø§ÙÙØ«Ø§Ù Ø§ÙØ­Ø³Ø§Ø¨Ù Ø§ÙÙØ³ØªØ®Ø¯Ù ÙÙ ÙØ°Ù Ø§ÙÙÙØ§Ø±ÙØ© Ø¹ÙØ¯ ÙØ°Ø§ Ø§ÙÙØ³ØªÙÙ ÙÙ Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª.`,
    'arabic-support': `${winnerName} ÙÙØ¯ÙÙ Ø¯Ø¹ÙØ§Ù Ø£Ø¹ÙÙ ÙÙØºØ© Ø§ÙØ¹Ø±Ø¨ÙØ© ÙØªØ¬Ø±Ø¨Ø© ÙØ§Ø¬ÙØ© ÙØµÙÙØ© Ø®ØµÙØµØ§Ù ÙÙØ³ÙÙ Ø§ÙØ®ÙÙØ¬Ù.`,
    'payment-gateways': `${winnerName} ÙØ¯Ø¹Ù Ø¹Ø¯Ø¯Ø§Ù Ø£ÙØ¨Ø± ÙÙ Ø¨ÙØ§Ø¨Ø§Øª Ø§ÙØ¯ÙØ¹ Ø§ÙÙØ­ÙÙØ© Ø§ÙØ´Ø§Ø¦Ø¹Ø© ÙÙ Ø§ÙØ³Ø¹ÙØ¯ÙØ© ÙØ§ÙØ®ÙÙØ¬Ø ÙØ«Ù ÙØ¯Ù ÙSTC Pay.`,
    'Ø§ÙØªÙØ³Ø¹ Ø§ÙØ¯ÙÙÙ': `${winnerName} Ø£ÙØ«Ø± ÙÙØ§Ø¡ÙØ© ÙÙØªÙØ³Ø¹ ÙÙ Ø£Ø³ÙØ§Ù Ø®Ø§Ø±Ø¬ Ø§ÙÙÙØ·ÙØ© Ø§ÙØ¹Ø±Ø¨ÙØ© Ø¨ÙØ¶Ù ÙØ±ÙÙØªÙ ÙØªÙØ§ÙÙÙ ÙØ¹ Ø´Ø¨ÙØ§Øª Ø§ÙØ´Ø­Ù ÙØ§ÙØ¯ÙØ¹ Ø§ÙØ¯ÙÙÙØ©.`,
    Ø§ÙØªØ®ØµÙØµ: `${winnerName} ÙÙÙØ­ Ø§ÙØªØ§Ø¬Ø± Ø­Ø±ÙØ© Ø£ÙØ¨Ø± ÙÙ ØªØ®ØµÙØµ Ø§ÙØªØµÙÙÙ ÙØ§ÙÙØ¸Ø§Ø¦Ù Ø­Ø³Ø¨ Ø­Ø§Ø¬Ø© Ø§ÙÙØªØ¬Ø±.`,
    'Ø³ÙÙÙØ© Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù': `${winnerName} Ø£Ø³ÙÙ ÙÙ Ø§ÙØ¥Ø¹Ø¯Ø§Ø¯ ÙØ§ÙØ§Ø³ØªØ®Ø¯Ø§Ù Ø§ÙÙÙÙÙØ Ø®ØµÙØµØ§Ù ÙÙÙ ÙØ§ ÙÙÙÙ Ø®Ø¨Ø±Ø© ØªÙÙÙØ© ÙØªØ¹ÙÙØ©.`,
    Ø§ÙØªØ³ÙÙÙ: `${winnerName} ÙÙØ¯ÙÙ Ø£Ø¯ÙØ§Øª ØªØ³ÙÙÙ ÙØªØ­ÙÙÙ Ø£ÙØ«Ø± ØªØ·ÙØ±Ø§Ù ÙÙØ¯ÙØ¬Ø© Ø¨Ø´ÙÙ ÙØ¨Ø§Ø´Ø± ÙÙ Ø§ÙÙÙØµØ©.`,
    'Ø§ÙØ¯Ø¹Ù Ø§ÙÙÙÙ': `${winnerName} ÙÙÙÙØ± Ø¯Ø¹ÙØ§Ù ÙÙÙØ§Ù Ø£Ø³Ø±Ø¹ ÙØ£ÙØ«Ø± Ø§Ø¹ØªÙØ§Ø¯ÙØ© ÙÙÙØ§Ù ÙØªØ¬Ø§Ø±Ø¨ Ø§ÙØªØ¬Ø§Ø±.`,
  };

  return templates[categoryKey] ?? `${winnerName} ÙØªÙØ¯ÙÙ ÙÙ ÙØ°Ù Ø§ÙÙØ¦Ø©.`;
}

export function CategoryDeepDives({ scorecard, platformA, platformB }: CategoryDeepDivesProps) {
  const [openKey, setOpenKey] = useState<string | null>(scorecard.categories[0]?.key ?? null);

  return (
    <section id="deep-dives" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">ØªÙØµÙÙ ÙÙ ÙØ¦Ø©</h2>

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
