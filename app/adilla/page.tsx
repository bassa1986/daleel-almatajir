import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { prisma } from '@/lib/db';
export const metadata: Metadata = { title: 'Ø§ÙØ£Ø¯ÙØ© ÙØ§ÙÙÙØ§ÙØ§Øª â Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±', description: 'Ø£Ø¯ÙØ© Ø´Ø§ÙÙØ© ÙÙÙØ§ÙØ§Øª ÙØªØ®ØµØµØ© ÙÙ Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ©.' };
export const revalidate = 3600;
export default async function GuidesPage() {
  const articles = await prisma.article.findMany({ where: { status: 'published' }, orderBy: { publishedAt: 'desc' }, take: 20 });
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4"><div className="max-w-4xl mx-auto">
    <div className="text-center mb-14"><h1 className="text-5xl font-extrabold text-white mb-4">Ø§ÙØ£Ø¯ÙØ© ÙØ§ÙÙÙØ§ÙØ§Øª</h1><p className="text-slate-400 text-xl">ÙÙØ§ÙØ§Øª ÙØªØ®ØµØµØ© ÙÙ Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© ÙÙØ³ÙÙ Ø§ÙØ®ÙÙØ¬Ù</p></div>
    {articles.length===0?(<div className="glass p-16 text-center"><p className="text-slate-400 text-lg">ÙØ§ ØªÙØ¬Ø¯ ÙÙØ§ÙØ§Øª Ø¨Ø¹Ø¯. ÙØ±ÙØ¨Ø§Ù!</p></div>):(<div className="grid gap-6">{articles.map((article)=>(<Link key={article.id} href={`/adilla/${article.slug}`} className="glass glass-hover p-6 block"><h2 className="text-xl font-extrabold text-white mb-2">{article.titleAr}</h2>{article.metaDescAr&&<p className="text-slate-400 text-sm">{article.metaDescAr}</p>}</Link>))}</div>)}
  </div></main><SiteFooter/></>);
}