import * as cheerio from 'cheerio';
import { fetchHtml } from '../lib/fetch';
import type { PlatformScraper, ScrapedPricingTier } from '../lib/types';

/** BigCommerce pricing scraper. See salla.ts for selector caveats. */

const SOURCE_URL = 'https://www.bigcommerce.com/essentials/pricing/';

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
    const priceText = card
      .find('.plan-price, [data-plan-price]')
      .first()
      .text()
      .replace(/[^\d.]/g, '');
    const monthlyFeeUSD = parseFloat(priceText);

    if (!nameEn || Number.isNaN(monthlyFeeUSD)) return;

    const monthlyFeeSAR = Math.round(monthlyFeeUSD * 3.75 * 100) / 100;

    tiers.push({
      name: nameEn,
      nameAr: nameEn,
      monthlyFeeSAR,
      transactionFeePct: 0,
      perOrderFee: 0,
      notes: `Converted from $${monthlyFeeUSD} USD at ~3.75 SAR/USD — verify against actual SAR pricing if BigCommerce offers it.`,
    });
  });

  return tiers;
}

export const bigcommerceScraper: PlatformScraper = {
  platformSlug: 'bigcommerce',
  sourceUrl: SOURCE_URL,
  scrape,
};
