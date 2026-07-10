import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = { title: 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§ÙØ­Ø§ÙØ© â Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±' };

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="text-center glass p-16 max-w-lg">
          <h1 className="text-4xl font-extrabold text-white mb-4">Ø¯Ø±Ø§Ø³Ø§Øª Ø§ÙØ­Ø§ÙØ©</h1>
          <p className="text-slate-400">ÙØµØµ ÙØ¬Ø§Ø­ Ø­ÙÙÙÙØ© ÙÙ ØªØ¬Ø§Ø± ÙØ³ØªØ®Ø¯ÙÙÙ ÙØ°Ù Ø§ÙÙÙØµØ§Øª. ÙØ±ÙØ¨Ø§Ù.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
