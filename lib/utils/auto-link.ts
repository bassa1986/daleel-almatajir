/**
 * SECTION 8 SEO SYSTEM — "INTERNAL LINKING": auto-links the first occurrence
 * of each platform name (and "حاسبة التكاليف") inside rendered article HTML.
 *
 * Applied at render time (not persisted to the stored bodyHtml) so the
 * Tiptap editor's saved content stays exactly what the editor produced.
 */
const LINK_TARGETS: Array<{ term: string; href: string }> = [
  { term: 'سلة', href: '/مقارنات/salla' },
  { term: 'زد', href: '/مقارنات/zid' },
  { term: 'شوبيفاي', href: '/مقارنات/shopify' },
  { term: 'ووكومرس', href: '/مقارنات/woocommerce' },
  { term: 'بيغ كومرس', href: '/مقارنات/bigcommerce' },
  { term: 'ماجنتو', href: '/مقارنات/magento' },
  { term: 'حاسبة التكاليف', href: '/حاسبة-التكاليف' },
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

    // Match the first occurrence of the term that isn't already inside a tag's attributes.
    const regex = new RegExp(`(${escapeRegExp(term)})`);
    const match = regex.exec(result);
    if (!match) continue;

    // Make sure we're not inside an existing <a> tag or an HTML attribute.
    const beforeMatch = result.slice(0, match.index);
    const lastOpenA = beforeMatch.lastIndexOf('<a');
    const lastCloseA = beforeMatch.lastIndexOf('</a>');
    if (lastOpenA > lastCloseA) continue; // currently inside an <a> tag

    result =
      result.slice(0, match.index) +
      `<a href="${href}">${match[1]}</a>` +
      result.slice(match.index + match[1].length);
  }

  return result;
}
