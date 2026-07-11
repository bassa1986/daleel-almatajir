import { Trophy } from 'lucide-react';
import type { Scorecard } from '@/lib/data/scorecard';
import type { PlatformFullRelations } from '@/lib/data/platforms';

interface ScorecardTableProps {
  scorecard: Scorecard;
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
}

export function ScorecardTable({ scorecard, platformA, platformB }: ScorecardTableProps) {
  const overall = scorecard.winner === 'A' ? platformA : scorecard.winner === 'B' ? platformB : null;
  const winsA = scorecard.rows.filter(r => r.winner === 'A').length;
  const winsB = scorecard.rows.filter(r => r.winner === 'B').length;

  return (
    <section id="scorecard" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">بطاقة النقاط</h2>
      <div className="glass overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 text-xs text-slate-500 border-b border-white/8">
          <span>الفئة</span>
          <span className="w-24 text-center">{platformA.nameAr}</span>
          <span className="w-24 text-center">{platformB.nameAr}</span>
        </div>

        {scorecard.rows.map((row) => (
          <div key={row.category}
            className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 border-b border-white/6 items-center">
            <div className="text-sm text-slate-300 font-medium">{row.category}</div>
            <ScoreBar value={row.slugA * 20} won={row.winner === 'A'} color={platformA.brandColor} />
            <ScoreBar value={row.slugB * 20} won={row.winner === 'B'} color={platformB.brandColor} />
          </div>
        ))}

        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 bg-white/4 items-center">
          <span className="text-sm font-bold text-white">المجموع</span>
          <span className="w-24 text-center figure font-extrabold text-white">{winsA}</span>
          <span className="w-24 text-center figure font-extrabold text-white">{winsB}</span>
        </div>
      </div>

      {overall && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-amber-300">
          <Trophy size={16} />
          <span className="font-bold">{overall.nameAr}</span>
          يتقدم في بطاقة النقاط الإجمالية
        </div>
      )}
    </section>
  );
}

function ScoreBar({ value, won, color }: { value: number; won: boolean; color: string }) {
  return (
    <div className="w-24 flex flex-col items-center gap-1">
      <div className="w-full h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div className="h-full rounded-full transition-all"
          style={{ width: `${Math.max(4, value)}%`, backgroundColor: won ? color : 'rgba(255,255,255,0.25)' }} />
      </div>
      {won && <span className="text-[10px] text-emerald-400 font-bold">الأفضل</span>}
    </div>
  );
}