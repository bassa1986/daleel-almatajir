import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'دراسات الحالة — دليل المتاجر' };
export default function CaseStudiesPage() {
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center"><div className="text-center glass p-16 max-w-lg"><h1 className="text-4xl font-extrabold text-white mb-4">دراسات الحالة</h1><p className="text-slate-400">قصص نجاح حقيقية من تجار يستخدمون هذه المنصات. قريباً.</p></div></main><SiteFooter/></>);
}
