import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ArticleForm } from '@/components/admin/article-form';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-6">Edit Article</h1>
      <ArticleForm
        article={{
          id: article.id,
          slug: article.slug,
          titleAr: article.titleAr,
          bodyHtml: article.bodyHtml,
          category: article.category,
          status: article.status,
          featuredImage: article.featuredImage,
          featuredImageAlt: article.featuredImageAlt,
          tags: article.tags,
          metaTitleAr: article.metaTitleAr,
          metaDescAr: article.metaDescAr,
          readingTimeMin: article.readingTimeMin,
        }}
      />
    </div>
  );
}
