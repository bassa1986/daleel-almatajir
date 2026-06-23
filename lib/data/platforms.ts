import { prisma } from '../db';
import type { PlatformConfig } from '../calculator/types';

/**
 * Editorial display order for the homepage platform grid and similar
 * listings: GCC platforms first (most relevant to most visitors), then
 * global platforms roughly in order of how often merchants ask about them.
 */
export const PLATFORM_DISPLAY_ORDER = [
  'salla',
  'zid',
  'shopify',
  'woocommerce',
  'bigcommerce',
  'magento',
] as const;

type KnownSlug = (typeof PLATFORM_DISPLAY_ORDER)[number];

function orderPlatforms<T extends { slug: string }>(platforms: T[]): T[] {
  return [...platforms].sort(
    (a, b) =>
      PLATFORM_DISPLAY_ORDER.indexOf(a.slug as KnownSlug) -
      PLATFORM_DISPLAY_ORDER.indexOf(b.slug as KnownSlug)
  );
}

async function fetchPlatformsWithRelations() {
  return prisma.platform.findMany({
    include: {
      pricingTiers: { orderBy: { sortOrder: 'asc' } },
      hiddenCosts: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

export type PlatformWithRelations = Awaited<ReturnType<typeof fetchPlatformsWithRelations>>[number];

/** Maps a Prisma Platform (with relations) to the calculator engine's PlatformConfig shape. */
export function toPlatformConfig(platform: PlatformWithRelations): PlatformConfig {
  return {
    id: platform.id,
    slug: platform.slug,
    nameAr: platform.nameAr,
    nameEn: platform.nameEn,
    logo: platform.logo,
    brandColor: platform.brandColor,
    affiliateUrl: platform.affiliateUrl,
    setupFeeSAR: platform.setupFeeSAR,
    warningThresholdSAR: platform.warningThresholdSAR,
    warningTextAr: platform.warningTextAr,
    pricingTiers: platform.pricingTiers.map((t) => ({
      id: t.id,
      name: t.name,
      nameAr: t.nameAr,
      minRevenueSAR: t.minRevenueSAR,
      maxRevenueSAR: t.maxRevenueSAR,
      monthlyFeeSAR: t.monthlyFeeSAR,
      transactionFeePct: t.transactionFeePct,
      perOrderFee: t.perOrderFee,
      maxOrders: t.maxOrders,
      annualRevLimitSAR: t.annualRevLimitSAR,
      sortOrder: t.sortOrder,
    })),
    hiddenCosts: platform.hiddenCosts.map((h) => ({
      id: h.id,
      labelAr: h.labelAr,
      monthlySAR: h.monthlySAR,
      isRequired: h.isRequired,
      scenarios: h.scenarios,
      sortOrder: h.sortOrder,
    })),
  };
}

export interface PlatformDisplay {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  /** 'GCC' | 'Global' */
  origin: string;
  brandColor: string;
  logo: string;
  rating: number;
  /** Cheapest realistic monthly starting cost (entry tier + minimal-scenario hidden costs), in SAR. */
  startingPriceSAR: number;
  /** True if real-world cost typically exceeds startingPriceSAR (e.g. WooCommerce/Magento hosting). */
  hasAdditionalCosts: boolean;
}

/**
 * Lowest realistic monthly entry cost: the entry-tier subscription fee plus
 * whatever hidden costs apply under the cheapest ("minimal") scenario, or —
 * for platforms without scenarios (e.g. Magento) — the always-required
 * hidden costs.
 */
export function getStartingPriceSAR(platform: PlatformWithRelations): number {
  const entryTier = [...platform.pricingTiers].sort((a, b) => a.sortOrder - b.sortOrder)[0];
  const baseFee = entryTier?.monthlyFeeSAR ?? 0;

  const minimalHiddenCosts = platform.hiddenCosts.reduce((sum, h) => {
    if (h.scenarios.length > 0) {
      return h.scenarios.includes('minimal') ? sum + h.monthlySAR : sum;
    }
    return h.isRequired ? sum + h.monthlySAR : sum;
  }, 0);

  return baseFee + minimalHiddenCosts;
}

export function toPlatformDisplay(platform: PlatformWithRelations): PlatformDisplay {
  return {
    id: platform.id,
    slug: platform.slug,
    nameAr: platform.nameAr,
    nameEn: platform.nameEn,
    origin: platform.origin,
    brandColor: platform.brandColor,
    logo: platform.logo,
    rating: platform.rating,
    startingPriceSAR: getStartingPriceSAR(platform),
    hasAdditionalCosts: platform.hiddenCosts.length > 0,
  };
}

export async function getPlatformsForCalculator(): Promise<PlatformConfig[]> {
  const platforms = orderPlatforms(await fetchPlatformsWithRelations());
  return platforms.map(toPlatformConfig);
}

/** Full platform record with pricing tiers, hidden costs, pros, and cons — used by VS comparison pages. */
export async function getPlatformWithFullRelations(slug: string) {
  return prisma.platform.findUnique({
    where: { slug },
    include: {
      pricingTiers: { orderBy: { sortOrder: 'asc' } },
      hiddenCosts: { orderBy: { sortOrder: 'asc' } },
      pros: { orderBy: { sortOrder: 'asc' } },
      cons: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

export type PlatformFullRelations = NonNullable<Awaited<ReturnType<typeof getPlatformWithFullRelations>>>;


export async function getPlatformsForDisplay(): Promise<PlatformDisplay[]> {
  const platforms = orderPlatforms(await fetchPlatformsWithRelations());
  return platforms.map(toPlatformDisplay);
}

/** Fetches both shapes from a single query — used by the homepage. */
export async function getHomepagePlatformData(): Promise<{
  configs: PlatformConfig[];
  display: PlatformDisplay[];
}> {
  const platforms = orderPlatforms(await fetchPlatformsWithRelations());
  return {
    configs: platforms.map(toPlatformConfig),
    display: platforms.map(toPlatformDisplay),
  };
}
