// =============================================================
// دليل المتاجر (Daleel Al-Matajir) — Database Seed
// Seeds: feature categories, 6 platforms, pricing tiers,
// hidden costs, feature matrix, pros/cons, site settings.
// =============================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// -------------------------------------------------------------
// FEATURE CATEGORIES
// -------------------------------------------------------------
const FEATURE_CATEGORIES = [
  { slug: 'language-region', nameAr: 'اللغة والمنطقة', sortOrder: 1 },
  { slug: 'gulf-payments', nameAr: 'بوابات الدفع الخليجية', sortOrder: 2 },
  { slug: 'shipping-logistics', nameAr: 'الشحن واللوجستيات', sortOrder: 3 },
  { slug: 'marketing-analytics', nameAr: 'التسويق والتحليل', sortOrder: 4 },
  { slug: 'multichannel-sales', nameAr: 'المبيعات متعددة القنوات', sortOrder: 5 },
  { slug: 'tech-performance', nameAr: 'التقنية والأداء', sortOrder: 6 },
  { slug: 'technical-support', nameAr: 'الدعم الفني', sortOrder: 7 },
] as const;

// -------------------------------------------------------------
// PLATFORMS
// -------------------------------------------------------------
type SupportLevel = 'yes' | 'no' | 'partial';

const PLATFORMS = [
  {
    slug: 'salla',
    nameAr: 'سلة',
    nameEn: 'Salla',
    origin: 'GCC',
    logo: '/logos/salla.svg',
    brandColor: '#4CAF50',
    websiteUrl: 'https://salla.sa',
    affiliateUrl: 'https://salla.com/partner/daleel',
    cookieDurationDays: 30,
    commissionInfo: null,
    rating: 4.3,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: null,
    descriptionAr:
      'سلة هي منصة التجارة الإلكترونية الرائدة في المملكة العربية السعودية، صُممت خصيصاً للسوق الخليجي مع دعم كامل للغة العربية وبوابات الدفع المحلية.',
    quickVerdictAr:
      'الخيار الأفضل للتجار السعوديين الباحثين عن منصة عربية متكاملة بدون رسوم على المعاملات في جميع الباقات، مع دعم عربي على مدار الساعة.',
    bestForTypes: ['تجار التجزئة', 'الأزياء والإكسسوارات', 'متاجر تبدأ في السعودية'],
    pricingTiers: [
      {
        name: 'Basic',
        nameAr: 'أساسي',
        minRevenueSAR: 0,
        maxRevenueSAR: 187500,
        monthlyFeeSAR: 179,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: 300,
        annualRevLimitSAR: null,
        sortOrder: 1,
      },
      {
        name: 'Professional',
        nameAr: 'احترافي',
        minRevenueSAR: 187500,
        maxRevenueSAR: 750000,
        monthlyFeeSAR: 499,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: 2000,
        annualRevLimitSAR: null,
        sortOrder: 2,
      },
      {
        name: 'Advanced',
        nameAr: 'متقدم',
        minRevenueSAR: 750000,
        maxRevenueSAR: null,
        monthlyFeeSAR: 899,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 3,
      },
    ],
    hiddenCosts: [] as Array<{
      labelAr: string;
      monthlySAR: number;
      isRequired: boolean;
      scenarios: string[];
      sortOrder: number;
    }>,
    pros: [
      'دعم عربي كامل على مدار الساعة',
      'تكامل مباشر مع بوابات الدفع السعودية مثل مدى وآبل باي وSTC Pay',
      'بدون رسوم على المعاملات في جميع الباقات',
      'شحن متكامل مع أرامكس وسمسا إكسبرس',
    ],
    cons: [
      'تخصيص التصميم محدود مقارنة بمنصات مفتوحة المصدر',
      'التوسع للأسواق العالمية أقل مرونة من شوبيفاي',
      'بعض التطبيقات الإضافية من المتجر برسوم شهرية منفصلة',
    ],
    featureSupport: {
      'واجهة عربية كاملة': 'yes',
      'دعم RTL': 'yes',
      'مدى (Mada)': 'yes',
      'Apple Pay': 'yes',
      'STC Pay': 'yes',
      'تاب للمدفوعات': 'yes',
      'دعم عربي 24/7': 'yes',
      'شحن Aramex/SMSA مدمج': 'yes',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'zid',
    nameAr: 'زد',
    nameEn: 'Zid',
    origin: 'GCC',
    logo: '/logos/zid.svg',
    brandColor: '#2196F3',
    websiteUrl: 'https://zid.sa',
    affiliateUrl: 'https://zid.sa/partner/daleel',
    cookieDurationDays: 30,
    commissionInfo: null,
    rating: 4.1,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: null,
    descriptionAr:
      'زد منصة تجارة إلكترونية سعودية تنافس سلة بشكل مباشر، وتوفر باقات مرنة ودعماً قوياً للسوق الخليجي مع أدوات تسويق وتحليل متقدمة.',
    quickVerdictAr:
      'بديل قوي لسلة بسعر دخول منافس وأدوات تسويق وتحليل إضافية، مناسب للمتاجر التي تخطط للنمو السريع.',
    bestForTypes: ['متاجر النمو السريع', 'العلامات التجارية الناشئة', 'متاجر الجملة والتجزئة'],
    pricingTiers: [
      {
        name: 'Starter',
        nameAr: 'ابتدائي',
        minRevenueSAR: 0,
        maxRevenueSAR: 187500,
        monthlyFeeSAR: 149,
        transactionFeePct: 0.5,
        perOrderFee: 0,
        maxOrders: 500,
        annualRevLimitSAR: null,
        sortOrder: 1,
      },
      {
        name: 'Growth',
        nameAr: 'نمو',
        minRevenueSAR: 187500,
        maxRevenueSAR: 937500,
        monthlyFeeSAR: 399,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: 3000,
        annualRevLimitSAR: null,
        sortOrder: 2,
      },
      {
        name: 'Premium',
        nameAr: 'بريميوم',
        minRevenueSAR: 937500,
        maxRevenueSAR: null,
        monthlyFeeSAR: 799,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 3,
      },
    ],
    hiddenCosts: [],
    pros: [
      'باقة ابتدائية بسعر تنافسي لمن يبدأ للتو',
      'أدوات تسويق وتحليل متقدمة مدمجة',
      'دعم كامل للغة العربية وRTL',
      'تكامل مع وسائل الدفع المحلية الشائعة',
    ],
    cons: [
      'الباقة الابتدائية تتضمن نسبة 0.5% على المعاملات',
      'عدد التطبيقات والإضافات في السوق أقل من سلة',
      'حد أقصى لعدد الطلبات في الباقات الأقل',
    ],
    featureSupport: {
      'واجهة عربية كاملة': 'yes',
      'دعم RTL': 'yes',
      'مدى (Mada)': 'yes',
      'Apple Pay': 'yes',
      'STC Pay': 'yes',
      'تاب للمدفوعات': 'yes',
      'دعم عربي 24/7': 'yes',
      'شحن Aramex/SMSA مدمج': 'yes',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'shopify',
    nameAr: 'شوبيفاي',
    nameEn: 'Shopify',
    origin: 'Global',
    logo: '/logos/shopify.svg',
    brandColor: '#96BF48',
    websiteUrl: 'https://www.shopify.com',
    affiliateUrl: 'https://shopify.com/r/daleel',
    cookieDurationDays: 30,
    commissionInfo: null,
    rating: 4.2,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: null,
    descriptionAr:
      'شوبيفاي منصة تجارة إلكترونية عالمية رائدة، توفر مرونة كبيرة في التصميم وتطبيقات لا حصر لها والتوسع الدولي، لكنها تحتاج إلى تطبيقات إضافية لدعم السوق الخليجي بشكل كامل.',
    quickVerdictAr:
      'الأفضل للمتاجر التي تبيع دولياً أو تحتاج إلى تخصيص تصميم متقدم، مع الأخذ بالاعتبار رسوم المعاملات على الباقات الأقل.',
    bestForTypes: [
      'المتاجر التي تستهدف أسواقاً عالمية',
      'العلامات التجارية متعددة الدول',
      'متاجر تحتاج تخصيصاً تصميمياً عالياً',
    ],
    // NOTE: Shopify tier selection is cost-based (see calculator SECTION 3),
    // not revenue-range based — all tiers have minRevenueSAR: 0, maxRevenueSAR: null,
    // and the calculator picks whichever yields the lowest total monthly cost.
    pricingTiers: [
      {
        name: 'Basic',
        nameAr: 'الأساسي',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 112,
        transactionFeePct: 2,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 1,
      },
      {
        name: 'Shopify',
        nameAr: 'شوبيفاي',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 305,
        transactionFeePct: 1,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 2,
      },
      {
        name: 'Advanced',
        nameAr: 'المتقدم',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 1125,
        transactionFeePct: 0.5,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 3,
      },
    ],
    hiddenCosts: [],
    pros: [
      'مكتبة تطبيقات وقوالب ضخمة لتخصيص المتجر',
      'أداء وموثوقية عالية مع توسع دولي سهل',
      'دعم RTL أساسي وتكامل مع آبل باي',
      'مناسبة للبيع عبر قنوات متعددة (انستقرام، تيك توك، أمازون)',
    ],
    cons: [
      'لا يوجد دعم مباشر لمدى أو STC Pay دون بوابات طرف ثالث',
      'رسوم على المعاملات في الباقتين الأقل',
      'الدعم العربي المباشر من شوبيفاي محدود',
    ],
    featureSupport: {
      'واجهة عربية كاملة': 'partial',
      'دعم RTL': 'yes',
      'مدى (Mada)': 'no',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'تاب للمدفوعات': 'partial',
      'دعم عربي 24/7': 'no',
      'شحن Aramex/SMSA مدمج': 'partial',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'woocommerce',
    nameAr: 'ووكومرس',
    nameEn: 'WooCommerce',
    origin: 'Global',
    logo: '/logos/woocommerce.svg',
    brandColor: '#7F54B3',
    websiteUrl: 'https://woocommerce.com',
    affiliateUrl: 'https://woocommerce.com/affiliates/daleel',
    cookieDurationDays: 30,
    commissionInfo: null,
    rating: 3.8,
    setupFeeSAR: 3750,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: null,
    descriptionAr:
      'ووكومرس إضافة مفتوحة المصدر لمنصة ووردبريس، توفر حرية تصميم وتخصيص غير محدودة دون رسوم ترخيص، لكنها تتطلب إدارة تقنية وتكاليف استضافة وإضافات وصيانة منفصلة.',
    quickVerdictAr:
      'مناسب لمن يملك خبرة تقنية أو فريق دعم ويرغب بالتحكم الكامل في متجره، مع ضرورة احتساب التكاليف الخفية للاستضافة والإضافات والصيانة.',
    bestForTypes: [
      'المطورين وأصحاب الخبرة التقنية',
      'المتاجر التي تحتاج تخصيصاً كاملاً',
      'المشاريع منخفضة الميزانية في البداية',
    ],
    pricingTiers: [
      {
        name: 'Free',
        nameAr: 'مجاني',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 0,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 1,
      },
    ],
    // 3 selectable scenarios — see SECTION 3 "WOOCOMMERCE SCENARIO LOGIC".
    // minimal  = hosting + ssl                     = 263 SAR/mo
    // typical  = hosting + ssl + plugins + maint.  = 788 SAR/mo (default)
    // managed  = all of the above + managed addon  = 1,163 SAR/mo
    hiddenCosts: [
      {
        labelAr: 'استضافة',
        monthlySAR: 188,
        isRequired: true,
        scenarios: ['minimal', 'typical', 'managed'],
        sortOrder: 1,
      },
      {
        labelAr: 'شهادة SSL وشبكة توصيل المحتوى (CDN)',
        monthlySAR: 75,
        isRequired: true,
        scenarios: ['minimal', 'typical', 'managed'],
        sortOrder: 2,
      },
      {
        labelAr: 'إضافات وقوالب مدفوعة',
        monthlySAR: 150,
        isRequired: false,
        scenarios: ['typical', 'managed'],
        sortOrder: 3,
      },
      {
        labelAr: 'صيانة دورية ودعم تقني',
        monthlySAR: 375,
        isRequired: false,
        scenarios: ['typical', 'managed'],
        sortOrder: 4,
      },
      {
        labelAr: 'استضافة واستضافة مُدارة متقدمة',
        monthlySAR: 375,
        isRequired: false,
        scenarios: ['managed'],
        sortOrder: 5,
      },
    ],
    pros: [
      'تحكم كامل بالكود والتصميم بدون قيود',
      'لا توجد رسوم ترخيص أو رسوم على المعاملات من ووكومرس نفسها',
      'آلاف الإضافات والقوالب من مصادر متعددة',
      'دعم RTL جيد عبر إضافات عربية متخصصة',
    ],
    cons: [
      'يتطلب إدارة الاستضافة والتحديثات والأمان بشكل مستقل',
      'التكاليف الخفية (استضافة، إضافات، صيانة) قد تتجاوز باقات المنصات الجاهزة',
      'لا يوجد دعم عربي رسمي 24/7 من ووكومرس',
    ],
    featureSupport: {
      'واجهة عربية كاملة': 'partial',
      'دعم RTL': 'yes',
      'مدى (Mada)': 'partial',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'تاب للمدفوعات': 'partial',
      'دعم عربي 24/7': 'no',
      'شحن Aramex/SMSA مدمج': 'partial',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'bigcommerce',
    nameAr: 'بيغ كومرس',
    nameEn: 'BigCommerce',
    origin: 'Global',
    logo: '/logos/bigcommerce.svg',
    brandColor: '#34313F',
    websiteUrl: 'https://www.bigcommerce.com',
    affiliateUrl: 'https://bigcommerce.com/essentials/daleel',
    cookieDurationDays: 30,
    commissionInfo: null,
    rating: 3.9,
    setupFeeSAR: 0,
    isEnterprise: false,
    warningThresholdSAR: null,
    warningTextAr: null,
    descriptionAr:
      'بيغ كومرس منصة عالمية تستهدف الشركات متوسطة وكبيرة الحجم، تعتمد باقاتها على سقف الإيرادات السنوية بدلاً من رسوم المعاملات، مع أدوات قوية للبيع متعدد القنوات وB2B.',
    quickVerdictAr:
      'خيار قوي للشركات متوسطة الحجم ذات الإيرادات السنوية المرتفعة التي تبحث عن منصة بدون رسوم معاملات، لكن دعمها للسوق العربي والخليجي محدود.',
    bestForTypes: ['الشركات متوسطة الحجم', 'المتاجر بإيرادات سنوية مرتفعة', 'متاجر B2B'],
    pricingTiers: [
      {
        name: 'Standard',
        nameAr: 'الأساسي',
        minRevenueSAR: 0,
        maxRevenueSAR: 187500,
        monthlyFeeSAR: 262,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: 2250000,
        sortOrder: 1,
      },
      {
        name: 'Plus',
        nameAr: 'المتقدم',
        minRevenueSAR: 187500,
        maxRevenueSAR: 675000,
        monthlyFeeSAR: 757,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: 8100000,
        sortOrder: 2,
      },
      {
        name: 'Pro',
        nameAr: 'الاحترافي',
        minRevenueSAR: 675000,
        maxRevenueSAR: 1500000,
        monthlyFeeSAR: 2280,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 3,
      },
      {
        name: 'Enterprise',
        nameAr: 'المؤسسي',
        minRevenueSAR: 1500000,
        maxRevenueSAR: null,
        monthlyFeeSAR: 3750,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 4,
      },
    ],
    hiddenCosts: [],
    pros: [
      'بدون رسوم على المعاملات في جميع الباقات',
      'أدوات قوية للبيع متعدد القنوات والـB2B',
      'أداء وأمان على مستوى المؤسسات',
      'تكامل واسع مع تطبيقات الشحن والدفع العالمية',
    ],
    cons: [
      'لا يوجد دعم مباشر لمدى أو STC Pay أو تاب',
      'الواجهة والوثائق غير متوفرة بالعربية',
      'الانتقال بين الباقات يعتمد على سقف الإيرادات السنوية وقد يتطلب ترقية مفاجئة',
    ],
    featureSupport: {
      'واجهة عربية كاملة': 'no',
      'دعم RTL': 'partial',
      'مدى (Mada)': 'no',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'تاب للمدفوعات': 'no',
      'دعم عربي 24/7': 'no',
      'شحن Aramex/SMSA مدمج': 'no',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'magento',
    nameAr: 'ماجنتو',
    nameEn: 'Magento',
    origin: 'Global',
    logo: '/logos/magento.svg',
    brandColor: '#F26322',
    websiteUrl: 'https://business.adobe.com/products/magento/magento-commerce.html',
    affiliateUrl: '',
    cookieDurationDays: 30,
    commissionInfo: null,
    rating: 3.5,
    setupFeeSAR: 37500,
    isEnterprise: true,
    warningThresholdSAR: 1875000,
    warningTextAr: 'ماجنتو غير مناسب اقتصادياً لهذا الحجم من الإيرادات. ننصح بـ سلة أو زد.',
    descriptionAr:
      'ماجنتو (أدوبي كوميرس) منصة مفتوحة المصدر مخصصة للمؤسسات الكبرى، توفر مرونة هائلة في التخصيص والتوسع، لكنها تتطلب فريق تطوير متخصص وتكاليف تشغيل وصيانة مرتفعة بشكل مستمر.',
    quickVerdictAr:
      'مناسب فقط للمؤسسات الكبرى ذات الإيرادات المرتفعة وفريق تقني داخلي متخصص؛ غير اقتصادي للمتاجر الصغيرة والمتوسطة.',
    bestForTypes: [
      'المؤسسات الكبرى',
      'المتاجر ذات الاحتياجات المعقدة جداً',
      'الشركات التي تملك فريق تطوير داخلي',
    ],
    pricingTiers: [
      {
        name: 'Open Source',
        nameAr: 'مفتوح المصدر',
        minRevenueSAR: 0,
        maxRevenueSAR: null,
        monthlyFeeSAR: 0,
        transactionFeePct: 0,
        perOrderFee: 0,
        maxOrders: null,
        annualRevLimitSAR: null,
        sortOrder: 1,
      },
    ],
    // All core costs are required for a production deployment;
    // commercial add-ons/licenses are optional.
    hiddenCosts: [
      {
        labelAr: 'استضافة VPS / Cloud',
        monthlySAR: 750,
        isRequired: true,
        scenarios: [],
        sortOrder: 1,
      },
      {
        labelAr: 'صيانة مطور PHP متخصص',
        monthlySAR: 7500,
        isRequired: true,
        scenarios: [],
        sortOrder: 2,
      },
      {
        labelAr: 'إضافات وتراخيص تجارية',
        monthlySAR: 375,
        isRequired: false,
        scenarios: [],
        sortOrder: 3,
      },
      {
        labelAr: 'أمان + CDN + مراقبة',
        monthlySAR: 188,
        isRequired: true,
        scenarios: [],
        sortOrder: 4,
      },
    ],
    pros: [
      'مرونة وتخصيص غير محدودين على مستوى الكود والبنية',
      'يتحمل أحجام كتالوجات وحركة زوار ضخمة',
      'لا توجد رسوم ترخيص لإصدار المصدر المفتوح',
      'مناسب لتعقيدات B2B والتسعير متعدد المستويات',
    ],
    cons: [
      'تكلفة تشغيل شهرية مرتفعة جداً (استضافة + مطور متخصص)',
      'منحنى تعلم حاد ويتطلب فريق تطوير دائم',
      'لا يوجد دعم عربي رسمي وتكامل محدود مع بوابات الدفع الخليجية',
    ],
    featureSupport: {
      'واجهة عربية كاملة': 'partial',
      'دعم RTL': 'yes',
      'مدى (Mada)': 'partial',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'تاب للمدفوعات': 'partial',
      'دعم عربي 24/7': 'no',
      'شحن Aramex/SMSA مدمج': 'partial',
    } as Record<string, SupportLevel>,
  },
] as const;

// -------------------------------------------------------------
// FEATURE → CATEGORY MAPPING
// -------------------------------------------------------------
const FEATURE_CATEGORY_MAP: Record<string, string> = {
  'واجهة عربية كاملة': 'language-region',
  'دعم RTL': 'language-region',
  'مدى (Mada)': 'gulf-payments',
  'Apple Pay': 'gulf-payments',
  'STC Pay': 'gulf-payments',
  'تاب للمدفوعات': 'gulf-payments',
  'دعم عربي 24/7': 'technical-support',
  'شحن Aramex/SMSA مدمج': 'shipping-logistics',
};

async function main() {
  console.log('🌱 بدء تعبئة قاعدة البيانات...');

  // Clean existing data (idempotent seed) — children first.
  await prisma.platformFeature.deleteMany();
  await prisma.platformPro.deleteMany();
  await prisma.platformCon.deleteMany();
  await prisma.hiddenCost.deleteMany();
  await prisma.pricingTier.deleteMany();
  await prisma.articleAffiliateLink.deleteMany();
  await prisma.platform.deleteMany();
  await prisma.featureCategory.deleteMany();
  await prisma.siteSettings.deleteMany();

  // 1) Feature categories
  const categoryMap = new Map<string, string>(); // slug -> id
  for (const cat of FEATURE_CATEGORIES) {
    const created = await prisma.featureCategory.create({
      data: { nameAr: cat.nameAr, slug: cat.slug, sortOrder: cat.sortOrder },
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log(`✅ تم إنشاء ${FEATURE_CATEGORIES.length} فئات مزايا`);

  // 2) Platforms (with nested tiers, hidden costs, pros, cons)
  for (const p of PLATFORMS) {
    const platform = await prisma.platform.create({
      data: {
        slug: p.slug,
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        origin: p.origin,
        logo: p.logo,
        brandColor: p.brandColor,
        websiteUrl: p.websiteUrl,
        affiliateUrl: p.affiliateUrl,
        cookieDurationDays: p.cookieDurationDays,
        commissionInfo: p.commissionInfo,
        descriptionAr: p.descriptionAr,
        rating: p.rating,
        setupFeeSAR: p.setupFeeSAR,
        warningThresholdSAR: p.warningThresholdSAR,
        warningTextAr: p.warningTextAr,
        isEnterprise: p.isEnterprise,
        quickVerdictAr: p.quickVerdictAr,
        bestForTypes: [...p.bestForTypes],
        pricingTiers: {
          create: p.pricingTiers.map((t) => ({
            name: t.name,
            nameAr: t.nameAr,
            minRevenueSAR: t.minRevenueSAR,
            maxRevenueSAR: t.maxRevenueSAR,
            monthlyFeeSAR: t.monthlyFeeSAR,
            transactionFeePct: t.transactionFeePct,
            perOrderFee: t.perOrderFee,
            maxOrders: t.maxOrders,
            annualRevLimitSAR: t.annualRevLimitSAR,
            sortOrder: t.sortOrder,
          })),
        },
        hiddenCosts: {
          create: p.hiddenCosts.map((h) => ({
            labelAr: h.labelAr,
            monthlySAR: h.monthlySAR,
            isRequired: h.isRequired,
            scenarios: [...h.scenarios],
            sortOrder: h.sortOrder,
          })),
        },
        pros: {
          create: p.pros.map((textAr, i) => ({ textAr, sortOrder: i + 1 })),
        },
        cons: {
          create: p.cons.map((textAr, i) => ({ textAr, sortOrder: i + 1 })),
        },
      },
    });

    // 3) Feature matrix rows for this platform
    for (const [featureNameAr, supported] of Object.entries(p.featureSupport)) {
      const categorySlug = FEATURE_CATEGORY_MAP[featureNameAr];
      const categoryId = categoryMap.get(categorySlug);
      if (!categoryId) {
        throw new Error(`لا توجد فئة لخاصية: ${featureNameAr}`);
      }
      await prisma.platformFeature.create({
        data: {
          platformId: platform.id,
          categoryId,
          featureNameAr,
          supported,
        },
      });
    }

    console.log(`✅ تم إنشاء منصة: ${p.nameAr} (${p.slug})`);
  }

  // 4) Site settings (single row)
  await prisma.siteSettings.create({
    data: {
      siteNameAr: 'دليل المتاجر',
      taglineAr: 'المرجع الأول عربياً لمقارنة منصات التجارة الإلكترونية',
      contactEmail: 'info@daleel-almatajir.com',
      twitterUrl: null,
      linkedinUrl: null,
      youtubeUrl: null,
      disclosureTextAr:
        'دليل المتاجر موقع مستقل، وقد نحصل على عمولة من بعض الروابط التابعة في هذا الموقع دون أي تكلفة إضافية عليك. هذا لا يؤثر على تقييماتنا أو ترتيب المقارنات، والتي تستند إلى أسعار ومزايا حقيقية لكل منصة.',
      defaultMetaTitle: 'دليل المتاجر — مقارنة منصات التجارة الإلكترونية في السعودية ٢٠٢٦',
      defaultMetaDesc:
        'قارن بين سلة، زد، شوبيفاي، ووكومرس، بيغ كومرس وماجنتو من حيث الأسعار والمزايا، واحسب التكلفة الفعلية لمتجرك بالريال السعودي.',
    },
  });
  console.log('✅ تم إنشاء إعدادات الموقع');

  console.log('🎉 اكتملت تعبئة قاعدة البيانات بنجاح');
}

main()
  .catch((e) => {
    console.error('❌ فشل في تعبئة قاعدة البيانات:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
