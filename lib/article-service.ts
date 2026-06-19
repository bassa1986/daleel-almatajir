import { prisma } from '@/lib/prisma';

export async function getArticles() {
  try {
    return await prisma.article.findMany({
      select: { id: true, title: true, slug: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.warn('Could not fetch articles during build:', error);
    return []; // Return empty array during build
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    return await prisma.article.findUnique({ where: { slug } });
  } catch (error) {
    console.warn('Could not fetch article during build:', error);
    return null;
  }
}
