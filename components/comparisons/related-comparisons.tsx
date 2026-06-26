import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const PLATFORM_NAMES_AR: Record<string, string> = {
  salla: 'Ø³Ù„Ø©',
  zid: 'Ø²Ø¯',
  shopify: 'Ø´ÙˆØ¨ÙŠÙØ§ÙŠ',
  woocommerce: 'ÙˆÙˆÙƒÙˆÙ…Ø±Ø³',
  bigcommerce: 'Ø¨ÙŠØº ÙƒÙˆÙ…Ø±Ø³',
  magento: 'Ù…Ø§Ø¬Ù†ØªÙˆ',
};

const PLATFORM_COLORS: Record<string, string> = {
  salla: '#4CAF50',
  zid: '#2196F3',
  shopify: '#96BF48',
  woocommerce: '#7F54B3',
  bigcommerce: '#34313F',
  magento: '#F26322',
};

const ALL_SLUGS = Object.keys(PLATFORM_NAMES_AR);

interface RelatedComparisonsProps {
  currentSlugA: string;
  currentSlugB: string;
}

export function RelatedComparisons({ currentSlugA, currentSlugB }: RelatedComparisonsProps) {
  // Suggest pairs that share one platform with the current comparison, so the
  // recommendations stay relevant (e.g. on salla-vs-zid, suggest salla-vs-shopify).
  const candidates: Array<[string, string]> = [];
  for (const slug of ALL_SLUGS) {
    if (slug !== currentSlugA && slug !== currentSlugB) {
      candidates.push([currentSlugA, slug]);
      candidates.push([currentSlugB, slug]);
    }
  }

  const related = candidates.slice(0, 4);

  return (
    <section id="related" className="mb-4">
      <h2 className="text-2xl font-extrabold text-white mb-6">Ù…Ù‚Ø§Ø±Ù†Ø§Øª Ø°Ø§Øª ØµÙ„Ø©</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {related.map(([a, b]) => (
          <Link
            key={`${a}-${b}`}
            href={`/Ù…Ù‚Ø§Ø±Ù†Ø§Øª/${a}-vs-${b}`}
            className="glass glass-hover flex items-center gap-3 p-4"
          >
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PLATFORM_COLORS[a] }} />
            <span className="font-bold text-white text-sm flex-1">{PLATFORM_NAMES_AR[a]}</span>
            <span className="badge badge-neutral text-xs font-extrabold flex-shrink-0">VS</span>
            <span className="font-bold text-white text-sm flex-1 text-left">{PLATFORM_NAMES_AR[b]}</span>
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PLATFORM_COLORS[b] }} />
            <ArrowLeft size={14} className="text-slate-500 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
