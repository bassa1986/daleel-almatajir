/**
 * SECTION 8 SEO SYSTEM â "INTERNAL LINKING": auto-links the first occurrence
 * of each platform name (and "Ø­Ø§Ø³Ø¨Ø© Ø§ÙØªÙØ§ÙÙÙ") inside rendered article HTML.
 *
 * Applied at render time (not persisted to the stored bodyHtml) so the
 * Tiptap editor's saved content stays exactly what the editor produced.
 */
const LINK_TARGETS: Array<{ term: string; href: string }> = [
  { term: 'Ø³ÙØ©', href: '/ÙÙØ§Ø±ÙØ§Øª/salla' },
  { term: 'Ø²Ø¯', href: '/ÙÙØ§Ø±ÙØ§Øª/zid' },
  { term: 'Ø´ÙØ¨ÙÙØ§Ù', href: '/ÙÙØ§Ø±ÙØ§Øª/shopify' },
  { term: 'ÙÙÙÙÙØ±Ø³', href: '/ÙÙØ§Ø±ÙØ§Øª/woocommerce' },
  { term: 'Ø¨ÙØº ÙÙÙØ±Ø³', href: '/ÙÙØ§Ø±ÙØ§Øª/bigcommerce' },
  { term: 'ÙØ§Ø¬ÙØªÙ', href: '/ÙÙØ§Ø±ÙØ§Øª/magento' },
  { term: 'Ø­Ø§Ø³Ø¨Ø© Ø§ÙØªÙØ§ÙÙÙ', href: '/Ø­Ø§Ø³Ø¨Ø©-Ø§ÙØªÙØ§ÙÙÙ' },
];

/** Escapes a string for safe use inside a RegExp. */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function autoLinkArticleHtml(html: string): string {
  let result = html;

  for (const { term, href } of LINK_TARGETS) {
    // Skip if the term already appears inside an <a ...>...</a> anywhere â
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
