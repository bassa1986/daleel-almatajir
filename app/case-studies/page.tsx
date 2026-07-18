import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { prisma } from '@/lib/db';

export const metadata: Metadata = { title: 'دراسات الحالة — دليل المتاجر' };
export const revalidate = 3600;

export default async function CaseStudiesPage() {
  const studies = await prisma.article.findMany({
    where: { status: 'published', category: 'دراسات الحالة' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-white mb-4">دراسات الحالة</h1>
            <p className="text-slate-400 text-xl">قصص نجاح حقيقية من تجار يستخدمون هذه المنصات</p>
          </div>

          {studies.length === 0 ? (
            <div className="glass p-16 text-center">
              <p className="text-slate-400 text-lg">لا توجد دراسات حالة بعد. قريباً!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {studies.map((study) => (
                <Link key={study.id} href={`/adilla/${study.slug}`} className="glass glass-hover p-6 block">
                  <span className="badge badge-warning text-xs mb-3 inline-block">دراسة حالة</span>
                  <h2 className="text-xl font-extrabold text-white mb-2 leading-snug">{study.titleAr}</h2>
                  {study.metaDescAr && (
                    <p className="text-slate-400 text-sm leading-relaxed">{study.metaDescAr}</p>
                  )}
                  {study.readingTimeMin && (
                    <p className="text-slate-500 text-xs mt-3">{study.readingTimeMin} دقائق للقراءة</p>
                  )}
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
