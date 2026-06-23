import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CalculatorApp } from '@/components/calculator/calculator-app';
import { getPlatformsForCalculator } from '@/lib/data/platforms';
export const metadata: Metadata = { title: 'حاسبة تكاليف منصات التجارة الإلكترونية ٢٠٢٦', description: 'احسب التكلفة الفعلية لمتجرك بالريال السعودي.' };
export const revalidate = 3600;
export default async function CalculatorPage() {
  const platforms = await getPlatformsForCalculator();
  return (<><SiteHeader/><main className="min-h-screen pt-28 pb-20 px-4">
    <div className="text-center mb-10 max-w-3xl mx-auto"><h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">حاسبة تكاليف المنصات</h1><p className="text-slate-400 text-lg">أدخل بيانات متجرك واحصل على مقارنة دقيقة بين {platforms.length} منصات بالريال السعودي</p></div>
    <Suspense fallback={<div className="max-w-5xl mx-auto"><div className="glass h-64 mb-8 animate-pulse"/></div>}><CalculatorApp platforms={platforms}/></Suspense>
  </main><SiteFooter/></>);
}
