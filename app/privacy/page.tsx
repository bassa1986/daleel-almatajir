import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'سياسة الخصوصية — دليل المتاجر' };
export default function PrivacyPage() {
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4"><div className="max-w-3xl mx-auto glass p-10"><h1 className="text-4xl font-extrabold text-white mb-6">سياسة الخصوصية</h1><p className="text-slate-300 leading-relaxed">نحن نحترم خصوصيتك. لا نبيع بياناتك لأطراف ثالثة. نجمع فقط البيانات الضرورية لتشغيل الموقع وتحسين تجربتك.</p></div></main><SiteFooter/></>);
}
