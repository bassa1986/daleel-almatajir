import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

const BASE_URL = 'https://daleel-almatajir.com';

const VS_PAIRS = [
  ['salla','zid'],['salla','shopify'],['salla','woocommerce'],['salla','bigcommerce'],['salla','magento'],
  ['zid','shopify'],['zid','woocommerce'],['zid','bigcommerce'],['zid','magento'],
  ['shopify','woocommerce'],['shopify','bigcommerce'],['shopify','magento'],
  ['woocommerce','bigcommerce'],['woocommerce','magento'],['bigcommerce','magento'],
] as const;

export const revalidate = 86400; // 24h

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [platforms, articles] = await Promise.all([
    prisma.platform.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/حاسبة-التكاليف`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/مقارنات`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/أدلة`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE_URL}/دراسات-الحالة`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
  ];

  const vsRoutes: MetadataRoute.Sitemap = VS_PAIRS.map(([a, b]) => ({
    url: `${BASE_URL}/مقارنات/${a}-vs-${b}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.88,
  }));

  const platformRoutes: MetadataRoute.Sitemap = platforms.map((p) => ({
    url: `${BASE_URL}/مقارنات/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/أدلة/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.80,
  }));

  return [...staticRoutes, ...vsRoutes, ...platformRoutes, ...articleRoutes];
}
