import { StarRating } from '@/components/ui/star-rating';
import type { PlatformFullRelations } from '@/lib/data/platforms';
import type { ScorecardResult } from '@/lib/data/scorecard';

interface FinalVerdictProps {
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
  scorecard: ScorecardResult;
}

export function FinalVerdict({ platformA, platformB, scorecard }: FinalVerdictProps) {
  const winnerName =
    scorecard.overallWinner === 'a'
      ? platformA.nameAr
      : scorecard.overallWinner === 'b'
        ? platformB.nameAr
        : null;

  return (
    <section id="final-verdict" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">ÃÂ§ÃÂÃÂ­ÃÂÃÂ ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ¦ÃÂ</h2>

      <div className="glass p-6 md:p-8 mb-6">
        <p className="text-slate-300 leading-relaxed">
          {winnerName ? (
            <>
              ÃÂ¨ÃÂ¹ÃÂ¯ ÃÂÃÂ±ÃÂ§ÃÂ¬ÃÂ¹ÃÂ© ÃÂ§ÃÂÃÂ£ÃÂ³ÃÂ¹ÃÂ§ÃÂ± ÃÂÃÂ§ÃÂÃÂÃÂ²ÃÂ§ÃÂÃÂ§ ÃÂÃÂ§ÃÂÃÂ¯ÃÂ¹ÃÂ ÃÂ§ÃÂÃÂ¹ÃÂ±ÃÂ¨ÃÂÃÂ ÃÂªÃÂªÃÂÃÂ¯ÃÂÃÂ <span className="text-white font-bold">{winnerName}</span>{' '}
              ÃÂÃÂ ÃÂ¹ÃÂ¯ÃÂ¯ ÃÂ£ÃÂÃÂ¨ÃÂ± ÃÂÃÂ ÃÂÃÂ¦ÃÂ§ÃÂª ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ±ÃÂÃÂ© ({Math.max(scorecard.totalWinsA, scorecard.totalWinsB)} ÃÂÃÂ{' '}
              {scorecard.categories.length}). ÃÂÃÂ¹ ÃÂ°ÃÂÃÂÃÂ ÃÂ§ÃÂÃÂ®ÃÂÃÂ§ÃÂ± ÃÂ§ÃÂÃÂ£ÃÂÃÂ³ÃÂ¨ ÃÂÃÂ¨ÃÂÃÂ ÃÂÃÂ±ÃÂªÃÂ¨ÃÂ·ÃÂ§ÃÂ ÃÂ¨ÃÂ­ÃÂ¬ÃÂ ÃÂÃÂªÃÂ¬ÃÂ±ÃÂ ÃÂÃÂ³ÃÂÃÂÃÂ ÃÂ§ÃÂÃÂÃÂ³ÃÂªÃÂÃÂ¯ÃÂ ÃÂÃÂ®ÃÂ¨ÃÂ±ÃÂªÃÂ
              ÃÂ§ÃÂÃÂªÃÂÃÂÃÂÃÂ© Ã¢ÂÂ ÃÂ§ÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ ÃÂ§ÃÂ®ÃÂªÃÂ¨ÃÂ§ÃÂ± "ÃÂ£ÃÂÃÂ ÃÂÃÂÃÂµÃÂ© ÃÂªÃÂÃÂ§ÃÂ³ÃÂ¨ÃÂÃÂ" ÃÂ£ÃÂ¹ÃÂÃÂ§ÃÂ ÃÂÃÂÃÂ­ÃÂµÃÂÃÂ ÃÂ¹ÃÂÃÂ ÃÂªÃÂÃÂµÃÂÃÂ© ÃÂÃÂ®ÃÂµÃÂµÃÂ©.
            </>
          ) : (
            <>
              {platformA.nameAr} ÃÂ{platformB.nameAr} ÃÂÃÂªÃÂÃÂ§ÃÂ±ÃÂ¨ÃÂªÃÂ§ÃÂ ÃÂ¬ÃÂ¯ÃÂ§ÃÂ ÃÂÃÂ ÃÂÃÂ°ÃÂ ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ±ÃÂÃÂ©ÃÂ ÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂ§ ÃÂªÃÂªÃÂÃÂÃÂ ÃÂÃÂ ÃÂ¬ÃÂÃÂ§ÃÂÃÂ¨
              ÃÂÃÂ®ÃÂªÃÂÃÂÃÂ©. ÃÂ§ÃÂ®ÃÂªÃÂÃÂ§ÃÂ±ÃÂ ÃÂÃÂ¹ÃÂªÃÂÃÂ¯ ÃÂ¹ÃÂÃÂ ÃÂ£ÃÂÃÂÃÂÃÂÃÂ§ÃÂªÃÂ: ÃÂ§ÃÂÃÂÃÂÃÂ²ÃÂ§ÃÂÃÂÃÂ©ÃÂ ÃÂ§ÃÂÃÂ³ÃÂÃÂ ÃÂ§ÃÂÃÂÃÂ³ÃÂªÃÂÃÂ¯ÃÂÃÂ ÃÂ£ÃÂ ÃÂ³ÃÂÃÂÃÂÃÂ© ÃÂ§ÃÂÃÂ§ÃÂ³ÃÂªÃÂ®ÃÂ¯ÃÂ§ÃÂ.
            </>
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[platformA, platformB].map((platform) => (
          <div key={platform.slug} className="glass p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-extrabold text-white">{platform.nameAr}</span>
              <StarRating rating={platform.rating} />
            </div>
            {platform.quickVerdictAr && (
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{platform.quickVerdictAr}</p>
            )}
            {platform.affiliateUrl && (
              <a
                href={platform.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn text-white text-sm px-5 py-2.5 w-full justify-center"
                style={{ backgroundColor: platform.brandColor }}
              >
                ÃÂ§ÃÂ¨ÃÂ¯ÃÂ£ ÃÂÃÂ¹ {platform.nameAr} Ã¢ÂÂ
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
