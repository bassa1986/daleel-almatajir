ï»¿export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className='min-h-screen bg-gradient-to-b from-slate-900 to-slate-800'>
        <div className='container mx-auto px-4 py-20 text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¬Ø±</h1>
          <p className='text-xl text-slate-300 mb-8'>Ù…Ù†ØµØ© Ù…Ù‚Ø§Ø±Ù†Ø© Ø§Ù„Ù…ØªØ§Ø¬Ø± ÙˆØ§Ù„Ø¹Ø±ÙˆØ¶</p>
          <p className='text-lg text-slate-400'>Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø­ØªÙˆÙ‰...</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
