'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../db';

export interface ArticleFormInput {
  slug: string;
  titleAr: string;
  bodyHtml: string;
  category: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  featuredImageAlt?: string;
  tags: string[];
  metaTitleAr?: string;
  metaDescAr?: string;
  readingTimeMin: number;
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  // Arabic reading speed is roughly 180-200 wpm; round up to nearest minute, min 1.
  return Math.max(1, Math.ceil(words / 180));
}

export async function createArticle(input: ArticleFormInput) {
  const readingTimeMin = input.readingTimeMin || estimateReadingTime(input.bodyHtml);

  const article = await prisma.article.create({
    data: {
      slug: input.slug,
      titleAr: input.titleAr,
      bodyHtml: input.bodyHtml,
      category: input.category,
      status: input.status,
      featuredImage: input.featuredImage || null,
      featuredImageAlt: input.featuredImageAlt || null,
      tags: input.tags,
      metaTitleAr: input.metaTitleAr || null,
      metaDescAr: input.metaDescAr || null,
      readingTimeMin,
      publishedAt: input.status === 'published' ? new Date() : null,
    },
  });

  revalidatePath('/admin/articles');
  revalidatePath('/Ø£Ø¯ÙØ©');
  redirect(`/admin/articles/${article.id}`);
}

export async function updateArticle(id: string, input: ArticleFormInput) {
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) throw new Error('Article not found');

  const readingTimeMin = input.readingTimeMin || estimateReadingTime(input.bodyHtml);
  const wasPublished = existing.status === 'published';
  const willBePublished = input.status === 'published';

  await prisma.article.update({
    where: { id },
    data: {
      slug: input.slug,
      titleAr: input.titleAr,
      bodyHtml: input.bodyHtml,
      category: input.category,
      status: input.status,
      featuredImage: input.featuredImage || null,
      featuredImageAlt: input.featuredImageAlt || null,
      tags: input.tags,
      metaTitleAr: input.metaTitleAr || null,
      metaDescAr: input.metaDescAr || null,
      readingTimeMin,
      // Only stamp publishedAt the first time an article goes live.
      publishedAt: !wasPublished && willBePublished ? new Date() : existing.publishedAt,
    },
  });

  revalidatePath('/admin/articles');
  revalidatePath('/Ø£Ø¯ÙØ©');
  revalidatePath(`/Ø£Ø¯ÙØ©/${input.slug}`);
}

export async function deleteArticle(id: string) {
  const article = await prisma.article.delete({ where: { id } });
  revalidatePath('/admin/articles');
  revalidatePath('/Ø£Ø¯ÙØ©');
  return article;
}
