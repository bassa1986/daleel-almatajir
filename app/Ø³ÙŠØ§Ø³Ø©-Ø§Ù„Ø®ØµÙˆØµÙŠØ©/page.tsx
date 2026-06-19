export const dynamic = 'force-dynamic'
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-8">
          <h1 className="text-3xl font-extrabold text-white mb-6">سياسة الخصوصية</h1>
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>نحن في دليل المتاجر نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
            <h2 className="text-white font-bold text-lg">البيانات التي نجمعها</h2>
            <p>نجمع فقط عنوان البريد الإلكتروني عند اشتراكك في النشرة الإخبارية، ولا نشارك هذه البيانات مع أطراف ثالثة.</p>
            <h2 className="text-white font-bold text-lg">ملفات تعريف الارتباط</h2>
            <p>نستخدم ملفات تعريف الارتباط الأساسية لتحسين تجربة الاستخدام وتحليل حركة الزوار بشكل مجهول.</p>
            <h2 className="text-white font-bold text-lg">التواصل معنا</h2>
            <p>لأي استفسارات تتعلق بالخصوصية، تواصل معنا على: info@daleel-almatajir.com</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
