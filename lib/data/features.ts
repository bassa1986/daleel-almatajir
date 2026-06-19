import { prisma } from '../db';
import type { SupportLevel } from '../calculator/types';

export type FeatureSupportMap = Record<string, Record<string, SupportLevel>>;

/** Returns { [platformSlug]: { [featureNameAr]: 'yes'|'no'|'partial' } } for the given slugs. */
export async function getFeatureSupportMap(slugs: string[]): Promise<FeatureSupportMap> {
  const rows = await prisma.platformFeature.findMany({
    where: { platform: { slug: { in: slugs } } },
    include: { platform: { select: { slug: true } }, category: { select: { nameAr: true, slug: true } } },
    orderBy: { category: { sortOrder: 'asc' } },
  });

  const map: FeatureSupportMap = {};
  for (const slug of slugs) map[slug] = {};
  for (const row of rows) {
    map[row.platform.slug][row.featureNameAr] = row.supported as SupportLevel;
  }
  return map;
}

export interface FeatureMatrixRow {
  featureNameAr: string;
  categoryNameAr: string;
  categorySlug: string;
  supportA: SupportLevel;
  supportB: SupportLevel;
}

/** Builds the full feature comparison matrix (all categorized rows) for two platforms. */
export async function getFeatureMatrix(slugA: string, slugB: string): Promise<FeatureMatrixRow[]> {
  const rows = await prisma.platformFeature.findMany({
    where: { platform: { slug: { in: [slugA, slugB] } } },
    include: { platform: { select: { slug: true } }, category: { select: { nameAr: true, slug: true } } },
    orderBy: [{ category: { sortOrder: 'asc' } }, { featureNameAr: 'asc' }],
  });

  const byFeature = new Map<string, FeatureMatrixRow>();
  for (const row of rows) {
    const key = row.featureNameAr;
    const existing = byFeature.get(key);
    if (existing) {
      if (row.platform.slug === slugA) existing.supportA = row.supported as SupportLevel;
      if (row.platform.slug === slugB) existing.supportB = row.supported as SupportLevel;
    } else {
      byFeature.set(key, {
        featureNameAr: row.featureNameAr,
        categoryNameAr: row.category.nameAr,
        categorySlug: row.category.slug,
        supportA: row.platform.slug === slugA ? (row.supported as SupportLevel) : 'no',
        supportB: row.platform.slug === slugB ? (row.supported as SupportLevel) : 'no',
      });
    }
  }

  return Array.from(byFeature.values());
}
