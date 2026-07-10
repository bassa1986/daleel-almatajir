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
      <h2 className="text-2xl font-extrabold text-white mb-6">Ø§ÙØ­ÙÙ Ø§ÙÙÙØ§Ø¦Ù</h2>

      <div className="glass p-6 md:p-8 mb-6">
        <p className="text-slate-300 leading-relaxed">
          {winnerName ? (
            <>
              Ø¨Ø¹Ø¯ ÙØ±Ø§Ø¬Ø¹Ø© Ø§ÙØ£Ø³Ø¹Ø§Ø± ÙØ§ÙÙØ²Ø§ÙØ§ ÙØ§ÙØ¯Ø¹Ù Ø§ÙØ¹Ø±Ø¨ÙØ ØªØªÙØ¯ÙÙ <span className="text-white font-bold">{winnerName}</span>{' '}
              ÙÙ Ø¹Ø¯Ø¯ Ø£ÙØ¨Ø± ÙÙ ÙØ¦Ø§Øª Ø§ÙÙÙØ§Ø±ÙØ© ({Math.max(scorecard.totalWinsA, scorecard.totalWinsB)} ÙÙ{' '}
              {scorecard.categories.length}). ÙØ¹ Ø°ÙÙØ Ø§ÙØ®ÙØ§Ø± Ø§ÙØ£ÙØ³Ø¨ ÙØ¨ÙÙ ÙØ±ØªØ¨Ø·Ø§Ù Ø¨Ø­Ø¬Ù ÙØªØ¬Ø±Ù ÙØ³ÙÙÙ Ø§ÙÙØ³ØªÙØ¯Ù ÙØ®Ø¨Ø±ØªÙ
              Ø§ÙØªÙÙÙØ© â Ø§Ø³ØªØ®Ø¯Ù Ø§Ø®ØªØ¨Ø§Ø± "Ø£ÙÙ ÙÙØµØ© ØªÙØ§Ø³Ø¨ÙØ" Ø£Ø¹ÙØ§Ù ÙÙØ­ØµÙÙ Ø¹ÙÙ ØªÙØµÙØ© ÙØ®ØµØµØ©.
            </>
          ) : (
            <>
              {platformA.nameAr} Ù{platformB.nameAr} ÙØªÙØ§Ø±Ø¨ØªØ§Ù Ø¬Ø¯Ø§Ù ÙÙ ÙØ°Ù Ø§ÙÙÙØ§Ø±ÙØ©Ø ÙÙÙ ÙÙÙÙØ§ ØªØªÙÙÙ ÙÙ Ø¬ÙØ§ÙØ¨
              ÙØ®ØªÙÙØ©. Ø§Ø®ØªÙØ§Ø±Ù ÙØ¹ØªÙØ¯ Ø¹ÙÙ Ø£ÙÙÙÙØ§ØªÙ: Ø§ÙÙÙØ²Ø§ÙÙØ©Ø Ø§ÙØ³ÙÙ Ø§ÙÙØ³ØªÙØ¯ÙØ Ø£Ù Ø³ÙÙÙØ© Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù.
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
                Ø§Ø¨Ø¯Ø£ ÙØ¹ {platform.nameAr} â
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
