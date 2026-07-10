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
    labelAr: 'ÙØ§ Ø­Ø¬Ù Ø¥ÙØ±Ø§Ø¯Ø§Øª ÙØªØ¬Ø±Ù Ø§ÙØ´ÙØ±ÙØ©Ø',
    options: [
      { labelAr: 'ØµØºÙØ±Ø© (Ø£ÙÙ ÙÙ Ù¥Ù  Ø£ÙÙ Ø±.Ø³)', weightCategories: ['pricing'] },
      { labelAr: 'ÙØªÙØ³Ø·Ø© (Ù¥Ù  - Ù¥Ù Ù  Ø£ÙÙ Ø±.Ø³)', weightCategories: ['pricing', 'Ø³ÙÙÙØ© Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù'] },
      { labelAr: 'ÙØ¨ÙØ±Ø© (Ø£ÙØ«Ø± ÙÙ Ù¥Ù Ù  Ø£ÙÙ Ø±.Ø³)', weightCategories: ['Ø§ÙØªÙØ³Ø¹ Ø§ÙØ¯ÙÙÙ', 'Ø§ÙØªØ®ØµÙØµ'] },
    ],
  },
  {
    id: 'market',
    labelAr: 'ÙØ§ ÙÙ Ø³ÙÙÙ Ø§ÙÙØ³ØªÙØ¯ÙØ',
    options: [
      { labelAr: 'Ø§ÙØ³Ø¹ÙØ¯ÙØ© ÙØ§ÙØ®ÙÙØ¬ ÙÙØ·', weightCategories: ['arabic-support', 'payment-gateways'] },
      { labelAr: 'Ø§ÙØ¯ÙÙ Ø§ÙØ¹Ø±Ø¨ÙØ© Ø§ÙØ£Ø®Ø±Ù', weightCategories: ['arabic-support', 'Ø§ÙØªØ³ÙÙÙ'] },
      { labelAr: 'Ø£Ø³ÙØ§Ù Ø¹Ø§ÙÙÙØ©', weightCategories: ['Ø§ÙØªÙØ³Ø¹ Ø§ÙØ¯ÙÙÙ'] },
    ],
  },
  {
    id: 'tech',
    labelAr: 'ÙØ§ ÙØ³ØªÙÙ Ø®Ø¨Ø±ØªÙ Ø§ÙØªÙÙÙØ©Ø',
    options: [
      { labelAr: 'ÙØ¨ØªØ¯Ø¦ â ÙØ§ Ø£ÙÙÙ Ø®Ø¨Ø±Ø© ØªÙÙÙØ©', weightCategories: ['Ø³ÙÙÙØ© Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù', 'Ø§ÙØ¯Ø¹Ù Ø§ÙÙÙÙ'] },
      { labelAr: 'ÙØªÙØ³Ø· â Ø£Ø³ØªØ·ÙØ¹ Ø§ÙØªØ¹Ø§ÙÙ ÙØ¹ ÙÙØ­Ø§Øª Ø§ÙØªØ­ÙÙ', weightCategories: ['Ø³ÙÙÙØ© Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù'] },
      { labelAr: 'ÙØ·ÙØ± Ø£Ù Ø£ÙÙÙ ÙØ±ÙÙØ§Ù ØªÙÙÙØ§Ù', weightCategories: ['Ø§ÙØªØ®ØµÙØµ'] },
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
      <h2 className="text-2xl font-extrabold text-white mb-2">Ø£ÙÙ ÙÙØµØ© ØªÙØ§Ø³Ø¨ÙØ</h2>
      <p className="text-sm text-slate-500 mb-6">Ø£Ø¬Ø¨ Ø¹Ù Ù£ Ø£Ø³Ø¦ÙØ© ÙØµÙØ±Ø© ÙØªØ­ØµÙ Ø¹ÙÙ ØªÙØµÙØ© Ø´Ø®ØµÙØ©</p>

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
            <div className="text-sm text-slate-400 mb-1">Ø§ÙØªÙØµÙØ© Ø§ÙÙÙØ§Ø³Ø¨Ø© ÙÙ</div>
            <div className="text-2xl font-extrabold text-white mb-4">{recommendedPlatform.nameAr}</div>
            {recommendedPlatform.affiliateUrl && (
              <a
                href={recommendedPlatform.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn text-white text-sm px-6 py-3 inline-flex"
                style={{ backgroundColor: recommendedPlatform.brandColor }}
              >
                Ø§Ø¨Ø¯Ø£ ÙØ¹ {recommendedPlatform.nameAr} â
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
