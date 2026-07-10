import { Trophy } from 'lucide-react';
import type { ScorecardResult } from '@/lib/data/scorecard';
import type { PlatformFullRelations } from '@/lib/data/platforms';

interface ScorecardTableProps {
  scorecard: ScorecardResult;
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
}

export function ScorecardTable({ scorecard, platformA, platformB }: ScorecardTableProps) {
  const overall =
    scorecard.overallWinner === 'a' ? platformA : scorecard.overallWinner === 'b' ? platformB : null;

  return (
    <section id="scorecard" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">ÃÂ¨ÃÂ·ÃÂ§ÃÂÃÂ© ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ·</h2>

      <div className="glass overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 text-xs text-slate-500 border-b border-white/8">
          <span>ÃÂ§ÃÂÃÂÃÂ¦ÃÂ©</span>
          <span className="w-24 text-center">{platformA.nameAr}</span>
          <span className="w-24 text-center">{platformB.nameAr}</span>
        </div>

        {scorecard.categories.map((cat) => (
          <div
            key={cat.key}
            className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 border-b border-white/6 items-center"
          >
            <div>
              <div className="text-sm text-slate-300 font-medium">{cat.labelAr}</div>
              {cat.noteAr && <div className="text-[11px] text-slate-500 mt-0.5">{cat.noteAr}</div>}
            </div>
            <ScoreBar value={cat.scoreA} won={cat.winner === 'a'} color={platformA.brandColor} />
            <ScoreBar value={cat.scoreB} won={cat.winner === 'b'} color={platformB.brandColor} />
          </div>
        ))}

        {/* Total row */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 bg-white/4 items-center">
          <span className="text-sm font-bold text-white">ÃÂ§ÃÂÃÂÃÂ¬ÃÂÃÂÃÂ¹</span>
          <span className="w-24 text-center figure font-extrabold text-white">{scorecard.totalWinsA}</span>
          <span className="w-24 text-center figure font-extrabold text-white">{scorecard.totalWinsB}</span>
        </div>
      </div>

      {overall && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-amber-300">
          <Trophy size={16} />
          <span className="font-bold">{overall.nameAr}</span>
          ÃÂÃÂªÃÂÃÂ¯ÃÂ ÃÂÃÂ ÃÂ¨ÃÂ·ÃÂ§ÃÂÃÂ© ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ· ÃÂ§ÃÂÃÂ¥ÃÂ¬ÃÂÃÂ§ÃÂÃÂÃÂ©
        </div>
      )}
    </section>
  );
}

function ScoreBar({ value, won, color }: { value: number; won: boolean; color: string }) {
  return (
    <div className="w-24 flex flex-col items-center gap-1">
      <div className="w-full h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.max(4, value)}%`, backgroundColor: won ? color : 'rgba(255,255,255,0.25)' }}
        />
      </div>
      {won && <span className="text-[10px] text-emerald-400 font-bold">ÃÂ§ÃÂÃÂ£ÃÂÃÂ¶ÃÂ</span>}
    </div>
  );
}
