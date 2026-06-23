import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function AffiliatePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-8">
          <h1 className="text-3xl font-extrabold text-white mb-6">إفصاح الروابط التابعة</h1>
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>دليل المتاجر موقع مستقل تمامًا عن المنصات التي يقارنها. نحن لا ننتمي إلى أي من هذه الشركات ولا نمثلها.</p>
            <p>بعض الروابط في هذا الموقع هي روابط تابعة (Affiliate Links)، مما يعني أننا قد نحصل على عمولة صغيرة إذا اشتركت في إحدى المنصات عبر رابطنا، دون أي تكلفة إضافية عليك.</p>
            <p>هذه العمولات تساعدنا في الحفاظ على الموقع ومواصلة نشر محتوى مستقل وموضوعي. ولا تؤثر بأي شكل على تقييماتنا أو ترتيب المنصات في مقارناتنا.</p>
            <p>جميع مقارناتنا وتقييماتنا تستند إلى بيانات حقيقية وتجارب فعلية وأسعار رسمية من المنصات ذاتها.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
