import * as cheerio from 'cheerio';
import { fetchHtml } from '../lib/fetch';
import type { PlatformScraper, ScrapedPricingTier } from '../lib/types';

/**
 * Zid pricing scraper. See salla.ts for the full explanation of why
 * selectors need manual verification before this is trusted.
 */

const SOURCE_URL = 'https://zid.sa/pricing';

async function scrape(): Promise<ScrapedPricingTier[]> {
  const result = await fetchHtml(SOURCE_URL);
  if (!result.ok) {
    throw new Error(result.reason);
  }

  const $ = cheerio.load(result.html);
  const tiers: ScrapedPricingTier[] = [];

  // TODO: verify against the live page.
  $('[data-pricing-card], .pricing-card, .plan-card').each((_, el) => {
    const card = $(el);
    const nameEn = card.find('.plan-name, [data-plan-name]').first().text().trim();
    const nameAr = card.find('[lang="ar"], .plan-name-ar').first().text().trim() || nameEn;
    const priceText = card
      .find('.plan-price, [data-plan-price]')
      .first()
      .text()
      .replace(/[^\d.]/g, '');
    const monthlyFeeSAR = parseFloat(priceText);

    if (!nameEn || Number.isNaN(monthlyFeeSAR)) return;

    tiers.push({
      name: nameEn,
      nameAr: nameAr || nameEn,
      monthlyFeeSAR,
      transactionFeePct: 0,
      perOrderFee: 0,
    });
  });

  return tiers;
}

export const zidScraper: PlatformScraper = {
  platformSlug: 'zid',
  sourceUrl: SOURCE_URL,
  scrape,
};
