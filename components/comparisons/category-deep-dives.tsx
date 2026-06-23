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
 * With 15 platform pairs × 8 categories (120 combinations), hand-authoring
 * unique editorial essays for every combination isn't feasible — instead
 * each category has a template that plugs in the actual winner's name, so
 * the text stays accurate as scores/winners change.
 */
function getCategoryProse(categoryKey: string, winnerName: string | null): string {
  if (!winnerName) {
    return 'المنصتان متقاربتان جداً في هذه الفئة ولا يوجد فارق جوهري بينهما.';
  }

  const templates: Record<string, string> = {
    pricing: `${winnerName} هو الخيار الأوفر في المثال الحسابي المستخدم في هذه المقارنة عند هذا المستوى من الإيرادات.`,
    'arabic-support': `${winnerName} يقدّم دعماً أعمق للغة العربية وتجربة واجهة مصممة خصيصاً للسوق الخليجي.`,
    'payment-gateways': `${winnerName} يدعم عدداً أكبر من بوابات الدفع المحلية الشائعة في السعودية والخليج، مثل مدى وSTC Pay.`,
    'التوسع الدولي': `${winnerName} أكثر ملاءمة للتوسع في أسواق خارج المنطقة العربية بفضل مرونته وتكامله مع شبكات الشحن والدفع الدولية.`,
    التخصيص: `${winnerName} يمنح التاجر حرية أكبر في تخصيص التصميم والوظائف حسب حاجة المتجر.`,
    'سهولة الاستخدام': `${winnerName} أسهل في الإعداد والاستخدام اليومي، خصوصاً لمن لا يملك خبرة تقنية متعمقة.`,
    التسويق: `${winnerName} يقدّم أدوات تسويق وتحليل أكثر تطوراً ومدمجة بشكل مباشر في المنصة.`,
    'الدعم الفني': `${winnerName} يوفّر دعماً فنياً أسرع وأكثر اعتمادية وفقاً لتجارب التجار.`,
  };

  return templates[categoryKey] ?? `${winnerName} يتقدّم في هذه الفئة.`;
}

export function CategoryDeepDives({ scorecard, platformA, platformB }: CategoryDeepDivesProps) {
  const [openKey, setOpenKey] = useState<string | null>(scorecard.categories[0]?.key ?? null);

  return (
    <section id="deep-dives" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">تفصيل كل فئة</h2>

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
