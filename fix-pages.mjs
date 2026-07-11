const fs = require('fs');
const path = require('path');

const files = {
  'app/calculator/page.tsx': `import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CalculatorApp } from '@/components/calculator/calculator-app';
import { getPlatformsForCalculator } from '@/lib/data/platforms';
export const metadata: Metadata = {
  title: 'حاسبة تكاليف منصات التجارة الإلكترونية ٢٠٢٦',
  description: 'احسب التكلفة الفعلية لمتجرك بالريال السعودي.',
};
export const revalidate = 3600;
export default async function CalculatorPage() {
  const platforms = await getPlatformsForCalculator();
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">حاسبة تكاليف المنصات</h1>
          <p className="text-slate-400 text-lg">أدخل بيانات متجرك واحصل على مقارنة دقيقة بين {platforms.length} منصات بالريال السعودي</p>
        </div>
        <Suspense fallback={<div className="max-w-5xl mx-auto"><div className="glass h-64 mb-8 animate-pulse"/></div>}>
          <CalculatorApp platforms={platforms}/>
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}`,

  'app/case-studies/page.tsx': `import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'دراسات الحالة — دليل المتاجر' };
export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="text-center glass p-16 max-w-lg">
          <h1 className="text-4xl font-extrabold text-white mb-4">دراسات الحالة</h1>
          <p className="text-slate-400">قصص نجاح حقيقية من تجار يستخدمون هذه المنصات. قريباً.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`,

  'app/muqaranat/page.tsx': `import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { getPlatformsForDisplay } from '@/lib/data/platforms';
import { StarRating } from '@/components/ui/star-rating';
export const metadata: Metadata = {
  title: 'مقارنة منصات التجارة الإلكترونية ٢٠٢٦',
  description: 'مقارنة شاملة بين سلة، زد، شوبيفاي، ووكومرس، بيغ كومرس وماجنتو.',
};
export const revalidate = 3600;
const VS_PAIRS = [
  ['salla','zid'],['salla','shopify'],['salla','woocommerce'],['zid','shopify'],['zid','woocommerce'],
  ['shopify','woocommerce'],['salla','bigcommerce'],['zid','bigcommerce'],['shopify','bigcommerce'],
  ['woocommerce','bigcommerce'],['salla','magento'],['zid','magento'],['shopify','magento'],
  ['woocommerce','magento'],['bigcommerce','magento'],
] as const;
export default async function ComparisonsPage() {
  const platforms = await getPlatformsForDisplay();
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-white mb-4">مقارنة المنصات</h1>
            <p className="text-slate-400 text-xl">اختر منصة للمراجعة الكاملة أو قارن بين منصتين</p>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-6">مراجعات المنصات</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {platforms.map((p) => (
              <Link key={p.slug} href={\`/muqaranat/\${p.slug}\`} className="glass glass-hover p-6 block">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden p-1" style={{ backgroundColor: \`\${p.brandColor}22\` }}>
                    <img src={\`/logos/\${p.slug}.png\`} alt={p.nameAr} className="w-full h-full object-contain" />
                  </div>
                  <span className={\`badge text-xs \${p.origin==='GCC'?'badge-secondary':'badge-primary'}\`}>{p.origin==='GCC'?'خليجي':'عالمي'}</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">{p.nameAr}</h3>
                <StarRating rating={p.rating} className="mb-3" />
                <div className="text-lg font-bold text-white">
                  {p.startingPriceSAR===0?<span className="text-emerald-400">مجاني</span>:<>{p.startingPriceSAR.toLocaleString('en-US')} <span className="text-sm text-slate-400">ر.س/شهر</span></>}
                </div>
              </Link>
            ))}
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-6">مقارنات مباشرة (VS)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VS_PAIRS.map(([a,b])=>{
              const pa=platforms.find(p=>p.slug===a);
              const pb=platforms.find(p=>p.slug===b);
              if(!pa||!pb)return null;
              return(
                <Link key={\`\${a}-\${b}\`} href={\`/muqaranat/\${a}-vs-\${b}\`} className="glass glass-hover flex items-center gap-3 p-4">
                  <span className="font-bold text-white text-sm flex-1">{pa.nameAr}</span>
                  <span className="badge badge-neutral text-xs font-extrabold">VS</span>
                  <span className="font-bold text-white text-sm flex-1 text-left">{pb.nameAr}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`,

  'app/adilla/page.tsx': `import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { prisma } from '@/lib/db';
export const metadata: Metadata = { title: 'الأدلة والمقالات — دليل المتاجر' };
export const revalidate = 3600;
export default async function GuidesPage() {
  const articles = await prisma.article.findMany({ where: { status: 'published' }, orderBy: { publishedAt: 'desc' }, take: 20 });
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-white mb-4">الأدلة والمقالات</h1>
            <p className="text-slate-400 text-xl">مقالات متخصصة في التجارة الإلكترونية للسوق الخليجي</p>
          </div>
          {articles.length===0?(
            <div className="glass p-16 text-center"><p className="text-slate-400 text-lg">لا توجد مقالات بعد. قريباً!</p></div>
          ):(
            <div className="grid gap-6">
              {articles.map((article)=>(
                <Link key={article.id} href={\`/adilla/\${article.slug}\`} className="glass glass-hover p-6 block">
                  <h2 className="text-xl font-extrabold text-white mb-2">{article.titleAr}</h2>
                  {article.metaDescAr&&<p className="text-slate-400 text-sm">{article.metaDescAr}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`,

  'components/home/top-comparisons.tsx': `'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const COMPARISONS = [
  { slugA: 'salla', slugB: 'zid', nameA: 'سلة', nameB: 'زد' },
  { slugA: 'salla', slugB: 'shopify', nameA: 'سلة', nameB: 'شوبيفاي' },
  { slugA: 'zid', slugB: 'shopify', nameA: 'زد', nameB: 'شوبيفاي' },
  { slugA: 'shopify', slugB: 'woocommerce', nameA: 'شوبيفاي', nameB: 'ووكومرس' },
  { slugA: 'salla', slugB: 'woocommerce', nameA: 'سلة', nameB: 'ووكومرس' },
  { slugA: 'shopify', slugB: 'bigcommerce', nameA: 'شوبيفاي', nameB: 'بيغ كومرس' },
];

export function TopComparisons() {
  return (
    <section className="py-20 px-4 bg-white/2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">أشهر المقارنات</h2>
          <p className="text-slate-400">اختر المقارنة التي تناسب احتياجاتك</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISONS.map(({ slugA, slugB, nameA, nameB }) => (
            <motion.div key={\`\${slugA}-\${slugB}\`} whileHover={{ scale: 1.02 }}>
              <Link href={\`/muqaranat/\${slugA}-vs-\${slugB}\`} className="glass glass-hover flex items-center justify-between p-5 block">
                <span className="font-bold text-white">{nameA}</span>
                <span className="badge badge-neutral text-xs font-extrabold px-3 py-1">VS</span>
                <span className="font-bold text-white">{nameB}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/muqaranat" className="text-secondary hover:underline font-semibold">عرض كل المقارنات ←</Link>
        </div>
      </div>
    </section>
  );
}`,

  'app/privacy/page.tsx': `import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'سياسة الخصوصية — دليل المتاجر' };
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-10">
          <h1 className="text-4xl font-extrabold text-white mb-6">سياسة الخصوصية</h1>
          <p className="text-slate-300 leading-relaxed">نحن نحترم خصوصيتك. لا نبيع بياناتك لأطراف ثالثة. نجمع فقط البيانات الضرورية لتشغيل الموقع وتحسين تجربتك.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`,

  'app/affiliate-disclosure/page.tsx': `import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
export const metadata: Metadata = { title: 'إفصاح التابع — دليل المتاجر' };
export default function AffiliateDisclosurePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-10">
          <h1 className="text-4xl font-extrabold text-white mb-6">إفصاح الروابط التابعة</h1>
          <p className="text-slate-300 leading-relaxed">بعض الروابط في هذا الموقع هي روابط تابعة. عند الشراء عبرها نحصل على عمولة صغيرة دون أي تكلفة إضافية عليك. هذا لا يؤثر على تقييماتنا أو ترتيب المنصات.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`,
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, { encoding: 'utf8' });
  console.log('✓ ' + filePath);
}
console.log('Done!');
