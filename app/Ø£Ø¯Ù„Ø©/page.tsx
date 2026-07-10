import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, BookOpen } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Ø£Ø¯ÙØ© ÙÙÙØ§ÙØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ©',
  description: 'Ø£Ø­Ø¯Ø« ÙÙØ§ÙØ§Øª ÙØ£Ø¯ÙØ© ÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© Ø¨Ø§ÙØ¹Ø±Ø¨ÙØ©.',
};

export const revalidate = 3600;

const CATEGORY_COLORS: Record<string, string> = {
  ÙÙØ§Ø±ÙØ§Øª: 'badge-primary',
  ÙØ±Ø§Ø¬Ø¹Ø§Øª: 'badge-secondary',
  Ø£Ø¯ÙØ©: 'badge-success',
  'Ø¯Ø±Ø§Ø³Ø§Øª Ø§ÙØ­Ø§ÙØ©': 'badge-warning',
  Ø£Ø®Ø¨Ø§Ø±: 'badge-neutral',
};

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    select: { id: true, slug: true, titleAr: true, category: true, featuredImage: true, featuredImageAlt: true, readingTimeMin: true, publishedAt: true },
  });

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-white mb-4">Ø§ÙØ£Ø¯ÙØ© ÙØ§ÙÙÙØ§ÙØ§Øª</h1>
            <p className="text-slate-400 text-xl">ÙÙØ§ÙØ§Øª ÙØ­Ø¯ÙØ«Ø© ÙÙØ³Ø§Ø¹Ø¯ØªÙ ÙÙ Ø§Ø®ØªÙØ§Ø± Ø§ÙÙÙØµØ© Ø§ÙÙÙØ§Ø³Ø¨Ø©</p>
          </div>

          {articles.length === 0 ? (
            <div className="glass p-16 text-center">
              <BookOpen size={48} className="text-white/10 mx-auto mb-4" />
              <p className="text-slate-400">ÙØ§ ØªÙØ¬Ø¯ ÙÙØ§ÙØ§Øª ÙÙØ´ÙØ±Ø© Ø¨Ø¹Ø¯. ØªØ±ÙÙØ¨ Ø§ÙÙØ­ØªÙÙ Ø§ÙÙØ§Ø¯Ù!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link key={article.id} href={`/Ø£Ø¯ÙØ©/${article.slug}`} className="glass glass-hover flex flex-col group">
                  <div className="h-44 bg-surface-raised rounded-t-[calc(var(--radius-panel)-1px)] flex items-center justify-center relative overflow-hidden">
                    {article.featuredImage
                      ? <img src={article.featuredImage} alt={article.featuredImageAlt ?? ''} className="w-full h-full object-cover" />
                      : <BookOpen size={40} className="text-white/10" />}
                    <div className="absolute top-3 right-3">
                      <span className={`badge text-xs ${CATEGORY_COLORS[article.category] ?? 'badge-neutral'}`}>{article.category}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary">{article.titleAr}</h2>
                    <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={12} />{article.readingTimeMin} Ø¯ÙØ§Ø¦Ù</span>
                      {article.publishedAt && <span>{new Intl.DateTimeFormat('ar-SA',{year:'numeric',month:'short',day:'numeric'}).format(new Date(article.publishedAt))}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
