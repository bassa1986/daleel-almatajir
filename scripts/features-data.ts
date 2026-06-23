import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const categories = [
  { slug: "language-region", nameAr: "اللغة والمنطقة", sortOrder: 1 },
  { slug: "gulf-payments", nameAr: "بوابات الدفع الخليجية", sortOrder: 2 },
  { slug: "shipping-logistics", nameAr: "الشحن واللوجستيات", sortOrder: 3 },
  { slug: "marketing-analytics", nameAr: "التسويق والتحليل", sortOrder: 4 },
  { slug: "multichannel-sales", nameAr: "المبيعات متعددة القنوات", sortOrder: 5 },
  { slug: "tech-performance", nameAr: "التقنية والأداء", sortOrder: 6 },
  { slug: "technical-support", nameAr: "الدعم الفني", sortOrder: 7 },
];

const features: Record<string, Record<string, { supported: string; noteAr?: string }>> = {
  "واجهة عربية كاملة": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "partial", noteAr: "تتطلب إعداداً يدوياً" },
    woocommerce: { supported: "partial", noteAr: "عبر إضافات خارجية" },
    bigcommerce: { supported: "partial", noteAr: "دعم جزئي" },
    magento: { supported: "partial", noteAr: "تتطلب تخصيصاً تقنياً" },
  },
  "دعم عربي 24/7": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "no", noteAr: "دعم بالإنجليزية فقط" },
    woocommerce: { supported: "no", noteAr: "مجتمع مطورين فقط" },
    bigcommerce: { supported: "no", noteAr: "دعم بالإنجليزية فقط" },
    magento: { supported: "no", noteAr: "دعم تقني مدفوع فقط" },
  },
  "العملة السعودية (ر.س)": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "yes" },
    bigcommerce: { supported: "yes" }, magento: { supported: "yes" },
  },
  "مدى (Mada)": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "partial", noteAr: "عبر بوابات خارجية كـ Tap" },
    woocommerce: { supported: "partial", noteAr: "عبر إضافات خارجية" },
    bigcommerce: { supported: "partial", noteAr: "عبر بوابات خارجية" },
    magento: { supported: "partial", noteAr: "عبر إضافات مخصصة" },
  },
  "Apple Pay": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "عبر إضافات" },
    bigcommerce: { supported: "yes" }, magento: { supported: "partial", noteAr: "عبر إضافات" },
  },
  "STC Pay": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "partial", noteAr: "عبر بوابات خارجية" },
    woocommerce: { supported: "partial", noteAr: "عبر إضافات خارجية" },
    bigcommerce: { supported: "partial", noteAr: "عبر بوابات خارجية" },
    magento: { supported: "partial", noteAr: "عبر إضافات مخصصة" },
  },
  "تاب للمدفوعات": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "yes" },
    bigcommerce: { supported: "yes" }, magento: { supported: "yes" },
  },
  "تكامل شركات الشحن السعودية": {
    salla: { supported: "yes", noteAr: "أرامكس، SMSA، DHL وغيرها بضغطة زر" },
    zid: { supported: "yes", noteAr: "عبر زد شيب" },
    shopify: { supported: "partial", noteAr: "تتطلب إعداداً يدوياً" },
    woocommerce: { supported: "partial", noteAr: "عبر إضافات خارجية" },
    bigcommerce: { supported: "partial", noteAr: "عبر تكاملات API" },
    magento: { supported: "partial", noteAr: "تتطلب تطوير مخصص" },
  },
  "طباعة بوليصة الشحن": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "عبر إضافات" },
    bigcommerce: { supported: "partial", noteAr: "عبر تطبيقات" }, magento: { supported: "partial", noteAr: "عبر إضافات" },
  },
  "التسويق عبر البريد الإلكتروني": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "عبر إضافات" },
    bigcommerce: { supported: "yes" }, magento: { supported: "partial", noteAr: "عبر إضافات" },
  },
  "استعادة السلال المتروكة": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "عبر إضافات مدفوعة" },
    bigcommerce: { supported: "yes", noteAr: "مدمج في جميع الباقات" },
    magento: { supported: "yes" },
  },
  "تقارير وتحليلات متقدمة": {
    salla: { supported: "partial", noteAr: "تقارير أساسية" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "عبر إضافات" },
    bigcommerce: { supported: "yes" }, magento: { supported: "yes" },
  },
  "البيع على سوشيال ميديا": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "عبر إضافات" },
    bigcommerce: { supported: "yes" }, magento: { supported: "partial", noteAr: "عبر إضافات" },
  },
  "تطبيق جوال للتاجر": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "عبر تطبيقات ثالثة" },
    bigcommerce: { supported: "yes" }, magento: { supported: "partial", noteAr: "عبر تطبيقات مخصصة" },
  },
  "شهادة SSL مجانية": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes" }, woocommerce: { supported: "partial", noteAr: "تعتمد على مزود الاستضافة" },
    bigcommerce: { supported: "yes" }, magento: { supported: "partial", noteAr: "تعتمد على الاستضافة" },
  },
  "دعم فني على مدار الساعة": {
    salla: { supported: "yes" }, zid: { supported: "yes" },
    shopify: { supported: "yes", noteAr: "بالإنجليزية" },
    woocommerce: { supported: "no", noteAr: "مجتمع مفتوح فقط" },
    bigcommerce: { supported: "yes", noteAr: "بالإنجليزية" },
    magento: { supported: "partial", noteAr: "مدفوع للمؤسسات" },
  },
};

const categoryForFeature: Record<string, string> = {
  "واجهة عربية كاملة": "language-region",
  "دعم عربي 24/7": "language-region",
  "العملة السعودية (ر.س)": "language-region",
  "مدى (Mada)": "gulf-payments",
  "Apple Pay": "gulf-payments",
  "STC Pay": "gulf-payments",
  "تاب للمدفوعات": "gulf-payments",
  "تكامل شركات الشحن السعودية": "shipping-logistics",
  "طباعة بوليصة الشحن": "shipping-logistics",
  "التسويق عبر البريد الإلكتروني": "marketing-analytics",
  "استعادة السلال المتروكة": "marketing-analytics",
  "تقارير وتحليلات متقدمة": "marketing-analytics",
  "البيع على سوشيال ميديا": "multichannel-sales",
  "تطبيق جوال للتاجر": "tech-performance",
  "شهادة SSL مجانية": "tech-performance",
  "دعم فني على مدار الساعة": "technical-support",
};

async function main() {
  console.log("\n=== Adding Platform Features ===\n");

  // Upsert categories
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const c = await prisma.featureCategory.upsert({
      where: { slug: cat.slug },
      update: { nameAr: cat.nameAr, sortOrder: cat.sortOrder },
      create: cat,
    });
    categoryMap[cat.slug] = c.id;
  }
  console.log(`✓ ${categories.length} categories ready`);

  // Get all platforms
  const platforms = await prisma.platform.findMany();
  const platformMap = Object.fromEntries(platforms.map(p => [p.slug, p.id]));

  // Clear existing features
  await prisma.platformFeature.deleteMany({});
  console.log("✓ Cleared old features");

  // Insert features
  let count = 0;
  for (const [featureName, platformData] of Object.entries(features)) {
    const categorySlug = categoryForFeature[featureName];
    const categoryId = categoryMap[categorySlug];
    if (!categoryId) continue;

    for (const [platformSlug, data] of Object.entries(platformData)) {
      const platformId = platformMap[platformSlug];
      if (!platformId) continue;

      await prisma.platformFeature.create({
        data: {
          platformId,
          categoryId,
          featureNameAr: featureName,
          supported: data.supported,
          noteAr: data.noteAr,
        },
      });
      count++;
    }
  }

  console.log(`✓ ${count} features inserted`);
  console.log("\n✅ Features ready! Refresh your browser.\n");
}

main()
  .catch(err => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());
