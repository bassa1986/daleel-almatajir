import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const platforms = [
  {
    slug: "salla",
    nameAr: "سلة", nameEn: "Salla",
    descriptionAr: "منصة سعودية رائدة تمكّن التجار من إنشاء متاجرهم الإلكترونية بسهولة ودون عمولات على المبيعات، وتوفر منظومة متكاملة من حلول الدفع والشحن المحلي.",
    websiteUrl: "https://salla.sa", affiliateUrl: "", logo: "", brandColor: "#004956",
    rating: 4.7, origin: "GCC", isEnterprise: false,
    commissionInfo: "لا توجد عمولة على المبيعات من قِبل المنصة، وتطبق فقط الرسوم البنكية القياسية لبوابة الدفع (سلة باي) حسب نوع البطاقة (مدى، فيزا، ماستر كارد).",
    quickVerdictAr: "الخيار الأول والأكثر تكاملاً في السوق السعودي والخليجي لإطلاق متجر إلكتروني مستقر وبدون تكاليف مخفية.",
    bestForTypes: ["المبتدئين", "الشركات الناشئة", "متاجر الخليج"],
    tiers: [
      { name: "Basic", nameAr: "سلة أساسية", monthlyFeeSAR: 0, transactionFeePct: 0, sortOrder: 0 },
      { name: "Plus", nameAr: "سلة بلس", monthlyFeeSAR: 99, transactionFeePct: 0, sortOrder: 1 },
      { name: "Pro", nameAr: "سلة برو", monthlyFeeSAR: 299, transactionFeePct: 0, sortOrder: 2 },
    ],
    pros: ["عدم وجود عمولات على المبيعات نهائياً.", "متجر تطبيقات ضخم (Salla App Store) يحتوي على مئات الحلول البرمجية.", "ربط فوري وسلس مع شركات الشحن والخدمات المحلية بضغطة زر."],
    cons: ["قيود على تعديل الأكواد البرمجية (CSS/HTML) إلا في الباقات المتقدمة.", "الدعم الفني قد يتأخر في الاستجابة خلال أوقات الذروة والمواسم."],
  },
  {
    slug: "zid",
    nameAr: "زد", nameEn: "Zid",
    descriptionAr: "منظومة تجزئة متكاملة سعودية تساعد التجار في بناء متجر إلكتروني وإدارة عمليات الشحن والتسويق عبر قنوات متعددة من لوحة تحكم واحدة.",
    websiteUrl: "https://zid.sa", affiliateUrl: "", logo: "", brandColor: "#54421C",
    rating: 4.5, origin: "GCC", isEnterprise: false,
    commissionInfo: "لا توجد عمولات مبيعات للمنصة؛ الرسوم تخص بوابة الدفع (زد باي): مدى تبدأ من 1% + 1 ريال، والبطاقات الائتمانية من 2.3% إلى 3.3% + 1 ريال.",
    quickVerdictAr: "منصة ممتازة للتحول من متجر إلكتروني إلى منظومة تجارة تجزئة متكاملة تربط الفروع بالإنترنت.",
    bestForTypes: ["تجار التجزئة", "العلامات التجارية المتوسطة", "متاجر المملكة"],
    tiers: [
      { name: "Starter", nameAr: "البداية", monthlyFeeSAR: 0, transactionFeePct: 0, sortOrder: 0 },
      { name: "Rise", nameAr: "النمو", monthlyFeeSAR: 99, transactionFeePct: 0, sortOrder: 1 },
      { name: "Growth", nameAr: "التوسع", monthlyFeeSAR: 299, transactionFeePct: 0, sortOrder: 2 },
    ],
    pros: ["لوحة تحكم جديدة 2026 تمتاز بالسرعة الفائقة والذكاء الاصطناعي.", "منظومة لوجستية قوية من خلال حلول (زد شيب) و(مزيد).", "إمكانية التعديل على واجهات المتجر عبر CSS بمرونة عالية."],
    cons: ["عدد التطبيقات المتاحة أقل مقارنة بالمنافسين العالميين.", "بعض الميزات المتقدمة تتطلب اشتراكات في خدمات رديفة داخل منظومة زد."],
  },
  {
    slug: "shopify",
    nameAr: "شوبيفاي", nameEn: "Shopify",
    descriptionAr: "المنصة العالمية الأقوى والأشهر لبناء وإدارة المتاجر الإلكترونية، تتميز بمرونتها اللامتناهية وتوافقها مع كافة الأسواق العالمية.",
    websiteUrl: "https://shopify.com", affiliateUrl: "", logo: "", brandColor: "#96bf48",
    rating: 4.8, origin: "Global", isEnterprise: false,
    commissionInfo: "تفرض شوبيفاي رسوم معاملات إضافية عند استخدام بوابات دفع خارجية بنسب من 0.5% إلى 2% حسب الباقة، بخلاف رسوم بوابة الدفع المستقلة (Tap أو Moyasar).",
    quickVerdictAr: "المعيار العالمي للتجارة الإلكترونية؛ حلول لا تضاهى ولكنها تتطلب ميزانية أعلى وخبرة في التخصيص المحلي.",
    bestForTypes: ["الأسواق العالمية", "الشركات الكبرى", "التجارة العابرة للحدود"],
    tiers: [
      { name: "Basic", nameAr: "الأساسية", monthlyFeeSAR: 146, transactionFeePct: 2.0, sortOrder: 0 },
      { name: "Shopify", nameAr: "شوبيفاي", monthlyFeeSAR: 394, transactionFeePct: 1.0, sortOrder: 1 },
      { name: "Advanced", nameAr: "المتقدمة", monthlyFeeSAR: 1496, transactionFeePct: 0.5, sortOrder: 2 },
    ],
    pros: ["مرونة كاملة في التصميم عبر آلاف الثيمات والتطبيقات.", "بنية تحتية تتحمل ملايين الزيارات دون توقف.", "مثالية للتجارة الدولية ودعم العملات المتعددة."],
    cons: ["التكلفة الإجمالية مرتفعة بسبب رسوم المعاملات والتطبيقات.", "تحتاج إعداداً يدوياً لربط شركات الشحن المحلية في الخليج."],
  },
  {
    slug: "woocommerce",
    nameAr: "ووكومرس", nameEn: "WooCommerce",
    descriptionAr: "إضافة برمجية مجانية مفتوحة المصدر مبنية على WordPress، تمنحك تحكماً وملكية كاملة 100% لمتجرك.",
    websiteUrl: "https://woocommerce.com", affiliateUrl: "", logo: "", brandColor: "#96588a",
    rating: 4.6, origin: "Global", isEnterprise: false,
    commissionInfo: "المنصة مجانية ولا تأخذ أي عمولات على المبيعات؛ يدفع التاجر فقط رسوم بوابات الدفع التي يربطها بشكل مستقل.",
    quickVerdictAr: "الحل الأكثر حرية واقتصادية على المدى الطويل لمن يملك المعرفة التقنية أو القدرة على إدارة الخوادم.",
    bestForTypes: ["المطورين", "التقنيين", "الشركات ذات التخصيص الدقيق"],
    tiers: [
      { name: "Free", nameAr: "مجاني", monthlyFeeSAR: 0, transactionFeePct: 0, sortOrder: 0 },
    ],
    pros: ["ملكية كاملة للمتجر وبيانات العملاء دون الخضوع لشروط أي منصة.", "مجاني بالكامل كبرنامج مما يقلل النفقات الثابتة عند البدء.", "إمكانيات تخصيص لا حدود لها وتوافق تام مع أدوات SEO."],
    cons: ["عبء الصيانة الأمنية والنسخ الاحتياطي يقع بالكامل على التاجر.", "يتطلب منحنى تعلم تقني أو الاستعانة بمطور مواقع."],
  },
  {
    slug: "bigcommerce",
    nameAr: "بيغ كومرس", nameEn: "BigCommerce",
    descriptionAr: "منصة سحابية عالمية قوية تركز على الشركات المتوسطة والكبيرة وتوفر ميزات مدمجة ضخمة دون الحاجة لتطبيقات خارجية.",
    websiteUrl: "https://bigcommerce.com", affiliateUrl: "", logo: "", brandColor: "#121113",
    rating: 4.4, origin: "Global", isEnterprise: false,
    commissionInfo: "لا توجد رسوم معاملات على أي باقة؛ لكن لكل باقة سقف مبيعات سنوي محدد إذا تجاوزته يتم ترقيتك للباقة الأعلى تلقائياً.",
    quickVerdictAr: "بديل قوي لشوبيفاي بخصائص مدمجة غنية وبدون عمولات خفية، لكنه يتطلب مبيعات مستقرة لتغطية الترقية التلقائية.",
    bestForTypes: ["المتاجر سريعة النمو", "B2B و B2C", "الشركات المتوسطة"],
    tiers: [
      { name: "Standard", nameAr: "القياسية", monthlyFeeSAR: 146, transactionFeePct: 0, sortOrder: 0 },
      { name: "Plus", nameAr: "بلس", monthlyFeeSAR: 394, transactionFeePct: 0, sortOrder: 1 },
      { name: "Pro", nameAr: "برو", monthlyFeeSAR: 1496, transactionFeePct: 0, sortOrder: 2 },
    ],
    pros: ["ميزات مدمجة متطورة (استعادة السلال المتروكة) دون تطبيقات إضافية مدفوعة.", "صفر رسوم معاملات للمنصة مما يوفر الأرباح للتجار.", "دعم قوي للتجارة بين الشركات (B2B)."],
    cons: ["سقف المبيعات السنوي يجبرك على الترقية حتى لو لم تكن بحاجة لميزاتها.", "قوالب التصميم المجانية محدودة مقارنة بـ Shopify."],
  },
  {
    slug: "magento",
    nameAr: "ماجنتو", nameEn: "Magento",
    descriptionAr: "المنصة الأقوى عالمياً للمتاجر الضخمة والشركات العملاقة، مفتوحة المصدر ومملوكة لشركة Adobe، تتيح مرونة برمجية مطلقة.",
    websiteUrl: "https://business.adobe.com/products/magento", affiliateUrl: "", logo: "", brandColor: "#EE6F2A",
    rating: 4.3, origin: "Global", isEnterprise: true,
    commissionInfo: "لا توجد أي عمولات للمنصة على المبيعات، وتقتصر التكاليف على بوابات الدفع الإلكتروني المستقلة.",
    quickVerdictAr: "وحش التجارة الإلكترونية للمؤسسات الكبيرة؛ نظام جبار يحتاج استثمارات مالية وتقنية ضخمة.",
    bestForTypes: ["الشركات الكبرى", "العلامات التجارية العالمية", "المصانع والمؤسسات"],
    tiers: [
      { name: "Open Source", nameAr: "مفتوح المصدر", monthlyFeeSAR: 0, transactionFeePct: 0, sortOrder: 0 },
    ],
    pros: ["قدرة غير محدودة على التوسع والربط مع أنظمة ERP و CRM.", "معالجة مئات الآلاف من المنتجات والطلبات بكفاءة عالية.", "تخصيص مطلق وأمان متقدم يناسب المؤسسات الكبرى."],
    cons: ["تكاليف تطوير وصيانة باهظة تتطلب فريقاً برمجياً محترفاً.", "تحتاج خوادم استضافة قوية وغالية لضمان سرعة التصفح."],
  },
];

async function main() {
  console.log("\n=== Populating Real Platform Data ===\n");

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];

    const baseData = {
      nameAr: platform.nameAr,
      nameEn: platform.nameEn,
      descriptionAr: platform.descriptionAr,
      websiteUrl: platform.websiteUrl,
      affiliateUrl: platform.affiliateUrl,
      logo: platform.logo,
      brandColor: platform.brandColor,
      rating: platform.rating,
      origin: platform.origin,
      isEnterprise: platform.isEnterprise,
      commissionInfo: platform.commissionInfo,
      quickVerdictAr: platform.quickVerdictAr,
      bestForTypes: platform.bestForTypes,
    };

    const existing = await prisma.platform.findUnique({ where: { slug: platform.slug } });

    let p;
    if (existing) {
      p = await prisma.platform.update({ where: { slug: platform.slug }, data: baseData });
      console.log(`Updated: ${platform.nameEn}`);
    } else {
      p = await prisma.platform.create({ data: { slug: platform.slug, ...baseData } });
      console.log(`Created: ${platform.nameEn}`);
    }

    await prisma.pricingTier.deleteMany({ where: { platformId: p.id } });
    await prisma.pricingTier.createMany({
      data: platform.tiers.map(t => ({
        platformId: p.id,
        name: t.name,
        nameAr: t.nameAr,
        monthlyFeeSAR: t.monthlyFeeSAR,
        transactionFeePct: t.transactionFeePct,
        minRevenueSAR: 0,
        sortOrder: t.sortOrder,
      })),
    });

    await prisma.platformPro.deleteMany({ where: { platformId: p.id } });
    await prisma.platformPro.createMany({
      data: platform.pros.map((text, i) => ({ platformId: p.id, textAr: text, sortOrder: i })),
    });

    await prisma.platformCon.deleteMany({ where: { platformId: p.id } });
    await prisma.platformCon.createMany({
      data: platform.cons.map((text, i) => ({ platformId: p.id, textAr: text, sortOrder: i })),
    });

    console.log(`  Tiers: ${platform.tiers.length} | Pros: ${platform.pros.length} | Cons: ${platform.cons.length}`);
  }

  console.log("\n✅ All real data populated!\n");
}

main()
  .catch(err => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());
