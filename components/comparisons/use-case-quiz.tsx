'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { Scorecard } from '@/lib/data/scorecard';
import type { PlatformFullRelations } from '@/lib/data/platforms';

interface UseCaseQuizProps {
  scorecard: Scorecard;
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
}

const QUESTIONS = [
  {
    id: 'revenue',
    labelAr: 'ما حجم إيرادات متجرك الشهرية؟',
    options: [
      { labelAr: 'صغيرة (أقل من ٥٠ ألف ر.س)', preferA: ['سهولة الاستخدام', 'الدعم الفني'] },
      { labelAr: 'متوسطة (٥٠ - ٥٠٠ ألف ر.س)', preferA: ['التسويق', 'بوابات الدفع'] },
      { labelAr: 'كبيرة (أكثر من ٥٠٠ ألف ر.س)', preferA: ['التوسع الدولي', 'التخصيص'] },
    ],
  },
  {
    id: 'market',
    labelAr: 'ما هو سوقك المستهدف؟',
    options: [
      { labelAr: 'السعودية والخليج فقط', preferA: ['دعم عربي', 'بوابات الدفع'] },
      { labelAr: 'الدول العربية الأخرى', preferA: ['دعم عربي', 'التسويق'] },
      { labelAr: 'أسواق عالمية', preferA: ['التوسع الدولي', 'التخصيص'] },
    ],
  },
  {
    id: 'tech',
    labelAr: 'ما مستوى خبرتك التقنية؟',
    options: [
      { labelAr: 'مبتدئ — لا أملك خبرة تقنية', preferA: ['سهولة الاستخدام', 'الدعم الفني'] },
      { labelAr: 'متوسط — أستطيع التعامل مع لوحات التحكم', preferA: ['سهولة الاستخدام'] },
      { labelAr: 'متطور — أملك فريقاً تقنياً', preferA: ['التخصيص', 'التوسع الدولي'] },
    ],
  },
];

export function UseCaseQuiz({ scorecard, platformA, platformB }: UseCaseQuizProps) {
  const [answers, setAnswers] = useState<Record<string, number | null>>({
    revenue: null, market: null, tech: null,
  });

  const allAnswered = Object.values(answers).every((v) => v !== null);

  function computeRecommendation(): 'A' | 'B' | 'tie' {
    let scoreA = 0;
    let scoreB = 0;

    QUESTIONS.forEach((q) => {
      const selectedIndex = answers[q.id];
      if (selectedIndex === null || selectedIndex === undefined) return;
      const option = q.options[selectedIndex];
      option.preferA.forEach((catKey) => {
        const row = scorecard.rows.find((r) => r.category === catKey);
        if (!row) return;
        if (row.winner === 'A') scoreA += 1;
        if (row.winner === 'B') scoreB += 1;
      });
    });

    if (scoreA === scoreB) return scorecard.winner;
    return scoreA > scoreB ? 'A' : 'B';
  }

  const recommendation = allAnswered ? computeRecommendation() : null;
  const recommendedPlatform =
    recommendation === 'A' ? platformA : recommendation === 'B' ? platformB : null;

  return (
    <section id="quiz" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-2">أي منصة تناسبك؟</h2>
      <p className="text-sm text-slate-500 mb-6">أجب عن ٣ أسئلة قصيرة للحصول على توصية شخصية</p>

      <div className="glass p-6 md:p-8">
        <div className="space-y-6 mb-6">
          {QUESTIONS.map((q) => (
            <div key={q.id}>
              <div className="text-sm font-semibold text-slate-300 mb-3">{q.labelAr}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                {q.options.map((option, i) => (
                  <button key={i}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                    className={`flex-1 rounded-lg border px-4 py-2.5 text-xs font-medium text-right transition-all ${
                      answers[q.id] === i
                        ? 'border-primary/40 bg-primary/15 text-blue-300'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}>
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
            <div className="text-sm text-slate-400 mb-1">التوصية المناسبة لك</div>
            <div className="text-2xl font-extrabold text-white mb-4">{recommendedPlatform.nameAr}</div>
            {recommendedPlatform.affiliateUrl && (
              <a href={recommendedPlatform.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                className="btn text-white text-sm px-6 py-3 inline-flex"
                style={{ backgroundColor: recommendedPlatform.brandColor }}>
                ابدأ مع {recommendedPlatform.nameAr} ←
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}