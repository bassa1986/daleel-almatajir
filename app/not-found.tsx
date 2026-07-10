import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl font-extrabold text-white/10 mb-4">Ù¤Ù Ù¤</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Ø§ÙØµÙØ­Ø© ØºÙØ± ÙÙØ¬ÙØ¯Ø©</h1>
          <p className="text-slate-400 mb-8">
            Ø§ÙØµÙØ­Ø© Ø§ÙØªÙ ØªØ¨Ø­Ø« Ø¹ÙÙØ§ ØºÙØ± ÙØªØ§Ø­Ø© Ø£Ù ØªÙ ÙÙÙÙØ§.
          </p>
          <Link href="/" className="btn-primary px-8 py-3">
            Ø§ÙØ¹ÙØ¯Ø© ÙÙØ±Ø¦ÙØ³ÙØ©
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
