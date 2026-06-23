export interface ScrapedPricingTier {
  name: string; // English tier name, e.g. "Basic"
  nameAr: string; // Arabic tier name
  monthlyFeeSAR: number;
  transactionFeePct?: number; // 0 if none
  perOrderFee?: number; // 0 if none
  minRevenueSAR?: number;
  maxRevenueSAR?: number; // omit/undefined for "unlimited"
  maxOrders?: number;
  annualRevLimitSAR?: number;
  notes?: string; // free text, e.g. "billed annually, monthly price shown"
}

export interface ScrapeResult {
  platformSlug: string;
  sourceUrl: string;
  scrapedAt: string; // ISO timestamp
  status: 'ok' | 'skipped' | 'error';
  reason?: string; // populated when skipped/error
  tiers: ScrapedPricingTier[];
}

export interface PlatformScraper {
  platformSlug: string;
  sourceUrl: string;
  scrape: () => Promise<ScrapedPricingTier[]>;
}
