import { Clock } from 'lucide-react';
import { StarRating } from '@/components/ui/star-rating';
import type { PlatformFullRelations } from '@/lib/data/platforms';

interface VsHeroProps {
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
}

export function VsHero({ platformA, platformB }: VsHeroProps) {
  return (
    <section className="text-center mb-12">
      <div className="flex items-center justify-center gap-6 mb-6">
        <PlatformBadge platform={platformA} />
        <span className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0">
          VS
        </span>
        <PlatformBadge platform={platformB} />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-snug max-w-2xl mx-auto">
        مقارنة شاملة بين {platformA.nameAr} و{platformB.nameAr} لعام ٢٠٢٦
      </h1>
      <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mb-8">
        <span className="flex items-center gap-1.5">
          <Clock size={13} /> آخر تحديث: يونيو ٢٠٢٦
        </span>
        <span>٨ دقائق للقراءة</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {platformA.affiliateUrl && (
          <a href={platformA.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
            className="btn text-white text-sm px-6 py-3" style={{ backgroundColor: platformA.brandColor }}>
            ابدأ مع {platformA.nameAr}
          </a>
        )}
        {platformB.affiliateUrl && (
          <a href={platformB.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
            className="btn text-white text-sm px-6 py-3" style={{ backgroundColor: platformB.brandColor }}>
            ابدأ مع {platformB.nameAr}
          </a>
        )}
      </div>
    </section>
  );
}

function PlatformBadge({ platform }: { platform: PlatformFullRelations }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden p-1"
        style={{ backgroundColor: `${platform.brandColor}22` }}>
        <img
          src={`/logos/${platform.slug}.png`}
          alt={platform.nameAr}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="font-extrabold text-white text-sm">{platform.nameAr}</span>
      <StarRating rating={platform.rating} />
    </div>
  );
}