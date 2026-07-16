import { Cairo } from 'next/font/google';

/**
 * Cairo — the sole typeface across دليل المتاجر (headings + body, public
 * site + admin CMS). Loaded as a CSS variable so it can be referenced from
 * Tailwind's `--font-sans` token in app/globals.css.
 */
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});
