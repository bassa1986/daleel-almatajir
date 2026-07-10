import type { PlatformFullRelations } from '@/lib/data/platforms';
import type { Scorecard } from '@/lib/data/scorecard';

interface Props {
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
  scorecard: Scorecard;
}

const CATEGORY_INSIGHTS: Record<string, (winnerName: string) => string> = {
  'arabic-support': (w) => `${w} يقدم دعماً أعلى للغة العربية وتجربة واجهة مصممة خصيصاً للسوق الخليجي.`,
  'payment-gateways': (w) => `${w} يدعم عدداً أكبر من بوابات الدفع المحلية الشائعة في السعودية والخليج، مثل مدى وSTC Pay.`,
  'التوسع الدولي': (w) => `${w} أكثر ملاءمة للتوسع في أسواق خارج المنطقة العربية بفضل مرونته وتوافقه مع شبكات الشحن والدفع الدولية.`,
  'التخصيص': (w) => `${w} يمنح التاجر حرية أكبر في تخصيص التصميم والوظائف حسب حاجة المتجر.`,
  'سهولة الاستخدام': (w) => `${w} أسهل في الإعداد والاستخدام اليومي، خصوصاً لمن لا يملك خبرة تقنية متعلقة.`,
  'التسويق': (w) => `${w} يوفر أدوات تسويق وتحليل أكثر تطوراً بشكل مباشر من المنصة.`,
  'الدعم الفني': (w) => `${w} يوفر دعماً فنياً أسرع وأكثر اعتمادية وثقة لدى تجارب التجار.`,
};

export function CategoryDeepDives({ platformA, platformB, scorecard }: Props) {
  const winnerName = scorecard.winner === 'A' ? platformA.nameAr
    : scorecard.winner === 'B' ? platformB.nameAr
    : null;

  if (!winnerName) return null;

  return (
    <section id="التفصيل" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">تحليل تفصيلي بالفئات</h2>
      <div className="space-y-4">
        {Object.entries(CATEGORY_INSIGHTS).map(([key, getInsight]) => (
          <div key={key} className="glass p-5">
            <h3 className="font-bold text-white mb-2">{key}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{getInsight(winnerName)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}