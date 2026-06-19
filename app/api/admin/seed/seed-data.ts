// =============================================================
// SEED DATA — دليل المتاجر (Daleel Al-Matajir)
// Researched pricing as of June 2026. Sources noted inline.
// Re-run via /api/admin/seed (one-time use, delete route after).
// =============================================================

// ---- FX assumption for converting USD-priced platforms to SAR ----
export const USD_TO_SAR = 3.75;

// -------------------------------------------------------------
// FEATURE CATEGORIES (created first; platforms reference these)
// -------------------------------------------------------------
export const featureCategories = [
  { slug: 'pricing-fees', nameAr: 'التسعير والعمولات', sortOrder: 1 },
  { slug: 'payments-shipping', nameAr: 'الدفع والشحن', sortOrder: 2 },
  { slug: 'design-themes', nameAr: 'التصميم والقوالب', sortOrder: 3 },
  { slug: 'support', nameAr: 'الدعم الفني', sortOrder: 4 },
  { slug: 'seo-marketing', nameAr: 'تحسين محركات البحث والتسويق', sortOrder: 5 },
  { slug: 'localization', nameAr: 'الملاءمة المحلية (السعودية)', sortOrder: 6 },
];

// -------------------------------------------------------------
// PLATFORMS
// -------------------------------------------------------------
// Each entry maps directly to: Platform + pricingTiers + hiddenCosts
// + pros + cons + features (categorySlug resolved to id at seed time).

export const platforms = [
  // ============================================================
  // SALLA
  // Source: salla.com/en/plans (official, updated 2026-03-01),
  // takteek.net Salla vs Zid comparison (Jan 2026)
  // ============================================================
  {
    slug: 'salla',
    nameAr: 'سلة',
    nameEn: 'Salla',
    origin: 'GCC',
    logo: '/logos/salla.svg',
    brandColor: '#62BE8E',
    websiteUrl: 'https://salla.sa',
    affiliateUrl: 'https://salla.sa',
    cookieDurationDays: 30,
    commissionInfo: null,
    descriptionAr:
      'منصة سعودية رائدة للتجارة الإلكترونية تأسست عام 2016، تخدم أكثر من 68 ألف متجر نشط. الأسهل للبدء السريع في السوق السعودي بدعم عربي كامل وتكاملات محلية جاهزة (مدى، تابي، تمارا، أرامكس، سمسا).',
    rating: 4.6,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: null,
    quickVerdictAr:
      'الخيار الأفضل للمبتدئين والمتاجر الصغيرة والمتوسطة في السعودية والخليج التي تريد إطلاق سريع بدون تعقيد تقني.',
    bestForTypes: ['مبتدئين', 'متاجر صغيرة', 'منتجات يدوية ومحلية'],
    pricingTiers: [
      {
        name: 'Free',
        nameAr: 'مجانية',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 0,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
      {
        name: 'Basic',
        nameAr: 'أساسية',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 117,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
      {
        name: 'Growth',
        nameAr: 'نمو',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 260,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
      {
        name: 'Professional',
        nameAr: 'احترافية',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 1150,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
    ],
    hiddenCosts: [
      { labelAr: 'بوابة الدفع (مدى/فيزا/ماستركارد)', monthlySAR: 0, isRequired: true, scenarios: [] },
      { labelAr: 'رسوم معاملات بوابة الدفع (~2-3% لكل عملية)', monthlySAR: 150, isRequired: true, scenarios: [] },
      { labelAr: 'قالب احترافي مدفوع (اختياري)', monthlySAR: 0, isRequired: false, scenarios: [] },
      { labelAr: 'تطبيقات إضافية من متجر التطبيقات', monthlySAR: 100, isRequired: false, scenarios: [] },
    ],
    pros: [
      'الأسرع في الإطلاق — متجر جاهز خلال ساعة',
      'دعم عربي كامل وفريق دعم محلي 24/7',
      'تكاملات جاهزة مع شركات الشحن والدفع السعودية',
      'باقة مجانية للتجربة قبل الالتزام',
      'متوافق مع فاتورة (ZATCA) من داخل المنصة',
    ],
    cons: [
      'الباقة المجانية محدودة المنتجات والمزايا',
      'التخصيص التصميمي أقل مرونة من شوبيفاي أو ووكومرس',
      'تكلفة الباقة الاحترافية مرتفعة نسبياً لمتجر متوسط',
    ],
    features: [
      { categorySlug: 'pricing-fees', featureNameAr: 'باقة مجانية', supported: 'yes', noteAr: null },
      { categorySlug: 'pricing-fees', featureNameAr: 'عمولة على المبيعات', supported: 'no', noteAr: 'باستثناء رسوم بوابة الدفع' },
      { categorySlug: 'payments-shipping', featureNameAr: 'دعم مدى native', supported: 'yes', noteAr: null },
      { categorySlug: 'payments-shipping', featureNameAr: 'تكامل تابي/تمارا', supported: 'yes', noteAr: null },
      { categorySlug: 'localization', featureNameAr: 'فاتورة ZATCA', supported: 'yes', noteAr: 'مدمج مباشرة' },
      { categorySlug: 'localization', featureNameAr: 'واجهة عربية كاملة', supported: 'yes', noteAr: null },
      { categorySlug: 'support', featureNameAr: 'دعم فني عربي 24/7', supported: 'yes', noteAr: null },
      { categorySlug: 'design-themes', featureNameAr: 'تخصيص الكود (HTML/CSS كامل)', supported: 'partial', noteAr: 'عبر Twilight theme engine' },
      { categorySlug: 'seo-marketing', featureNameAr: 'مدونة مدمجة', supported: 'yes', noteAr: null },
    ],
  },

  // ============================================================
  // ZID
  // Source: zid.sa/en/pricing, alcoupon.com Zid plans (2026)
  // ============================================================
  {
    slug: 'zid',
    nameAr: 'زد',
    nameEn: 'Zid',
    origin: 'GCC',
    logo: '/logos/zid.svg',
    brandColor: '#7C3AED',
    websiteUrl: 'https://zid.sa',
    affiliateUrl: 'https://zid.sa',
    cookieDurationDays: 30,
    commissionInfo: null,
    descriptionAr:
      'منصة سعودية تأسست عام 2017 (الرياض)، تركز على الشركات متوسطة وكبيرة الحجم التي تحتاج إدارة مخزون متقدمة وتكاملات مؤسسية (ERP، نقاط بيع، تمويل مرن zid Pay).',
    rating: 4.5,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: null,
    quickVerdictAr:
      'الأقوى لإدارة المخزون متعدد الفروع والشركات السعودية المتوسطة والكبيرة التي تحتاج تكاملات احترافية.',
    bestForTypes: ['شركات متوسطة وكبيرة', 'متاجر متعددة الفروع', 'إدارة مخزون متقدمة'],
    pricingTiers: [
      {
        name: 'Lite',
        nameAr: 'لايت',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 99,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
      {
        name: 'Growth',
        nameAr: 'النمو',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 399,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
      {
        name: 'Professional',
        nameAr: 'الاحترافية',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 1150,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
    ],
    hiddenCosts: [
      { labelAr: 'بوابة الدفع ورسوم المعاملات', monthlySAR: 150, isRequired: true, scenarios: [] },
      { labelAr: 'قالب مدفوع أو تخصيص تصميم', monthlySAR: 0, isRequired: false, scenarios: [] },
      { labelAr: 'تطبيقات إضافية (محاسبة، تسويق)', monthlySAR: 120, isRequired: false, scenarios: [] },
    ],
    pros: [
      'إدارة مخزون متقدمة تدعم فروع متعددة ومستودعات',
      'تكامل قوي مع أنظمة ERP ونقاط البيع',
      'دعم تمويل مرن (zid Pay) للمتاجر النامية',
      'أدوات تسعير وعروض متقدمة',
    ],
    cons: [
      'لا توجد باقة مجانية',
      'منحنى تعلم أعلى قليلاً من سلة للمبتدئين',
      'الباقة الاحترافية موجهة أكثر للشركات الكبيرة',
    ],
    features: [
      { categorySlug: 'pricing-fees', featureNameAr: 'باقة مجانية', supported: 'no', noteAr: null },
      { categorySlug: 'payments-shipping', featureNameAr: 'دعم مدى native', supported: 'yes', noteAr: null },
      { categorySlug: 'payments-shipping', featureNameAr: 'تكامل تابي/تمارا/MisPay', supported: 'yes', noteAr: null },
      { categorySlug: 'localization', featureNameAr: 'فاتورة ZATCA', supported: 'yes', noteAr: null },
      { categorySlug: 'localization', featureNameAr: 'واجهة عربية كاملة', supported: 'yes', noteAr: null },
      { categorySlug: 'support', featureNameAr: 'دعم فني عربي 24/7', supported: 'yes', noteAr: null },
      { categorySlug: 'design-themes', featureNameAr: 'تخصيص الكود (HTML/CSS كامل)', supported: 'partial', noteAr: null },
      { categorySlug: 'seo-marketing', featureNameAr: 'مدونة مدمجة', supported: 'yes', noteAr: null },
    ],
  },

  // ============================================================
  // SHOPIFY
  // Source: Innovatrix Infotech Salla vs Shopify KSA 2026
  // (Basic $39, Grow $105, Advanced $399 USD/mo, +1-2% txn fee
  // if not using Shopify Payments — irrelevant for most KSA
  // merchants since Shopify Payments isn't available in KSA)
  // ============================================================
  {
    slug: 'shopify',
    nameAr: 'شوبيفاي',
    nameEn: 'Shopify',
    origin: 'Global',
    logo: '/logos/shopify.svg',
    brandColor: '#95BF47',
    websiteUrl: 'https://shopify.com',
    affiliateUrl: 'https://shopify.com',
    cookieDurationDays: 30,
    commissionInfo: null,
    descriptionAr:
      'منصة عالمية رائدة تستضيف ملايين المتاجر حول العالم. توفر أوسع نظام تطبيقات وقوالب وأكبر مرونة تصميمية، لكنها تسعّر بالدولار ولا تدعم الدفع المحلي (مدى) بشكل أصلي، وتتطلب بوابة دفع خارجية مثل PayTabs أو Moyasar للسوق السعودي.',
    rating: 4.4,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: 2000000,
    warningTextAr:
      'عند تجاوز مبيعاتك حوالي 2 مليون ريال شهرياً، قارن التكلفة الإجمالية مع Shopify Plus قبل اتخاذ القرار.',
    quickVerdictAr:
      'الأقوى عالمياً من حيث التطبيقات والتصميم، لكن يحتاج بوابة دفع خارجية (PayTabs/Moyasar) لدعم مدى في السعودية، والتسعير بالدولار يعني تقلب التكلفة.',
    bestForTypes: ['بيع دولي', 'علامات تجارية تستهدف أسواق متعددة', 'متاجر تحتاج تطبيقات متقدمة'],
    pricingTiers: [
      {
        name: 'Basic',
        nameAr: 'أساسية',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: Math.round(39 * USD_TO_SAR),
        transactionFeePct: 2,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
      {
        name: 'Grow',
        nameAr: 'النمو',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: Math.round(105 * USD_TO_SAR),
        transactionFeePct: 1,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
      {
        name: 'Advanced',
        nameAr: 'متقدمة',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: Math.round(399 * USD_TO_SAR),
        transactionFeePct: 0.5,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
    ],
    hiddenCosts: [
      { labelAr: 'بوابة دفع خارجية (PayTabs/Moyasar) لدعم مدى', monthlySAR: 0, isRequired: true, scenarios: [] },
      { labelAr: 'رسوم بوابة الدفع الخارجية (~2.5-3.5%)', monthlySAR: 220, isRequired: true, scenarios: [] },
      { labelAr: 'قالب مدفوع (Theme Store)', monthlySAR: 0, isRequired: false, scenarios: [] },
      { labelAr: 'تطبيقات (شحن، تسويق، تابي/تمارا)', monthlySAR: 250, isRequired: false, scenarios: [] },
    ],
    pros: [
      'أكبر متجر تطبيقات وقوالب في العالم',
      'أداء واستقرار ممتاز حتى تحت ضغط مبيعات عالٍ',
      'مرونة تصميم كاملة (Liquid + APIs)',
      'مناسب جداً للبيع عبر حدود متعددة وعملات مختلفة',
    ],
    cons: [
      'لا يدعم مدى أو ZATCA بشكل أصلي — يحتاج بوابة دفع خارجية',
      'التسعير بالدولار يعني تقلب التكلفة مع سعر الصرف',
      'الدعم الفني ليس بالعربية بشكل افتراضي',
      'رسوم معاملات إضافية إن لم تستخدم Shopify Payments (غير متاح في السعودية أصلاً)',
    ],
    features: [
      { categorySlug: 'pricing-fees', featureNameAr: 'باقة مجانية', supported: 'no', noteAr: null },
      { categorySlug: 'payments-shipping', featureNameAr: 'دعم مدى native', supported: 'no', noteAr: 'يحتاج بوابة خارجية' },
      { categorySlug: 'payments-shipping', featureNameAr: 'تكامل تابي/تمارا', supported: 'partial', noteAr: 'عبر تطبيقات خارجية' },
      { categorySlug: 'localization', featureNameAr: 'فاتورة ZATCA', supported: 'no', noteAr: 'يحتاج تطبيق خارجي' },
      { categorySlug: 'localization', featureNameAr: 'واجهة عربية كاملة', supported: 'partial', noteAr: 'دعم RTL جيد لكن ليس عربياً بالكامل' },
      { categorySlug: 'support', featureNameAr: 'دعم فني عربي 24/7', supported: 'no', noteAr: null },
      { categorySlug: 'design-themes', featureNameAr: 'تخصيص الكود (HTML/CSS كامل)', supported: 'yes', noteAr: null },
      { categorySlug: 'seo-marketing', featureNameAr: 'مدونة مدمجة', supported: 'yes', noteAr: null },
    ],
  },

  // ============================================================
  // WOOCOMMERCE
  // Source: Swell WooCommerce pricing 2026, Elementor breakdown
  // Free core plugin; real cost lives entirely in hosting/extensions
  // → modeled as a single $0 "tier" with all cost in hiddenCosts
  // (which the schema explicitly supports via `scenarios`)
  // ============================================================
  {
    slug: 'woocommerce',
    nameAr: 'ووكومرس',
    nameEn: 'WooCommerce',
    origin: 'Global',
    logo: '/logos/woocommerce.svg',
    brandColor: '#7F54B3',
    websiteUrl: 'https://woocommerce.com',
    affiliateUrl: 'https://woocommerce.com',
    cookieDurationDays: 30,
    commissionInfo: null,
    descriptionAr:
      'إضافة مفتوحة المصدر ومجانية تعمل فوق ووردبريس. لا توجد رسوم اشتراك شهرية للإضافة نفسها، لكن التكلفة الحقيقية تأتي من الاستضافة، القالب، الإضافات المدفوعة، وبوابة الدفع — وهي تتطلب معرفة تقنية أو مطور لإدارتها بشكل احترافي.',
    rating: 4.1,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: 'التكلفة الفعلية تعتمد كلياً على اختيارك للاستضافة والإضافات — راجع السيناريوهات أدناه.',
    quickVerdictAr:
      'الأكثر مرونة وتحكماً، لكن "مجاني" لا يعني رخيص — استضافة + إضافات + صيانة تصل بسهولة لمئات الريالات شهرياً، ويفضّل لمن لديه خبرة تقنية أو مطور.',
    bestForTypes: ['أصحاب مواقع ووردبريس موجودة', 'من يريد تحكم كامل بالكود', 'متاجر محتوى + متجر مدمج'],
    pricingTiers: [
      {
        name: 'Self-hosted',
        nameAr: 'ذاتية الاستضافة (الإضافة مجانية)',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 0,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
    ],
    hiddenCosts: [
      { labelAr: 'استضافة مشتركة (نطاق أساسي)', monthlySAR: 40, isRequired: true, scenarios: ['minimal'] },
      { labelAr: 'استضافة WooCommerce مُدارة', monthlySAR: 280, isRequired: true, scenarios: ['typical'] },
      { labelAr: 'استضافة مُدارة بالكامل + فريق صيانة', monthlySAR: 900, isRequired: true, scenarios: ['managed'] },
      { labelAr: 'قالب احترافي', monthlySAR: 0, isRequired: false, scenarios: ['typical', 'managed'] },
      { labelAr: 'إضافات مدفوعة (شحن، ضرائب، اشتراكات)', monthlySAR: 150, isRequired: false, scenarios: ['typical', 'managed'] },
      { labelAr: 'بوابة دفع (PayTabs/Moyasar) ورسومها', monthlySAR: 200, isRequired: true, scenarios: [] },
      { labelAr: 'صيانة وتحديثات شهرية (مطور/وكالة)', monthlySAR: 600, isRequired: false, scenarios: ['managed'] },
    ],
    pros: [
      'الإضافة الأساسية مجانية بالكامل ومفتوحة المصدر',
      'تحكم كامل في الكود وقاعدة البيانات والاستضافة',
      'أكبر نظام إضافات ووردبريس في العالم',
      'مناسب جداً لدمج متجر مع مدونة/موقع محتوى موجود',
    ],
    cons: [
      'لا يوجد دعم فني موحد — أنت مسؤول عن الاستضافة والأمان',
      'يحتاج معرفة تقنية أو مطور للإدارة الاحترافية',
      'التكلفة الإجمالية قد تتجاوز المنصات المُدارة عند احتساب كل الإضافات',
      'لا يدعم مدى أو ZATCA بدون إضافات خارجية',
    ],
    features: [
      { categorySlug: 'pricing-fees', featureNameAr: 'باقة مجانية', supported: 'yes', noteAr: 'الإضافة نفسها فقط، وليس الاستضافة' },
      { categorySlug: 'payments-shipping', featureNameAr: 'دعم مدى native', supported: 'no', noteAr: 'يحتاج إضافة بوابة دفع خارجية' },
      { categorySlug: 'payments-shipping', featureNameAr: 'تكامل تابي/تمارا', supported: 'partial', noteAr: 'عبر إضافات خارجية' },
      { categorySlug: 'localization', featureNameAr: 'فاتورة ZATCA', supported: 'no', noteAr: 'يحتاج إضافة مخصصة' },
      { categorySlug: 'localization', featureNameAr: 'واجهة عربية كاملة', supported: 'partial', noteAr: 'يعتمد على القالب' },
      { categorySlug: 'support', featureNameAr: 'دعم فني عربي 24/7', supported: 'no', noteAr: 'لا يوجد دعم رسمي موحد' },
      { categorySlug: 'design-themes', featureNameAr: 'تخصيص الكود (HTML/CSS كامل)', supported: 'yes', noteAr: null },
      { categorySlug: 'seo-marketing', featureNameAr: 'مدونة مدمجة', supported: 'yes', noteAr: 'ووردبريس نفسه نظام مدونات' },
    ],
  },

  // ============================================================
  // BIGCOMMERCE
  // Source: No7 Software (June 2026 rebrand: Core/Growth/Scale,
  // formerly Standard/Plus/Pro), Swell breakdown
  // Using NEW June 2026 naming since that's current as of today
  // ============================================================
  {
    slug: 'bigcommerce',
    nameAr: 'بيج كومرس',
    nameEn: 'BigCommerce',
    origin: 'Global',
    logo: '/logos/bigcommerce.svg',
    brandColor: '#34313F',
    websiteUrl: 'https://bigcommerce.com',
    affiliateUrl: 'https://bigcommerce.com',
    cookieDurationDays: 30,
    commissionInfo: null,
    descriptionAr:
      'منصة عالمية بدون عمولة على المبيعات (transaction-fee-free)، لكنها تربط الباقة بحجم مبيعاتك السنوي — تجاوز السقف يعني ترقية إجبارية. أعادت تسمية باقاتها في يونيو 2026 إلى Core وGrowth وScale.',
    rating: 4.2,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: 675000,
    warningTextAr:
      'الباقات مرتبطة بسقف مبيعات سنوي — تجاوزه يفرض ترقية تلقائية للباقة الأعلى، راجع التفاصيل قبل الالتزام.',
    quickVerdictAr:
      'بدون عمولة منصة على المبيعات، لكن الباقات مرتبطة بسقف إيرادات سنوي يفرض ترقية إجبارية عند تجاوزه — يحتاج بوابة دفع خارجية لدعم مدى.',
    bestForTypes: ['متاجر B2B', 'علامات تجارية متوسطة إلى كبيرة', 'من يريد تجنب عمولة المبيعات'],
    pricingTiers: [
      {
        name: 'Core',
        nameAr: 'الأساسية',
        minRevenueSAR: 0,
        maxRevenueSAR: Math.round(50000 * USD_TO_SAR),
        monthlyFeeSAR: Math.round(39 * USD_TO_SAR),
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: Math.round(50000 * USD_TO_SAR),
      },
      {
        name: 'Growth',
        nameAr: 'النمو',
        minRevenueSAR: 0,
        maxRevenueSAR: Math.round(180000 * USD_TO_SAR),
        monthlyFeeSAR: Math.round(105 * USD_TO_SAR),
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: Math.round(180000 * USD_TO_SAR),
      },
      {
        name: 'Scale',
        nameAr: 'التوسع',
        minRevenueSAR: 0,
        maxRevenueSAR: Math.round(400000 * USD_TO_SAR),
        monthlyFeeSAR: Math.round(399 * USD_TO_SAR),
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: Math.round(400000 * USD_TO_SAR),
      },
    ],
    hiddenCosts: [
      { labelAr: 'بوابة دفع خارجية (PayTabs/Moyasar) لدعم مدى', monthlySAR: 0, isRequired: true, scenarios: [] },
      { labelAr: 'رسوم بوابة الدفع الخارجية (~2.5-3.5%)', monthlySAR: 220, isRequired: true, scenarios: [] },
      { labelAr: 'قالب Stencil احترافي', monthlySAR: 0, isRequired: false, scenarios: [] },
      { labelAr: 'تطبيقات إضافية (تابي/تمارا، تسويق)', monthlySAR: 200, isRequired: false, scenarios: [] },
    ],
    pros: [
      'بدون عمولة منصة على المبيعات في كل الباقات',
      'مزايا B2B وتقارير متقدمة مدمجة دون تطبيقات إضافية',
      'حدود API أعلى من المنافسين المباشرين',
      'مناسب جداً للبيع متعدد القنوات (Amazon, eBay, Walmart)',
    ],
    cons: [
      'الباقات مرتبطة بسقف مبيعات سنوي — ترقية إجبارية عند التجاوز',
      'لا يدعم مدى أو ZATCA بشكل أصلي',
      'مجتمع تطبيقات وقوالب أصغر من شوبيفاي',
      'التسعير بالدولار يعني تقلب التكلفة',
    ],
    features: [
      { categorySlug: 'pricing-fees', featureNameAr: 'باقة مجانية', supported: 'no', noteAr: null },
      { categorySlug: 'pricing-fees', featureNameAr: 'عمولة على المبيعات', supported: 'no', noteAr: 'صفر عمولة منصة في كل الباقات' },
      { categorySlug: 'payments-shipping', featureNameAr: 'دعم مدى native', supported: 'no', noteAr: 'يحتاج بوابة خارجية' },
      { categorySlug: 'payments-shipping', featureNameAr: 'تكامل تابي/تمارا', supported: 'partial', noteAr: 'عبر تطبيقات خارجية' },
      { categorySlug: 'localization', featureNameAr: 'فاتورة ZATCA', supported: 'no', noteAr: null },
      { categorySlug: 'localization', featureNameAr: 'واجهة عربية كاملة', supported: 'no', noteAr: 'دعم RTL محدود' },
      { categorySlug: 'support', featureNameAr: 'دعم فني عربي 24/7', supported: 'no', noteAr: null },
      { categorySlug: 'design-themes', featureNameAr: 'تخصيص الكود (HTML/CSS كامل)', supported: 'yes', noteAr: null },
      { categorySlug: 'seo-marketing', featureNameAr: 'مدونة مدمجة', supported: 'yes', noteAr: null },
    ],
  },

  // ============================================================
  // MAGENTO / ADOBE COMMERCE
  // Source: mgt-commerce.com, elogic.co, iwdagency.com (2026)
  // Open Source = free core, GMV-tiered Adobe Commerce = enterprise
  // → modeled like WooCommerce: $0 tier + cost in hiddenCosts,
  // flagged isEnterprise since Adobe Commerce is quote-only
  // ============================================================
  {
    slug: 'magento',
    nameAr: 'ماجنتو',
    nameEn: 'Magento (Adobe Commerce)',
    origin: 'Global',
    logo: '/logos/magento.svg',
    brandColor: '#EE672F',
    websiteUrl: 'https://business.adobe.com/products/magento/magento-commerce.html',
    affiliateUrl: 'https://business.adobe.com/products/magento/magento-commerce.html',
    cookieDurationDays: 30,
    commissionInfo: null,
    descriptionAr:
      'منصة Open Source مجانية (Magento Open Source) أو نسخة مؤسسية مدفوعة بالاشتراك السنوي مرتبطة بحجم مبيعاتك (GMV) تُسمى Adobe Commerce. الأنسب للشركات الكبيرة ذات الكتالوجات الضخمة والاحتياجات التقنية المعقدة (B2B، تكامل ERP متقدم).',
    rating: 3.9,
    setupFeeSAR: 0,
    isEnterprise: true,
    warningThresholdSAR: null,
    warningTextAr:
      'التكلفة الفعلية تعتمد كلياً على النسخة (Open Source المجانية أو Adobe Commerce المدفوعة) وحجم مبيعاتك — يفضّل التواصل المباشر مع وكالة تطوير متخصصة.',
    quickVerdictAr:
      'الأقوى تقنياً للمتاجر الضخمة والمعقدة، لكنه يتطلب فريق تطوير متخصص وميزانية كبيرة — غير مناسب لمعظم المتاجر الصغيرة والمتوسطة في السعودية.',
    bestForTypes: ['شركات كبيرة', 'كتالوجات ضخمة', 'احتياجات B2B معقدة'],
    pricingTiers: [
      {
        name: 'Open Source',
        nameAr: 'مفتوحة المصدر (مجانية)',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 0,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
      },
    ],
    hiddenCosts: [
      { labelAr: 'استضافة ذاتية أساسية', monthlySAR: 150, isRequired: true, scenarios: ['minimal'] },
      { labelAr: 'استضافة مُدارة متوسطة الأداء', monthlySAR: 1800, isRequired: true, scenarios: ['typical'] },
      { labelAr: 'Adobe Commerce Cloud (مؤسسي، يبدأ تقريباً)', monthlySAR: Math.round((40000 / 12) * USD_TO_SAR), isRequired: true, scenarios: ['managed'] },
      { labelAr: 'تطوير وتخصيص أولي (مرة واحدة، موزع شهرياً تقديرياً)', monthlySAR: 2500, isRequired: true, scenarios: ['typical', 'managed'] },
      { labelAr: 'إضافات وقوالب مدفوعة', monthlySAR: 400, isRequired: false, scenarios: ['typical', 'managed'] },
      { labelAr: 'صيانة وفريق تطوير شهري', monthlySAR: 4000, isRequired: false, scenarios: ['managed'] },
    ],
    pros: [
      'مرونة تقنية غير محدودة لمتاجر معقدة وكتالوجات ضخمة',
      'مزايا B2B متقدمة (حسابات شركات، أسعار تفاوضية)',
      'النسخة المفتوحة المصدر مجانية بالكامل',
      'قابلية تخصيص كاملة لكل جزء من المنصة',
    ],
    cons: [
      'يتطلب فريق تطوير متخصص — غير مناسب للمبتدئين إطلاقاً',
      'Adobe Commerce مكلفة جداً (تبدأ من ~22,000 دولار سنوياً)',
      'وقت الإطلاق طويل (3-12 شهر) مقارنة بالمنصات الجاهزة',
      'لا دعم محلي للسوق السعودي بشكل أصلي',
    ],
    features: [
      { categorySlug: 'pricing-fees', featureNameAr: 'باقة مجانية', supported: 'yes', noteAr: 'Open Source فقط، الاستضافة منفصلة' },
      { categorySlug: 'payments-shipping', featureNameAr: 'دعم مدى native', supported: 'no', noteAr: 'يحتاج تطوير مخصص' },
      { categorySlug: 'payments-shipping', featureNameAr: 'تكامل تابي/تمارا', supported: 'partial', noteAr: 'عبر تطوير مخصص أو إضافات' },
      { categorySlug: 'localization', featureNameAr: 'فاتورة ZATCA', supported: 'no', noteAr: 'يحتاج تطوير مخصص' },
      { categorySlug: 'localization', featureNameAr: 'واجهة عربية كاملة', supported: 'partial', noteAr: 'يحتاج تخصيص' },
      { categorySlug: 'support', featureNameAr: 'دعم فني عربي 24/7', supported: 'no', noteAr: null },
      { categorySlug: 'design-themes', featureNameAr: 'تخصيص الكود (HTML/CSS كامل)', supported: 'yes', noteAr: null },
      { categorySlug: 'seo-marketing', featureNameAr: 'مدونة مدمجة', supported: 'partial', noteAr: 'يحتاج إضافة' },
    ],
  },
];

// -------------------------------------------------------------
// STARTER ARTICLES
// Categories must match the Arabic strings already used in the
// schema comment: 'مقارنات' | 'مراجعات' | 'أدلة' | 'دراسات الحالة' | 'أخبار'
// -------------------------------------------------------------
export const articles = [
  {
    slug: 'salla-vs-zid-2026',
    titleAr: 'سلة أم زد؟ مقارنة شاملة لأفضل منصة تجارة إلكترونية سعودية 2026',
    category: 'مقارنات',
    status: 'published',
    tags: ['سلة', 'زد', 'مقارنة', 'السعودية'],
    metaTitleAr: 'سلة أم زد 2026: مقارنة شاملة بالأسعار والمزايا',
    metaDescAr: 'مقارنة تفصيلية بين منصتي سلة وزد من حيث الأسعار، المزايا، إدارة المخزون، والدعم الفني لمساعدتك على اختيار الأنسب لمتجرك.',
    readingTimeMin: 7,
    bodyHtml: `<p>يُعد سلة وزد المنصتين السعوديتين الأكثر شعبية لإنشاء متجر إلكتروني، وكلاهما يقدم حلولاً قوية لكن بفلسفات مختلفة قليلاً.</p>
<h2>الأسعار</h2>
<p>تبدأ باقات سلة من باقة مجانية تجريبية، بينما تبدأ باقات زد من باقة Lite بسعر شهري. الفرق الأساسي يظهر في الباقات المتوسطة والعليا حيث تختلف المزايا المقدمة.</p>
<h2>إدارة المخزون</h2>
<p>تتفوق زد في إدارة المخزون متعدد الفروع والمستودعات، مما يجعلها خياراً أقوى للشركات التي تدير أكثر من فرع أو مستودع واحد.</p>
<h2>سهولة الاستخدام</h2>
<p>يُعتبر سلة أسهل قليلاً للمبتدئين بفضل واجهته المبسطة وسرعة الإطلاق، بينما تحتاج زد لوقت تعلم أطول نظراً لعمق مزاياها.</p>
<h2>الخلاصة</h2>
<p>إذا كنت تبدأ متجرك الأول أو تبيع منتجات محلية بسيطة، سلة هو الخيار الأنسب. أما إذا كنت تدير شركة متوسطة أو كبيرة تحتاج تكاملات مؤسسية، فزد يستحق النظر بجدية.</p>`,
  },
  {
    slug: 'shopify-in-saudi-arabia-guide-2026',
    titleAr: 'شوبيفاي في السعودية: هل يستحق التكلفة؟ دليل كامل 2026',
    category: 'أدلة',
    status: 'published',
    tags: ['شوبيفاي', 'السعودية', 'بوابات الدفع'],
    metaTitleAr: 'شوبيفاي في السعودية 2026: الدليل الكامل للتكلفة والتشغيل',
    metaDescAr: 'كل ما تحتاج معرفته عن استخدام شوبيفاي في السعودية: التكلفة الحقيقية، بوابات الدفع المتوافقة مع مدى، ومتى يكون الخيار الأنسب.',
    readingTimeMin: 6,
    bodyHtml: `<p>شوبيفاي هو المنصة الأكثر انتشاراً عالمياً، لكنه لم يُصمم أصلاً للسوق السعودي — وهذا له تبعات مهمة على التكلفة والتجربة.</p>
<h2>التحدي الأكبر: مدى</h2>
<p>شوبيفاي لا يدعم شبكة مدى بشكل أصلي عبر Shopify Payments، لأن هذه الخدمة غير متوفرة في السعودية أصلاً. الحل هو استخدام بوابة دفع خارجية مثل PayTabs أو Moyasar، وهذا يضيف خطوة تقنية إضافية وتكلفة شهرية.</p>
<h2>التسعير بالدولار</h2>
<p>جميع باقات شوبيفاي مُسعّرة بالدولار الأمريكي، مما يعني أن التكلفة الفعلية بالريال تتقلب مع سعر الصرف — وهذا عامل يغفل عنه الكثير من أصحاب المتاجر عند المقارنة الأولية.</p>
<h2>متى يستحق شوبيفاي التكلفة؟</h2>
<p>إذا كنت تستهدف عملاء خارج السعودية أو تحتاج أدوات تصميم وتطبيقات متقدمة غير متوفرة في المنصات المحلية، فإن شوبيفاي يستحق النظر رغم التعقيد الإضافي.</p>`,
  },
  {
    slug: 'woocommerce-real-cost-2026',
    titleAr: 'ووكومرس "مجاني"؟ هذه هي التكلفة الحقيقية لمتجرك',
    category: 'مراجعات',
    status: 'published',
    tags: ['ووكومرس', 'ووردبريس', 'استضافة'],
    metaTitleAr: 'تكلفة ووكومرس الحقيقية 2026: الاستضافة والإضافات والصيانة',
    metaDescAr: 'ووكومرس إضافة مجانية، لكن متجرك ليس كذلك. تفصيل كامل لتكاليف الاستضافة والقوالب والإضافات والصيانة الشهرية.',
    readingTimeMin: 8,
    bodyHtml: `<p>عبارة "ووكومرس مجاني" صحيحة جزئياً فقط — الإضافة نفسها مجانية، لكن تشغيل متجر احترافي عليها له تكلفة حقيقية غالباً ما تُفاجئ أصحاب المتاجر الجدد.</p>
<h2>الاستضافة: نقطة البداية</h2>
<p>تتراوح تكلفة الاستضافة من استضافة مشتركة رخيصة غير موصى بها لمتجر فعلي، إلى استضافة WooCommerce مُدارة بأداء جيد، إلى استضافة مُدارة بالكامل مع فريق دعم متخصص للمتاجر الكبيرة.</p>
<h2>الإضافات المدفوعة</h2>
<p>الإضافات الأساسية المجانية كافية للبداية، لكن المزايا المتقدمة مثل الشحن المتقدم وإدارة الضرائب والاشتراكات تتطلب إضافات مدفوعة تضيف تكلفة شهرية أو سنوية.</p>
<h2>الصيانة والأمان</h2>
<p>بخلاف المنصات المُدارة مثل سلة وزد، أنت المسؤول الكامل عن تحديثات الأمان والنسخ الاحتياطي وحل المشاكل التقنية — إما بنفسك أو عبر فريق صيانة مدفوع.</p>
<h2>الخلاصة</h2>
<p>ووكومرس خيار ممتاز لمن لديه خبرة تقنية أو موقع ووردبريس قائم بالفعل، لكنه نادراً ما يكون الخيار الأرخص فعلياً عند احتساب كل التكاليف.</p>`,
  },
  {
    slug: 'how-to-choose-ecommerce-platform-guide',
    titleAr: 'كيف تختار منصة التجارة الإلكترونية المناسبة لمتجرك؟ دليل القرار',
    category: 'أدلة',
    status: 'published',
    tags: ['دليل', 'اختيار منصة', 'مبتدئين'],
    metaTitleAr: 'كيف تختار منصة التجارة الإلكترونية الصحيحة 2026',
    metaDescAr: 'إطار عملي لاختيار منصة متجرك الإلكتروني بناءً على حجم عملك، ميزانيتك، واحتياجاتك التقنية.',
    readingTimeMin: 6,
    bodyHtml: `<p>اختيار المنصة الخاطئة يعني إعادة بناء متجرك بالكامل لاحقاً — وهذا مكلف بالوقت والمال. إليك إطار عملي لاتخاذ القرار الصحيح من البداية.</p>
<h2>الخطوة 1: حدد حجم أعمالك الحالي والمستقبلي</h2>
<p>متجر فردي بمنتجات محدودة له احتياجات مختلفة تماماً عن شركة تدير عدة فروع ومخزون معقد. كن واقعياً بشأن حجمك خلال السنة إلى السنتين القادمتين، لا اليوم فقط.</p>
<h2>الخطوة 2: حدد ميزانيتك الشهرية الحقيقية</h2>
<p>لا تنظر فقط لسعر الباقة المعلن — احسب رسوم بوابة الدفع، التطبيقات الإضافية، والقالب إن احتجت واحداً مدفوعاً. استخدم حاسبة التكاليف لمقارنة دقيقة.</p>
<h2>الخطوة 3: قيّم احتياجاتك التقنية</h2>
<p>هل تحتاج تخصيصاً تصميمياً عميقاً؟ تكاملات مع أنظمة محاسبة أو ERP؟ أم يكفيك متجر جاهز بدون تعقيد؟ الإجابة تحدد إن كنت تحتاج منصة مُدارة مثل سلة أو زد، أو منصة مرنة مثل شوبيفاي أو ووكومرس.</p>
<h2>الخطوة 4: لا تتجاهل الدعم المحلي</h2>
<p>دعم فني بالعربية وتكاملات جاهزة مع مدى وتابي وتمارا توفر عليك وقتاً وصداعاً تقنياً كبيراً، خصوصاً إن لم يكن لديك فريق تقني داخلي.</p>`,
  },
  {
    slug: 'bigcommerce-review-no-transaction-fee-2026',
    titleAr: 'بيج كومرس: المنصة بدون عمولة مبيعات — هل تناسب متجرك؟',
    category: 'مراجعات',
    status: 'published',
    tags: ['بيج كومرس', 'B2B', 'عمولة'],
    metaTitleAr: 'مراجعة بيج كومرس 2026: المزايا والعيوب والتسعير',
    metaDescAr: 'مراجعة شاملة لمنصة بيج كومرس: لا عمولة مبيعات لكن سقف إيرادات سنوي لكل باقة — هل تناسب متجرك؟',
    readingTimeMin: 5,
    bodyHtml: `<p>تتميز بيج كومرس بميزة تسويقية واضحة: لا عمولة على المبيعات في أي من باقاتها. لكن القصة الكاملة أكثر تعقيداً قليلاً.</p>
<h2>سقف المبيعات السنوي</h2>
<p>كل باقة في بيج كومرس مرتبطة بسقف مبيعات سنوي — إن تجاوزته، تُرقّى تلقائياً للباقة الأعلى بغض النظر عن رغبتك. هذا يعني أن نمو متجرك السريع قد يفرض عليك تكلفة إضافية غير مخطط لها.</p>
<h2>مزايا B2B جاهزة</h2>
<p>من نقاط قوة بيج كومرس الحقيقية هي مزايا B2B المدمجة مثل حسابات الشركات والأسعار التفاوضية، وهي مزايا تتطلب تطبيقات إضافية في منصات أخرى.</p>
<h2>التحدي السعودي</h2>
<p>مثل شوبيفاي، لا تدعم بيج كومرس مدى أو فاتورة ZATCA بشكل أصلي، وتحتاج بوابة دفع خارجية وتطبيقات إضافية للتوافق مع السوق المحلي.</p>
<h2>الخلاصة</h2>
<p>بيج كومرس خيار قوي للمتاجر متوسطة إلى كبيرة الحجم التي تبيع B2B أو عبر قنوات متعددة، لكنه يحتاج تخطيطاً دقيقاً لتجنب الترقيات الإجبارية المفاجئة.</p>`,
  },
];
