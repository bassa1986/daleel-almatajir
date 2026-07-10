import { Cairo } from 'next/font/google';

/**
 * Cairo â the sole typeface across Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± (headings + body, public
 * site + admin CMS). Loaded as a CSS variable so it can be referenced from
 * Tailwind's `--font-sans` token in app/globals.css.
 *
 * Weight range covers the light body text (300/400) through the very heavy
 * display weights (800) used for the hero H1 and big SAR figures.
 */
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});
