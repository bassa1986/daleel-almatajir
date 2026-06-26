import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const USD_TO_SAR = 3.75;

interface ManualTier {
  name: string;
  nameAr: string;
  monthlyFeeSAR: number;
  transactionFeePct?: number;
  notes?: string;
}

interface ManualPlatformUpdate {
  slug: string;
  commissionInfo: string;
  pros: string[];
  cons: string[];
  tiers: ManualTier[];
}

const updates: ManualPlatformUpdate[] = [
  {
    slug: 'salla',
    commissionInfo: '0% رسوم على المعاملات عبر بوابات الدفع المحلية — رسوم بوابة الدفع القياسية تُطبَّق من مزود الدفع نفسه.',
    pros: ['دعم محلي ممتاز وسرعة في الإطلاق لمتاجر دول الخليج', 'تكامل مباشر مع مدى و STC Pay'],
    cons: ['تخصيصات التصميم المرئي محدودة خارج العناصر الجاهزة'],
    tiers: [
      { name: 'Basic', nameAr: 'الأساسية', monthlyFeeSAR: 0 },
      { name: 'Plus', nameAr: 'بلس', monthlyFeeSAR: 99 },
      { name: 'Pro', nameAr: 'برو', monthlyFeeSAR: 299 },
    ],
  },
  {
    slug: 'zid',
    commissionInfo: '0% عمولة مباشرة على الاشتراكات الأساسية — تسويات الدفع تمر عبر زد باي (Zid Pay).',
    pros: ['تعرض طبيعي عبر سوق مزيد (Mazeed Marketplace)', 'دعم قوي للمتاجر متعددة الفروع B2B'],
    cons: ['التخصيص المتقدم يتطلب منحنى تعلم تقني', 'كتالوج الإضافات من طرف ثالث أصغر مقارنة بالمنافسين'],
    tiers: [
      { name: 'Starter', nameAr: 'البداية', monthlyFeeSAR: 0 },
      { name: 'Rise', nameAr: 'النمو', monthlyFeeSAR: 99 },
      { name: 'Growth', nameAr: 'التوسع', monthlyFeeSAR: 299 },
    ],
  },
  {
    slug: 'shopify',
    commissionInfo: 'رسوم Shopify Payments من 2.4% إلى 2.9% + 30 سنت لكل عملية — معالجات الدفع الخارجية تضيف رسوم إضافية من 0.6% إلى 2.0%.',
    pros: ['يتوسع بسلاسة مع نمو المتجر', 'مكتبة قوالب تصميم واسعة جداً'],
    cons: ['الاعتماد الكبير على التطبيقات المدفوعة يرفع التكلفة الشهرية الخفية'],
    tiers: [
      { name: 'Basic', nameAr: 'الأساسية', monthlyFeeSAR: Math.round(39 * USD_TO_SAR), transactionFeePct: 2.9, notes: 'Converted from $39 USD/month at 3.75 SAR/USD.' },
      { name: 'Grow', nameAr: 'النمو', monthlyFeeSAR: Math.round(105 * USD_TO_SAR), transactionFeePct: 2.7, notes: 'Converted from $105 USD/month at 3.75 SAR/USD.' },
      { name: 'Advanced', nameAr: 'المتقدمة', monthlyFeeSAR: Math.round(399 * USD_TO_SAR), transactionFeePct: 2.5, notes: 'Converted from $399 USD/month at 3.75 SAR/USD.' },
    ],
  },
  {
    slug: 'woocommerce',
    commissionInfo: '0% رسوم منصة — بوابات الدفع القياسية تفرض ما يقارب 2.9% + 30 سنت لكل عملية.',
    pros: ['حرية كاملة في التحكم بالكود المصدري والبيانات', 'مجتمع مطورين عالمي ضخم وآلاف الإضافات الجاهزة'],
    cons: ['يتطلب صيانة يدوية مستمرة وتحديثات أمنية ومتابعة تقنية'],
    tiers: [
      { name: 'Core Engine', nameAr: 'النواة المجانية', monthlyFeeSAR: 0 },
    ],
  },
  {
    slug: 'bigcommerce',
    commissionInfo: '0% رسوم تجاوز ضمن الحدود القياسية — بوابات الدفع غير المدمجة تفرض من 0.6% إلى 2.0%.',
    pros: ['لا توجد عمولة من المنصة على بوابات الدفع المدمجة'],
    cons: ['حدود مبيعات سنوية صارمة تجبر على الترقية التلقائية للباقة الأعلى'],
    tiers: [
      { name: 'Core', nameAr: 'الأساسية', monthlyFeeSAR: Math.round(39 * USD_TO_SAR), notes: 'Converted from $39 USD/month at 3.75 SAR/USD.' },
      { name: 'Growth', nameAr: 'النمو', monthlyFeeSAR: Math.round(105 * USD_TO_SAR), notes: 'Converted from $105 USD/month at 3.75 SAR/USD.' },
      { name: 'Scale', nameAr: 'التوسع', monthlyFeeSAR: Math.round(399 * USD_TO_SAR), notes: 'Converted from $399 USD/month at 3.75 SAR/USD.' },
    ],
  },
  {
    slug: 'magento',
    commissionInfo: '0% رسوم منصة على النسخة مفتوحة المصدر — تطبق قواعد عقود معالج الدفع عالي الحجم على نسخة Adobe Commerce.',
    pros: ['حرية تصميم كاملة للشركات متعددة الملايين'],
    cons: ['يتطلب بنية تحتية ضخمة وفريق هندسي مخصص'],
    tiers: [
      { name: 'Open-Source', nameAr: 'مفتوحة المصدر', monthlyFeeSAR: 0 },
    ],
  },
];

async function main() {
  console.log('\n=== Manual Pricing & Commission Update ===\n');

  for (const update of updates) {
    const platform = await prisma.platform.findUnique({ where: { slug: update.slug } });
    if (!platform) {
      console.warn(`Platform "${update.slug}" not found - skipping. Run npm run db:seed first.`);
      continue;
    }

    await prisma.$transaction(async (tx) => {
      await tx.platform.update({
        where: { id: platform.id },
        data: { commissionInfo: update.commissionInfo },
      });

      await tx.pricingTier.deleteMany({ where: { platformId: platform.id } });
      await tx.pricingTier.createMany({
        data: update.tiers.map((tier, index) => ({
          platformId: platform.id,
          name: tier.name,
          nameAr: tier.nameAr,
          minRevenueSAR: 0,
          monthlyFeeSAR: tier.monthlyFeeSAR,
          transactionFeePct: tier.transactionFeePct ?? 0,
          sortOrder: index,
        })),
      });

      await tx.platformPro.deleteMany({ where: { platformId: platform.id } });
      await tx.platformPro.createMany({
        data: update.pros.map((text, index) => ({
          platformId: platform.id,
          textAr: text,
          sortOrder: index,
        })),
      });

      await tx.platformCon.deleteMany({ where: { platformId: platform.id } });
      await tx.platformCon.createMany({
        data: update.cons.map((text, index) => ({
          platformId: platform.id,
          textAr: text,
          sortOrder: index,
        })),
      });
    });

    console.log(`Updated "${update.slug}": ${update.tiers.length} tier(s), ${update.pros.length} pro(s), ${update.cons.length} con(s)`);
  }

  console.log('\nDone. Refresh your browser to see the updated data.\n');
}

main()
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
