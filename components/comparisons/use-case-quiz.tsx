'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { ScorecardResult } from '@/lib/data/scorecard';
import type { PlatformFullRelations } from '@/lib/data/platforms';

interface UseCaseQuizProps {
  scorecard: ScorecardResult;
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
}

type Answer = 'a' | 'b' | null;

const QUESTIONS = [
  {
    id: 'revenue',
    labelAr: 'ÃÂÃÂ§ ÃÂ­ÃÂ¬ÃÂ ÃÂ¥ÃÂÃÂ±ÃÂ§ÃÂ¯ÃÂ§ÃÂª ÃÂÃÂªÃÂ¬ÃÂ±ÃÂ ÃÂ§ÃÂÃÂ´ÃÂÃÂ±ÃÂÃÂ©ÃÂ',
    options: [
      { labelAr: 'ÃÂµÃÂºÃÂÃÂ±ÃÂ© (ÃÂ£ÃÂÃÂ ÃÂÃÂ ÃÂ¥ÃÂ  ÃÂ£ÃÂÃÂ ÃÂ±.ÃÂ³)', weightCategories: ['pricing'] },
      { labelAr: 'ÃÂÃÂªÃÂÃÂ³ÃÂ·ÃÂ© (ÃÂ¥ÃÂ  - ÃÂ¥ÃÂ ÃÂ  ÃÂ£ÃÂÃÂ ÃÂ±.ÃÂ³)', weightCategories: ['pricing', 'ÃÂ³ÃÂÃÂÃÂÃÂ© ÃÂ§ÃÂÃÂ§ÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ§ÃÂ'] },
      { labelAr: 'ÃÂÃÂ¨ÃÂÃÂ±ÃÂ© (ÃÂ£ÃÂÃÂ«ÃÂ± ÃÂÃÂ ÃÂ¥ÃÂ ÃÂ  ÃÂ£ÃÂÃÂ ÃÂ±.ÃÂ³)', weightCategories: ['ÃÂ§ÃÂÃÂªÃÂÃÂ³ÃÂ¹ ÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂ', 'ÃÂ§ÃÂÃÂªÃÂ®ÃÂµÃÂÃÂµ'] },
    ],
  },
  {
    id: 'market',
    labelAr: 'ÃÂÃÂ§ ÃÂÃÂ ÃÂ³ÃÂÃÂÃÂ ÃÂ§ÃÂÃÂÃÂ³ÃÂªÃÂÃÂ¯ÃÂÃÂ',
    options: [
      { labelAr: 'ÃÂ§ÃÂÃÂ³ÃÂ¹ÃÂÃÂ¯ÃÂÃÂ© ÃÂÃÂ§ÃÂÃÂ®ÃÂÃÂÃÂ¬ ÃÂÃÂÃÂ·', weightCategories: ['arabic-support', 'payment-gateways'] },
      { labelAr: 'ÃÂ§ÃÂÃÂ¯ÃÂÃÂ ÃÂ§ÃÂÃÂ¹ÃÂ±ÃÂ¨ÃÂÃÂ© ÃÂ§ÃÂÃÂ£ÃÂ®ÃÂ±ÃÂ', weightCategories: ['arabic-support', 'ÃÂ§ÃÂÃÂªÃÂ³ÃÂÃÂÃÂ'] },
      { labelAr: 'ÃÂ£ÃÂ³ÃÂÃÂ§ÃÂ ÃÂ¹ÃÂ§ÃÂÃÂÃÂÃÂ©', weightCategories: ['ÃÂ§ÃÂÃÂªÃÂÃÂ³ÃÂ¹ ÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂ'] },
    ],
  },
  {
    id: 'tech',
    labelAr: 'ÃÂÃÂ§ ÃÂÃÂ³ÃÂªÃÂÃÂ ÃÂ®ÃÂ¨ÃÂ±ÃÂªÃÂ ÃÂ§ÃÂÃÂªÃÂÃÂÃÂÃÂ©ÃÂ',
    options: [
      { labelAr: 'ÃÂÃÂ¨ÃÂªÃÂ¯ÃÂ¦ Ã¢ÂÂ ÃÂÃÂ§ ÃÂ£ÃÂÃÂÃÂ ÃÂ®ÃÂ¨ÃÂ±ÃÂ© ÃÂªÃÂÃÂÃÂÃÂ©', weightCategories: ['ÃÂ³ÃÂÃÂÃÂÃÂ© ÃÂ§ÃÂÃÂ§ÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ§ÃÂ', 'ÃÂ§ÃÂÃÂ¯ÃÂ¹ÃÂ ÃÂ§ÃÂÃÂÃÂÃÂ'] },
      { labelAr: 'ÃÂÃÂªÃÂÃÂ³ÃÂ· Ã¢ÂÂ ÃÂ£ÃÂ³ÃÂªÃÂ·ÃÂÃÂ¹ ÃÂ§ÃÂÃÂªÃÂ¹ÃÂ§ÃÂÃÂ ÃÂÃÂ¹ ÃÂÃÂÃÂ­ÃÂ§ÃÂª ÃÂ§ÃÂÃÂªÃÂ­ÃÂÃÂ', weightCategories: ['ÃÂ³ÃÂÃÂÃÂÃÂ© ÃÂ§ÃÂÃÂ§ÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ§ÃÂ'] },
      { labelAr: 'ÃÂÃÂ·ÃÂÃÂ± ÃÂ£ÃÂ ÃÂ£ÃÂÃÂÃÂ ÃÂÃÂ±ÃÂÃÂÃÂ§ÃÂ ÃÂªÃÂÃÂÃÂÃÂ§ÃÂ', weightCategories: ['ÃÂ§ÃÂÃÂªÃÂ®ÃÂµÃÂÃÂµ'] },
    ],
  },
] as const;

export function UseCaseQuiz({ scorecard, platformA, platformB }: UseCaseQuizProps) {
  const [answers, setAnswers] = useState<Record<string, number | null>>({
    revenue: null,
    market: null,
    tech: null,
  });

  const allAnswered = Object.values(answers).every((v) => v !== null);

  function computeRecommendation(): 'a' | 'b' | 'tie' {
    let scoreA = 0;
    let scoreB = 0;

    QUESTIONS.forEach((q) => {
      const selectedIndex = answers[q.id];
      if (selectedIndex === null) return;
      const option = q.options[selectedIndex];
      option.weightCategories.forEach((catKey) => {
        const cat = scorecard.categories.find((c) => c.key === catKey);
        if (!cat) return;
        if (cat.winner === 'a') scoreA += 1;
        if (cat.winner === 'b') scoreB += 1;
      });
    });

    if (scoreA === scoreB) return scorecard.overallWinner;
    return scoreA > scoreB ? 'a' : 'b';
  }

  const recommendation = allAnswered ? computeRecommendation() : null;
  const recommendedPlatform =
    recommendation === 'a' ? platformA : recommendation === 'b' ? platformB : null;

  return (
    <section id="quiz" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-2">ÃÂ£ÃÂÃÂ ÃÂÃÂÃÂµÃÂ© ÃÂªÃÂÃÂ§ÃÂ³ÃÂ¨ÃÂÃÂ</h2>
      <p className="text-sm text-slate-500 mb-6">ÃÂ£ÃÂ¬ÃÂ¨ ÃÂ¹ÃÂ ÃÂ£ ÃÂ£ÃÂ³ÃÂ¦ÃÂÃÂ© ÃÂÃÂµÃÂÃÂ±ÃÂ© ÃÂÃÂªÃÂ­ÃÂµÃÂ ÃÂ¹ÃÂÃÂ ÃÂªÃÂÃÂµÃÂÃÂ© ÃÂ´ÃÂ®ÃÂµÃÂÃÂ©</p>

      <div className="glass p-6 md:p-8">
        <div className="space-y-6 mb-6">
          {QUESTIONS.map((q) => (
            <div key={q.id}>
              <div className="text-sm font-semibold text-slate-300 mb-3">{q.labelAr}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                    className={`flex-1 rounded-lg border px-4 py-2.5 text-xs font-medium text-right transition-all ${
                      answers[q.id] === i
                        ? 'border-primary/40 bg-primary/15 text-blue-300'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    {option.labelAr}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {recommendedPlatform && (
          <div className="rounded-xl border border-secondary/30 bg-secondary/8 p-5 text-center">
            <Sparkles size={20} className="text-secondary mx-auto mb-2" />
            <div className="text-sm text-slate-400 mb-1">ÃÂ§ÃÂÃÂªÃÂÃÂµÃÂÃÂ© ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ³ÃÂ¨ÃÂ© ÃÂÃÂ</div>
            <div className="text-2xl font-extrabold text-white mb-4">{recommendedPlatform.nameAr}</div>
            {recommendedPlatform.affiliateUrl && (
              <a
                href={recommendedPlatform.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn text-white text-sm px-6 py-3 inline-flex"
                style={{ backgroundColor: recommendedPlatform.brandColor }}
              >
                ÃÂ§ÃÂ¨ÃÂ¯ÃÂ£ ÃÂÃÂ¹ {recommendedPlatform.nameAr} Ã¢ÂÂ
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
