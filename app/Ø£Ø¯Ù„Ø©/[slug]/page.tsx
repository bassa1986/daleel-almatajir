import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { prisma } from '@/lib/db';
import { autoLinkArticleHtml } from '@/lib/utils/auto-link';

export const revalidate = 3600;

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ where: { status: 'published' }, select: { slug: true } });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await prisma.article.findUnique({ where: { slug } });
  if (!a) return {};
  return { title: a.metaTitleAr ?? a.titleAr, description: a.metaDescAr ?? undefined };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || article.status !== 'published') notFound();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Ø§ÙØ±Ø¦ÙØ³ÙØ©</Link>
            <span>/</span>
            <Link href="/Ø£Ø¯ÙØ©" className="hover:text-white transition-colors">Ø§ÙØ£Ø¯ÙØ©</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{article.titleAr}</span>
          </nav>

          <span className="badge badge-primary text-sm mb-4 inline-block">{article.category}</span>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-snug">{article.titleAr}</h1>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
            <span className="flex items-center gap-1"><Clock size={13} />{article.readingTimeMin} Ø¯ÙØ§Ø¦Ù ÙÙÙØ±Ø§Ø¡Ø©</span>
            <span>{article.authorName}</span>
            {article.publishedAt && (
              <span>{new Intl.DateTimeFormat('ar-SA',{year:'numeric',month:'long',day:'numeric'}).format(new Date(article.publishedAt))}</span>
            )}
          </div>

          {article.featuredImage && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={article.featuredImage} alt={article.featuredImageAlt ?? ''} className="w-full h-72 object-cover" />
            </div>
          )}

          {/* Article body */}
          <div
            className="prose prose-invert prose-slate max-w-none
              prose-headings:font-extrabold prose-headings:text-white
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-li:text-slate-300"
            dangerouslySetInnerHTML={{ __html: autoLinkArticleHtml(article.bodyHtml) }}
          />

          <div className="mt-12 pt-8 border-t border-white/8">
            <Link href="/Ø£Ø¯ÙØ©" className="flex items-center gap-2 text-primary font-semibold text-sm">
              <ArrowRight size={15} />
              Ø§ÙØ¹ÙØ¯Ø© Ø¥ÙÙ Ø¬ÙÙØ¹ Ø§ÙÙÙØ§ÙØ§Øª
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
