export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className='min-h-screen bg-gradient-to-b from-slate-900 to-slate-800'>
        <div className='container mx-auto px-4 py-20 text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>دليل المتاجر</h1>
          <p className='text-xl text-slate-300 mb-8'>منصة مقارنة المتاجر والعروض</p>
          <p className='text-lg text-slate-400'>جاري تحميل المحتوى...</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
