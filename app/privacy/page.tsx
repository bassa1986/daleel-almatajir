import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'Ø³ÙØ§Ø³Ø© Ø§ÙØ®ØµÙØµÙØ© â Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±' };
export default function PrivacyPage() {
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4"><div className="max-w-3xl mx-auto glass p-10"><h1 className="text-4xl font-extrabold text-white mb-6">Ø³ÙØ§Ø³Ø© Ø§ÙØ®ØµÙØµÙØ©</h1><p className="text-slate-300 leading-relaxed">ÙØ­Ù ÙØ­ØªØ±Ù Ø®ØµÙØµÙØªÙ. ÙØ§ ÙØ¨ÙØ¹ Ø¨ÙØ§ÙØ§ØªÙ ÙØ£Ø·Ø±Ø§Ù Ø«Ø§ÙØ«Ø©. ÙØ¬ÙØ¹ ÙÙØ· Ø§ÙØ¨ÙØ§ÙØ§Øª Ø§ÙØ¶Ø±ÙØ±ÙØ© ÙØªØ´ØºÙÙ Ø§ÙÙÙÙØ¹ ÙØªØ­Ø³ÙÙ ØªØ¬Ø±Ø¨ØªÙ.</p></div></main><SiteFooter/></>);
}
