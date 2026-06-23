import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'إفصاح التابع — دليل المتاجر' };
export default function AffiliateDisclosurePage() {
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4"><div className="max-w-3xl mx-auto glass p-10"><h1 className="text-4xl font-extrabold text-white mb-6">إفصاح الروابط التابعة</h1><p className="text-slate-300 leading-relaxed">بعض الروابط في هذا الموقع هي روابط تابعة (Affiliate Links). عند الشراء عبرها نحصل على عمولة صغيرة دون أي تكلفة إضافية عليك. هذا لا يؤثر على تقييماتنا أو ترتيب المنصات.</p></div></main><SiteFooter/></>);
}
