import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { prisma } from '@/lib/db';
interface Props { params: Promise<{ slug: string }> }
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || article.status !== 'published') notFound();
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4"><div className="max-w-3xl mx-auto">
    <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2"><Link href="/" className="hover:text-white">الرئيسية</Link><span>/</span><Link href="/adilla" className="hover:text-white">الأدلة</Link><span>/</span><span className="text-white">{article.titleAr}</span></nav>
    <h1 className="text-4xl font-extrabold text-white mb-6">{article.titleAr}</h1>
    <div className="glass p-8 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.bodyHtml }}/>
  </div></main><SiteFooter/></>);
}