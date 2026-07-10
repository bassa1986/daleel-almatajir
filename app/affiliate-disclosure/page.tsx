import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'Ø¥ÙØµØ§Ø­ Ø§ÙØªØ§Ø¨Ø¹ â Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±' };
export default function AffiliateDisclosurePage() {
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4"><div className="max-w-3xl mx-auto glass p-10"><h1 className="text-4xl font-extrabold text-white mb-6">Ø¥ÙØµØ§Ø­ Ø§ÙØ±ÙØ§Ø¨Ø· Ø§ÙØªØ§Ø¨Ø¹Ø©</h1><p className="text-slate-300 leading-relaxed">Ø¨Ø¹Ø¶ Ø§ÙØ±ÙØ§Ø¨Ø· ÙÙ ÙØ°Ø§ Ø§ÙÙÙÙØ¹ ÙÙ Ø±ÙØ§Ø¨Ø· ØªØ§Ø¨Ø¹Ø© (Affiliate Links). Ø¹ÙØ¯ Ø§ÙØ´Ø±Ø§Ø¡ Ø¹Ø¨Ø±ÙØ§ ÙØ­ØµÙ Ø¹ÙÙ Ø¹ÙÙÙØ© ØµØºÙØ±Ø© Ø¯ÙÙ Ø£Ù ØªÙÙÙØ© Ø¥Ø¶Ø§ÙÙØ© Ø¹ÙÙÙ. ÙØ°Ø§ ÙØ§ ÙØ¤Ø«Ø± Ø¹ÙÙ ØªÙÙÙÙØ§ØªÙØ§ Ø£Ù ØªØ±ØªÙØ¨ Ø§ÙÙÙØµØ§Øª.</p></div></main><SiteFooter/></>);
}
