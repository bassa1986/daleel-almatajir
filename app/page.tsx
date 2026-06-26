Ã¯Â»Â¿export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className='min-h-screen bg-gradient-to-b from-slate-900 to-slate-800'>
        <div className='container mx-auto px-4 py-20 text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>Ã˜Â¯Ã™â€žÃ™Å Ã™â€ž Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂªÃ˜Â§Ã˜Â¬Ã˜Â±</h1>
          <p className='text-xl text-slate-300 mb-8'>Ã™â€¦Ã™â€ Ã˜ÂµÃ˜Â© Ã™â€¦Ã™â€šÃ˜Â§Ã˜Â±Ã™â€ Ã˜Â© Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂªÃ˜Â§Ã˜Â¬Ã˜Â± Ã™Ë†Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â±Ã™Ë†Ã˜Â¶</p>
          <p className='text-lg text-slate-400'>Ã˜Â¬Ã˜Â§Ã˜Â±Ã™Å  Ã˜ÂªÃ˜Â­Ã™â€¦Ã™Å Ã™â€ž Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â­Ã˜ÂªÃ™Ë†Ã™â€°...</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
