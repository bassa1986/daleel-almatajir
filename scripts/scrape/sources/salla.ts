import * as cheerio from 'cheerio';
import { fetchHtml } from '../lib/fetch';
import type { PlatformScraper, ScrapedPricingTier } from '../lib/types';

/**
 * Salla pricing scraper.
 *
 * SOURCE: Salla's official public pricing page.
 *
 * ⚠️ SELECTOR VERIFICATION NEEDED:
 * I built this without live network access to the real page, so the CSS
 * selectors below are a best-effort guess based on typical SaaS pricing
 * page markup (a repeated "pricing card" container with a plan name,
 * a price, and a billing-period label). Before relying on this:
 *
 *   1. Open the source URL below in a browser.
 *   2. Right-click a pricing card → Inspect.
 *   3. Find the actual container class/selector for each card, the plan
 *      name element, and the price element.
 *   4. Update the selectors in `scrape()` below to match.
 *   5. Run `npm run scrape:dry` and check the JSON output before applying.
 */

const SOURCE_URL = 'https://salla.sa/pricing';

async function scrape(): Promise<ScrapedPricingTier[]> {
  const result = await fetchHtml(SOURCE_URL);
  if (!result.ok) {
    throw new Error(result.reason);
  }

  const $ = cheerio.load(result.html);
  const tiers: ScrapedPricingTier[] = [];

  // TODO: verify this selector against the live page structure.
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

    if (!nameEn || Number.isNaN(monthlyFeeSAR)) {
      // Skip cards that don't match expected structure (e.g. "Contact us"
      // enterprise tiers with no numeric price) rather than writing bad data.
      return;
    }

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

export const sallaScraper: PlatformScraper = {
  platformSlug: 'salla',
  sourceUrl: SOURCE_URL,
  scrape,
};
