import { prisma } from '../db';

export interface ArticleCard {
  id: string;
  slug: string;
  titleAr: string;
  category: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  readingTimeMin: number;
  publishedAt: Date | null;
}

export async function getLatestArticles(limit = 3): Promise<ArticleCard[]> {
  return prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    select: {
      id: true,
      slug: true,
      titleAr: true,
      category: true,
      featuredImage: true,
      featuredImageAlt: true,
      readingTimeMin: true,
      publishedAt: true,
    },
  });
}

export async function getSiteSettings() {
  return prisma.siteSettings.findFirst();
}
