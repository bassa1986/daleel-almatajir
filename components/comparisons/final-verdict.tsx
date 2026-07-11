import { StarRating } from '@/components/ui/star-rating';
import type { PlatformFullRelations } from '@/lib/data/platforms';
import type { Scorecard } from '@/lib/data/scorecard';

interface FinalVerdictProps {
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
  scorecard: Scorecard;
}

export function FinalVerdict({ platformA, platformB, scorecard }: FinalVerdictProps) {
  const winnerName =
    scorecard.winner === 'A' ? platformA.nameAr
    : scorecard.winner === 'B' ? platformB.nameAr
    : null;

  const winsA = scorecard.rows.filter(r => r.winner === 'A').length;
  const winsB = scorecard.rows.filter(r => r.winner === 'B').length;

  return (
    <section id="final-verdict" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">الحكم النهائي</h2>

      <div className="glass p-6 md:p-8 mb-6">
        <p className="text-slate-300 leading-relaxed">
          {winnerName ? (
            <>
              بعد مراجعة الأسعار والمزايا والدعم العربي، تتقدم{' '}
              <span className="text-white font-bold">{winnerName}</span>{' '}
              في {Math.max(winsA, winsB)} من {scorecard.rows.length} فئات المقارنة.
              مع ذلك، الخيار الأنسب يبقى مرتبطاً بحجم متجرك وسوقك المستهدف وخبرتك التقنية.
            </>
          ) : (
            <>
              {platformA.nameAr} و{platformB.nameAr} متقاربتان جداً في هذه المقارنة،
              وكل منهما تتفوق في جوانب مختلفة. اختيارك يعتمد على أولوياتك:
              الميزانية، السوق المستهدف، أو سهولة الاستخدام.
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
              <a href={platform.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                className="btn text-white text-sm px-5 py-2.5 w-full justify-center block text-center"
                style={{ backgroundColor: platform.brandColor }}>
                ابدأ مع {platform.nameAr} ←
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}