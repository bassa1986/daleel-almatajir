import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const PLATFORM_NAMES_AR: Record<string, string> = {
  salla: 'Ø³ÙØ©',
  zid: 'Ø²Ø¯',
  shopify: 'Ø´ÙØ¨ÙÙØ§Ù',
  woocommerce: 'ÙÙÙÙÙØ±Ø³',
  bigcommerce: 'Ø¨ÙØº ÙÙÙØ±Ø³',
  magento: 'ÙØ§Ø¬ÙØªÙ',
};

const ALL_PAIRS = [
  ['salla','zid'],['salla','shopify'],['salla','woocommerce'],['salla','bigcommerce'],['salla','magento'],
  ['zid','shopify'],['zid','woocommerce'],['zid','bigcommerce'],['zid','magento'],
  ['shopify','woocommerce'],['shopify','bigcommerce'],['shopify','magento'],
  ['woocommerce','bigcommerce'],['woocommerce','magento'],['bigcommerce','magento'],
];

interface Props { currentSlugA: string; currentSlugB: string; }

export function RelatedComparisons({ currentSlugA, currentSlugB }: Props) {
  const related = ALL_PAIRS.filter(
    ([a, b]) =>
      (a === currentSlugA || b === currentSlugA || a === currentSlugB || b === currentSlugB) &&
      !(a === currentSlugA && b === currentSlugB) &&
      !(a === currentSlugB && b === currentSlugA)
  ).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-extrabold text-white mb-4">ÙÙØ§Ø±ÙØ§Øª Ø°Ø§Øª ØµÙØ©</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {related.map(([a, b]) => (
          <Link key={`${a}-${b}`} href={`/muqaranat/${a}-vs-${b}`}
            className="glass glass-hover flex items-center justify-between p-4">
            <span className="font-bold text-white text-sm">{PLATFORM_NAMES_AR[a] || a}</span>
            <span className="badge badge-neutral text-xs font-extrabold px-2">VS</span>
            <span className="font-bold text-white text-sm">{PLATFORM_NAMES_AR[b] || b}</span>
            <ArrowLeft size={14} className="text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}