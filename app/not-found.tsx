import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl font-extrabold text-white/10 mb-4">٤٠٤</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">الصفحة غير موجودة</h1>
          <p className="text-slate-400 mb-8">
            الصفحة التي تبحث عنها غير متاحة أو تم نقلها.
          </p>
          <Link href="/" className="btn-primary px-8 py-3">
            العودة للرئيسية
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
