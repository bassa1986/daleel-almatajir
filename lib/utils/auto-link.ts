/**
 * SECTION 8 SEO SYSTEM — "INTERNAL LINKING": auto-links the first occurrence
 * of each platform name (and "حاسبة التكاليف") inside rendered article HTML.
 *
 * Applied at render time (not persisted to the stored bodyHtml) so the
 * Tiptap editor's saved content stays exactly what the editor produced.
 */
const LINK_TARGETS: Array<{ term: string; href: string }> = [
  { term: 'سلة', href: '/muqaranat/salla' },
  { term: 'زد', href: '/muqaranat/zid' },
  { term: 'شوبيفاي', href: '/muqaranat/shopify' },
  { term: 'ووكومرس', href: '/muqaranat/woocommerce' },
  { term: 'بيغ كومرس', href: '/muqaranat/bigcommerce' },
  { term: 'ماجنتو', href: '/muqaranat/magento' },
  { term: 'حاسبة التكاليف', href: '/calculator' },
];

/** Escapes a string for safe use inside a RegExp. */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function autoLinkArticleHtml(html: string): string {
  let result = html;

  for (const { term, href } of LINK_TARGETS) {
    // Skip if the term already appears inside an <a ...>...</a> anywhere —
    // crude but effective guard against double-linking on re-render.
    const alreadyLinked = new RegExp(`<a[^>]*>[^<]*${escapeRegExp(term)}[^<]*</a>`).test(result);
    if (alreadyLinked) continue;

    const pattern = new RegExp(`(${escapeRegExp(term)})`, 'u');
    result = result.replace(pattern, `<a href="${href}">$1</a>`);
  }

  return result;
}
