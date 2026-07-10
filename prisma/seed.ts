// =============================================================
// Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± (Daleel Al-Matajir) â Database Seed
// Seeds: feature categories, 6 platforms, pricing tiers,
// hidden costs, feature matrix, pros/cons, site settings.
// =============================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// -------------------------------------------------------------
// FEATURE CATEGORIES
// -------------------------------------------------------------
const FEATURE_CATEGORIES = [
  { slug: 'language-region', nameAr: 'Ø§ÙÙØºØ© ÙØ§ÙÙÙØ·ÙØ©', sortOrder: 1 },
  { slug: 'gulf-payments', nameAr: 'Ø¨ÙØ§Ø¨Ø§Øª Ø§ÙØ¯ÙØ¹ Ø§ÙØ®ÙÙØ¬ÙØ©', sortOrder: 2 },
  { slug: 'shipping-logistics', nameAr: 'Ø§ÙØ´Ø­Ù ÙØ§ÙÙÙØ¬Ø³ØªÙØ§Øª', sortOrder: 3 },
  { slug: 'marketing-analytics', nameAr: 'Ø§ÙØªØ³ÙÙÙ ÙØ§ÙØªØ­ÙÙÙ', sortOrder: 4 },
  { slug: 'multichannel-sales', nameAr: 'Ø§ÙÙØ¨ÙØ¹Ø§Øª ÙØªØ¹Ø¯Ø¯Ø© Ø§ÙÙÙÙØ§Øª', sortOrder: 5 },
  { slug: 'tech-performance', nameAr: 'Ø§ÙØªÙÙÙØ© ÙØ§ÙØ£Ø¯Ø§Ø¡', sortOrder: 6 },
  { slug: 'technical-support', nameAr: 'Ø§ÙØ¯Ø¹Ù Ø§ÙÙÙÙ', sortOrder: 7 },
] as const;

// -------------------------------------------------------------
// PLATFORMS
// -------------------------------------------------------------
type SupportLevel = 'yes' | 'no' | 'partial';

const PLATFORMS = [
  {
    slug: 'salla',
    nameAr: 'Ø³ÙØ©',
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
      'Ø³ÙØ© ÙÙ ÙÙØµØ© Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© Ø§ÙØ±Ø§Ø¦Ø¯Ø© ÙÙ Ø§ÙÙÙÙÙØ© Ø§ÙØ¹Ø±Ø¨ÙØ© Ø§ÙØ³Ø¹ÙØ¯ÙØ©Ø ØµÙÙÙØª Ø®ØµÙØµØ§Ù ÙÙØ³ÙÙ Ø§ÙØ®ÙÙØ¬Ù ÙØ¹ Ø¯Ø¹Ù ÙØ§ÙÙ ÙÙØºØ© Ø§ÙØ¹Ø±Ø¨ÙØ© ÙØ¨ÙØ§Ø¨Ø§Øª Ø§ÙØ¯ÙØ¹ Ø§ÙÙØ­ÙÙØ©.',
    quickVerdictAr:
      'Ø§ÙØ®ÙØ§Ø± Ø§ÙØ£ÙØ¶Ù ÙÙØªØ¬Ø§Ø± Ø§ÙØ³Ø¹ÙØ¯ÙÙÙ Ø§ÙØ¨Ø§Ø­Ø«ÙÙ Ø¹Ù ÙÙØµØ© Ø¹Ø±Ø¨ÙØ© ÙØªÙØ§ÙÙØ© Ø¨Ø¯ÙÙ Ø±Ø³ÙÙ Ø¹ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª ÙÙ Ø¬ÙÙØ¹ Ø§ÙØ¨Ø§ÙØ§ØªØ ÙØ¹ Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù Ø¹ÙÙ ÙØ¯Ø§Ø± Ø§ÙØ³Ø§Ø¹Ø©.',
    bestForTypes: ['ØªØ¬Ø§Ø± Ø§ÙØªØ¬Ø²Ø¦Ø©', 'Ø§ÙØ£Ø²ÙØ§Ø¡ ÙØ§ÙØ¥ÙØ³Ø³ÙØ§Ø±Ø§Øª', 'ÙØªØ§Ø¬Ø± ØªØ¨Ø¯Ø£ ÙÙ Ø§ÙØ³Ø¹ÙØ¯ÙØ©'],
    pricingTiers: [
      {
        name: 'Basic',
        nameAr: 'Ø£Ø³Ø§Ø³Ù',
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
        nameAr: 'Ø§Ø­ØªØ±Ø§ÙÙ',
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
        nameAr: 'ÙØªÙØ¯Ù',
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
      'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù ÙØ§ÙÙ Ø¹ÙÙ ÙØ¯Ø§Ø± Ø§ÙØ³Ø§Ø¹Ø©',
      'ØªÙØ§ÙÙ ÙØ¨Ø§Ø´Ø± ÙØ¹ Ø¨ÙØ§Ø¨Ø§Øª Ø§ÙØ¯ÙØ¹ Ø§ÙØ³Ø¹ÙØ¯ÙØ© ÙØ«Ù ÙØ¯Ù ÙØ¢Ø¨Ù Ø¨Ø§Ù ÙSTC Pay',
      'Ø¨Ø¯ÙÙ Ø±Ø³ÙÙ Ø¹ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª ÙÙ Ø¬ÙÙØ¹ Ø§ÙØ¨Ø§ÙØ§Øª',
      'Ø´Ø­Ù ÙØªÙØ§ÙÙ ÙØ¹ Ø£Ø±Ø§ÙÙØ³ ÙØ³ÙØ³Ø§ Ø¥ÙØ³Ø¨Ø±Ø³',
    ],
    cons: [
      'ØªØ®ØµÙØµ Ø§ÙØªØµÙÙÙ ÙØ­Ø¯ÙØ¯ ÙÙØ§Ø±ÙØ© Ø¨ÙÙØµØ§Øª ÙÙØªÙØ­Ø© Ø§ÙÙØµØ¯Ø±',
      'Ø§ÙØªÙØ³Ø¹ ÙÙØ£Ø³ÙØ§Ù Ø§ÙØ¹Ø§ÙÙÙØ© Ø£ÙÙ ÙØ±ÙÙØ© ÙÙ Ø´ÙØ¨ÙÙØ§Ù',
      'Ø¨Ø¹Ø¶ Ø§ÙØªØ·Ø¨ÙÙØ§Øª Ø§ÙØ¥Ø¶Ø§ÙÙØ© ÙÙ Ø§ÙÙØªØ¬Ø± Ø¨Ø±Ø³ÙÙ Ø´ÙØ±ÙØ© ÙÙÙØµÙØ©',
    ],
    featureSupport: {
      'ÙØ§Ø¬ÙØ© Ø¹Ø±Ø¨ÙØ© ÙØ§ÙÙØ©': 'yes',
      'Ø¯Ø¹Ù RTL': 'yes',
      'ÙØ¯Ù (Mada)': 'yes',
      'Apple Pay': 'yes',
      'STC Pay': 'yes',
      'ØªØ§Ø¨ ÙÙÙØ¯ÙÙØ¹Ø§Øª': 'yes',
      'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù 24/7': 'yes',
      'Ø´Ø­Ù Aramex/SMSA ÙØ¯ÙØ¬': 'yes',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'zid',
    nameAr: 'Ø²Ø¯',
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
      'Ø²Ø¯ ÙÙØµØ© ØªØ¬Ø§Ø±Ø© Ø¥ÙÙØªØ±ÙÙÙØ© Ø³Ø¹ÙØ¯ÙØ© ØªÙØ§ÙØ³ Ø³ÙØ© Ø¨Ø´ÙÙ ÙØ¨Ø§Ø´Ø±Ø ÙØªÙÙØ± Ø¨Ø§ÙØ§Øª ÙØ±ÙØ© ÙØ¯Ø¹ÙØ§Ù ÙÙÙØ§Ù ÙÙØ³ÙÙ Ø§ÙØ®ÙÙØ¬Ù ÙØ¹ Ø£Ø¯ÙØ§Øª ØªØ³ÙÙÙ ÙØªØ­ÙÙÙ ÙØªÙØ¯ÙØ©.',
    quickVerdictAr:
      'Ø¨Ø¯ÙÙ ÙÙÙ ÙØ³ÙØ© Ø¨Ø³Ø¹Ø± Ø¯Ø®ÙÙ ÙÙØ§ÙØ³ ÙØ£Ø¯ÙØ§Øª ØªØ³ÙÙÙ ÙØªØ­ÙÙÙ Ø¥Ø¶Ø§ÙÙØ©Ø ÙÙØ§Ø³Ø¨ ÙÙÙØªØ§Ø¬Ø± Ø§ÙØªÙ ØªØ®Ø·Ø· ÙÙÙÙÙ Ø§ÙØ³Ø±ÙØ¹.',
    bestForTypes: ['ÙØªØ§Ø¬Ø± Ø§ÙÙÙÙ Ø§ÙØ³Ø±ÙØ¹', 'Ø§ÙØ¹ÙØ§ÙØ§Øª Ø§ÙØªØ¬Ø§Ø±ÙØ© Ø§ÙÙØ§Ø´Ø¦Ø©', 'ÙØªØ§Ø¬Ø± Ø§ÙØ¬ÙÙØ© ÙØ§ÙØªØ¬Ø²Ø¦Ø©'],
    pricingTiers: [
      {
        name: 'Starter',
        nameAr: 'Ø§Ø¨ØªØ¯Ø§Ø¦Ù',
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
        nameAr: 'ÙÙÙ',
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
        nameAr: 'Ø¨Ø±ÙÙÙÙÙ',
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
      'Ø¨Ø§ÙØ© Ø§Ø¨ØªØ¯Ø§Ø¦ÙØ© Ø¨Ø³Ø¹Ø± ØªÙØ§ÙØ³Ù ÙÙÙ ÙØ¨Ø¯Ø£ ÙÙØªÙ',
      'Ø£Ø¯ÙØ§Øª ØªØ³ÙÙÙ ÙØªØ­ÙÙÙ ÙØªÙØ¯ÙØ© ÙØ¯ÙØ¬Ø©',
      'Ø¯Ø¹Ù ÙØ§ÙÙ ÙÙØºØ© Ø§ÙØ¹Ø±Ø¨ÙØ© ÙRTL',
      'ØªÙØ§ÙÙ ÙØ¹ ÙØ³Ø§Ø¦Ù Ø§ÙØ¯ÙØ¹ Ø§ÙÙØ­ÙÙØ© Ø§ÙØ´Ø§Ø¦Ø¹Ø©',
    ],
    cons: [
      'Ø§ÙØ¨Ø§ÙØ© Ø§ÙØ§Ø¨ØªØ¯Ø§Ø¦ÙØ© ØªØªØ¶ÙÙ ÙØ³Ø¨Ø© 0.5% Ø¹ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª',
      'Ø¹Ø¯Ø¯ Ø§ÙØªØ·Ø¨ÙÙØ§Øª ÙØ§ÙØ¥Ø¶Ø§ÙØ§Øª ÙÙ Ø§ÙØ³ÙÙ Ø£ÙÙ ÙÙ Ø³ÙØ©',
      'Ø­Ø¯ Ø£ÙØµÙ ÙØ¹Ø¯Ø¯ Ø§ÙØ·ÙØ¨Ø§Øª ÙÙ Ø§ÙØ¨Ø§ÙØ§Øª Ø§ÙØ£ÙÙ',
    ],
    featureSupport: {
      'ÙØ§Ø¬ÙØ© Ø¹Ø±Ø¨ÙØ© ÙØ§ÙÙØ©': 'yes',
      'Ø¯Ø¹Ù RTL': 'yes',
      'ÙØ¯Ù (Mada)': 'yes',
      'Apple Pay': 'yes',
      'STC Pay': 'yes',
      'ØªØ§Ø¨ ÙÙÙØ¯ÙÙØ¹Ø§Øª': 'yes',
      'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù 24/7': 'yes',
      'Ø´Ø­Ù Aramex/SMSA ÙØ¯ÙØ¬': 'yes',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'shopify',
    nameAr: 'Ø´ÙØ¨ÙÙØ§Ù',
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
      'Ø´ÙØ¨ÙÙØ§Ù ÙÙØµØ© ØªØ¬Ø§Ø±Ø© Ø¥ÙÙØªØ±ÙÙÙØ© Ø¹Ø§ÙÙÙØ© Ø±Ø§Ø¦Ø¯Ø©Ø ØªÙÙØ± ÙØ±ÙÙØ© ÙØ¨ÙØ±Ø© ÙÙ Ø§ÙØªØµÙÙÙ ÙØªØ·Ø¨ÙÙØ§Øª ÙØ§ Ø­ØµØ± ÙÙØ§ ÙØ§ÙØªÙØ³Ø¹ Ø§ÙØ¯ÙÙÙØ ÙÙÙÙØ§ ØªØ­ØªØ§Ø¬ Ø¥ÙÙ ØªØ·Ø¨ÙÙØ§Øª Ø¥Ø¶Ø§ÙÙØ© ÙØ¯Ø¹Ù Ø§ÙØ³ÙÙ Ø§ÙØ®ÙÙØ¬Ù Ø¨Ø´ÙÙ ÙØ§ÙÙ.',
    quickVerdictAr:
      'Ø§ÙØ£ÙØ¶Ù ÙÙÙØªØ§Ø¬Ø± Ø§ÙØªÙ ØªØ¨ÙØ¹ Ø¯ÙÙÙØ§Ù Ø£Ù ØªØ­ØªØ§Ø¬ Ø¥ÙÙ ØªØ®ØµÙØµ ØªØµÙÙÙ ÙØªÙØ¯ÙØ ÙØ¹ Ø§ÙØ£Ø®Ø° Ø¨Ø§ÙØ§Ø¹ØªØ¨Ø§Ø± Ø±Ø³ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª Ø¹ÙÙ Ø§ÙØ¨Ø§ÙØ§Øª Ø§ÙØ£ÙÙ.',
    bestForTypes: [
      'Ø§ÙÙØªØ§Ø¬Ø± Ø§ÙØªÙ ØªØ³ØªÙØ¯Ù Ø£Ø³ÙØ§ÙØ§Ù Ø¹Ø§ÙÙÙØ©',
      'Ø§ÙØ¹ÙØ§ÙØ§Øª Ø§ÙØªØ¬Ø§Ø±ÙØ© ÙØªØ¹Ø¯Ø¯Ø© Ø§ÙØ¯ÙÙ',
      'ÙØªØ§Ø¬Ø± ØªØ­ØªØ§Ø¬ ØªØ®ØµÙØµØ§Ù ØªØµÙÙÙÙØ§Ù Ø¹Ø§ÙÙØ§Ù',
    ],
    // NOTE: Shopify tier selection is cost-based (see calculator SECTION 3),
    // not revenue-range based â all tiers have minRevenueSAR: 0, maxRevenueSAR: null,
    // and the calculator picks whichever yields the lowest total monthly cost.
    pricingTiers: [
      {
        name: 'Basic',
        nameAr: 'Ø§ÙØ£Ø³Ø§Ø³Ù',
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
        nameAr: 'Ø´ÙØ¨ÙÙØ§Ù',
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
        nameAr: 'Ø§ÙÙØªÙØ¯Ù',
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
      'ÙÙØªØ¨Ø© ØªØ·Ø¨ÙÙØ§Øª ÙÙÙØ§ÙØ¨ Ø¶Ø®ÙØ© ÙØªØ®ØµÙØµ Ø§ÙÙØªØ¬Ø±',
      'Ø£Ø¯Ø§Ø¡ ÙÙÙØ«ÙÙÙØ© Ø¹Ø§ÙÙØ© ÙØ¹ ØªÙØ³Ø¹ Ø¯ÙÙÙ Ø³ÙÙ',
      'Ø¯Ø¹Ù RTL Ø£Ø³Ø§Ø³Ù ÙØªÙØ§ÙÙ ÙØ¹ Ø¢Ø¨Ù Ø¨Ø§Ù',
      'ÙÙØ§Ø³Ø¨Ø© ÙÙØ¨ÙØ¹ Ø¹Ø¨Ø± ÙÙÙØ§Øª ÙØªØ¹Ø¯Ø¯Ø© (Ø§ÙØ³ØªÙØ±Ø§ÙØ ØªÙÙ ØªÙÙØ Ø£ÙØ§Ø²ÙÙ)',
    ],
    cons: [
      'ÙØ§ ÙÙØ¬Ø¯ Ø¯Ø¹Ù ÙØ¨Ø§Ø´Ø± ÙÙØ¯Ù Ø£Ù STC Pay Ø¯ÙÙ Ø¨ÙØ§Ø¨Ø§Øª Ø·Ø±Ù Ø«Ø§ÙØ«',
      'Ø±Ø³ÙÙ Ø¹ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª ÙÙ Ø§ÙØ¨Ø§ÙØªÙÙ Ø§ÙØ£ÙÙ',
      'Ø§ÙØ¯Ø¹Ù Ø§ÙØ¹Ø±Ø¨Ù Ø§ÙÙØ¨Ø§Ø´Ø± ÙÙ Ø´ÙØ¨ÙÙØ§Ù ÙØ­Ø¯ÙØ¯',
    ],
    featureSupport: {
      'ÙØ§Ø¬ÙØ© Ø¹Ø±Ø¨ÙØ© ÙØ§ÙÙØ©': 'partial',
      'Ø¯Ø¹Ù RTL': 'yes',
      'ÙØ¯Ù (Mada)': 'no',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'ØªØ§Ø¨ ÙÙÙØ¯ÙÙØ¹Ø§Øª': 'partial',
      'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù 24/7': 'no',
      'Ø´Ø­Ù Aramex/SMSA ÙØ¯ÙØ¬': 'partial',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'woocommerce',
    nameAr: 'ÙÙÙÙÙØ±Ø³',
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
      'ÙÙÙÙÙØ±Ø³ Ø¥Ø¶Ø§ÙØ© ÙÙØªÙØ­Ø© Ø§ÙÙØµØ¯Ø± ÙÙÙØµØ© ÙÙØ±Ø¯Ø¨Ø±ÙØ³Ø ØªÙÙØ± Ø­Ø±ÙØ© ØªØµÙÙÙ ÙØªØ®ØµÙØµ ØºÙØ± ÙØ­Ø¯ÙØ¯Ø© Ø¯ÙÙ Ø±Ø³ÙÙ ØªØ±Ø®ÙØµØ ÙÙÙÙØ§ ØªØªØ·ÙØ¨ Ø¥Ø¯Ø§Ø±Ø© ØªÙÙÙØ© ÙØªÙØ§ÙÙÙ Ø§Ø³ØªØ¶Ø§ÙØ© ÙØ¥Ø¶Ø§ÙØ§Øª ÙØµÙØ§ÙØ© ÙÙÙØµÙØ©.',
    quickVerdictAr:
      'ÙÙØ§Ø³Ø¨ ÙÙÙ ÙÙÙÙ Ø®Ø¨Ø±Ø© ØªÙÙÙØ© Ø£Ù ÙØ±ÙÙ Ø¯Ø¹Ù ÙÙØ±ØºØ¨ Ø¨Ø§ÙØªØ­ÙÙ Ø§ÙÙØ§ÙÙ ÙÙ ÙØªØ¬Ø±ÙØ ÙØ¹ Ø¶Ø±ÙØ±Ø© Ø§Ø­ØªØ³Ø§Ø¨ Ø§ÙØªÙØ§ÙÙÙ Ø§ÙØ®ÙÙØ© ÙÙØ§Ø³ØªØ¶Ø§ÙØ© ÙØ§ÙØ¥Ø¶Ø§ÙØ§Øª ÙØ§ÙØµÙØ§ÙØ©.',
    bestForTypes: [
      'Ø§ÙÙØ·ÙØ±ÙÙ ÙØ£ØµØ­Ø§Ø¨ Ø§ÙØ®Ø¨Ø±Ø© Ø§ÙØªÙÙÙØ©',
      'Ø§ÙÙØªØ§Ø¬Ø± Ø§ÙØªÙ ØªØ­ØªØ§Ø¬ ØªØ®ØµÙØµØ§Ù ÙØ§ÙÙØ§Ù',
      'Ø§ÙÙØ´Ø§Ø±ÙØ¹ ÙÙØ®ÙØ¶Ø© Ø§ÙÙÙØ²Ø§ÙÙØ© ÙÙ Ø§ÙØ¨Ø¯Ø§ÙØ©',
    ],
    pricingTiers: [
      {
        name: 'Free',
        nameAr: 'ÙØ¬Ø§ÙÙ',
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
    // 3 selectable scenarios â see SECTION 3 "WOOCOMMERCE SCENARIO LOGIC".
    // minimal  = hosting + ssl                     = 263 SAR/mo
    // typical  = hosting + ssl + plugins + maint.  = 788 SAR/mo (default)
    // managed  = all of the above + managed addon  = 1,163 SAR/mo
    hiddenCosts: [
      {
        labelAr: 'Ø§Ø³ØªØ¶Ø§ÙØ©',
        monthlySAR: 188,
        isRequired: true,
        scenarios: ['minimal', 'typical', 'managed'],
        sortOrder: 1,
      },
      {
        labelAr: 'Ø´ÙØ§Ø¯Ø© SSL ÙØ´Ø¨ÙØ© ØªÙØµÙÙ Ø§ÙÙØ­ØªÙÙ (CDN)',
        monthlySAR: 75,
        isRequired: true,
        scenarios: ['minimal', 'typical', 'managed'],
        sortOrder: 2,
      },
      {
        labelAr: 'Ø¥Ø¶Ø§ÙØ§Øª ÙÙÙØ§ÙØ¨ ÙØ¯ÙÙØ¹Ø©',
        monthlySAR: 150,
        isRequired: false,
        scenarios: ['typical', 'managed'],
        sortOrder: 3,
      },
      {
        labelAr: 'ØµÙØ§ÙØ© Ø¯ÙØ±ÙØ© ÙØ¯Ø¹Ù ØªÙÙÙ',
        monthlySAR: 375,
        isRequired: false,
        scenarios: ['typical', 'managed'],
        sortOrder: 4,
      },
      {
        labelAr: 'Ø§Ø³ØªØ¶Ø§ÙØ© ÙØ§Ø³ØªØ¶Ø§ÙØ© ÙÙØ¯Ø§Ø±Ø© ÙØªÙØ¯ÙØ©',
        monthlySAR: 375,
        isRequired: false,
        scenarios: ['managed'],
        sortOrder: 5,
      },
    ],
    pros: [
      'ØªØ­ÙÙ ÙØ§ÙÙ Ø¨Ø§ÙÙÙØ¯ ÙØ§ÙØªØµÙÙÙ Ø¨Ø¯ÙÙ ÙÙÙØ¯',
      'ÙØ§ ØªÙØ¬Ø¯ Ø±Ø³ÙÙ ØªØ±Ø®ÙØµ Ø£Ù Ø±Ø³ÙÙ Ø¹ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª ÙÙ ÙÙÙÙÙØ±Ø³ ÙÙØ³ÙØ§',
      'Ø¢ÙØ§Ù Ø§ÙØ¥Ø¶Ø§ÙØ§Øª ÙØ§ÙÙÙØ§ÙØ¨ ÙÙ ÙØµØ§Ø¯Ø± ÙØªØ¹Ø¯Ø¯Ø©',
      'Ø¯Ø¹Ù RTL Ø¬ÙØ¯ Ø¹Ø¨Ø± Ø¥Ø¶Ø§ÙØ§Øª Ø¹Ø±Ø¨ÙØ© ÙØªØ®ØµØµØ©',
    ],
    cons: [
      'ÙØªØ·ÙØ¨ Ø¥Ø¯Ø§Ø±Ø© Ø§ÙØ§Ø³ØªØ¶Ø§ÙØ© ÙØ§ÙØªØ­Ø¯ÙØ«Ø§Øª ÙØ§ÙØ£ÙØ§Ù Ø¨Ø´ÙÙ ÙØ³ØªÙÙ',
      'Ø§ÙØªÙØ§ÙÙÙ Ø§ÙØ®ÙÙØ© (Ø§Ø³ØªØ¶Ø§ÙØ©Ø Ø¥Ø¶Ø§ÙØ§ØªØ ØµÙØ§ÙØ©) ÙØ¯ ØªØªØ¬Ø§ÙØ² Ø¨Ø§ÙØ§Øª Ø§ÙÙÙØµØ§Øª Ø§ÙØ¬Ø§ÙØ²Ø©',
      'ÙØ§ ÙÙØ¬Ø¯ Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù Ø±Ø³ÙÙ 24/7 ÙÙ ÙÙÙÙÙØ±Ø³',
    ],
    featureSupport: {
      'ÙØ§Ø¬ÙØ© Ø¹Ø±Ø¨ÙØ© ÙØ§ÙÙØ©': 'partial',
      'Ø¯Ø¹Ù RTL': 'yes',
      'ÙØ¯Ù (Mada)': 'partial',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'ØªØ§Ø¨ ÙÙÙØ¯ÙÙØ¹Ø§Øª': 'partial',
      'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù 24/7': 'no',
      'Ø´Ø­Ù Aramex/SMSA ÙØ¯ÙØ¬': 'partial',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'bigcommerce',
    nameAr: 'Ø¨ÙØº ÙÙÙØ±Ø³',
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
      'Ø¨ÙØº ÙÙÙØ±Ø³ ÙÙØµØ© Ø¹Ø§ÙÙÙØ© ØªØ³ØªÙØ¯Ù Ø§ÙØ´Ø±ÙØ§Øª ÙØªÙØ³Ø·Ø© ÙÙØ¨ÙØ±Ø© Ø§ÙØ­Ø¬ÙØ ØªØ¹ØªÙØ¯ Ø¨Ø§ÙØ§ØªÙØ§ Ø¹ÙÙ Ø³ÙÙ Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª Ø§ÙØ³ÙÙÙØ© Ø¨Ø¯ÙØ§Ù ÙÙ Ø±Ø³ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§ØªØ ÙØ¹ Ø£Ø¯ÙØ§Øª ÙÙÙØ© ÙÙØ¨ÙØ¹ ÙØªØ¹Ø¯Ø¯ Ø§ÙÙÙÙØ§Øª ÙB2B.',
    quickVerdictAr:
      'Ø®ÙØ§Ø± ÙÙÙ ÙÙØ´Ø±ÙØ§Øª ÙØªÙØ³Ø·Ø© Ø§ÙØ­Ø¬Ù Ø°Ø§Øª Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª Ø§ÙØ³ÙÙÙØ© Ø§ÙÙØ±ØªÙØ¹Ø© Ø§ÙØªÙ ØªØ¨Ø­Ø« Ø¹Ù ÙÙØµØ© Ø¨Ø¯ÙÙ Ø±Ø³ÙÙ ÙØ¹Ø§ÙÙØ§ØªØ ÙÙÙ Ø¯Ø¹ÙÙØ§ ÙÙØ³ÙÙ Ø§ÙØ¹Ø±Ø¨Ù ÙØ§ÙØ®ÙÙØ¬Ù ÙØ­Ø¯ÙØ¯.',
    bestForTypes: ['Ø§ÙØ´Ø±ÙØ§Øª ÙØªÙØ³Ø·Ø© Ø§ÙØ­Ø¬Ù', 'Ø§ÙÙØªØ§Ø¬Ø± Ø¨Ø¥ÙØ±Ø§Ø¯Ø§Øª Ø³ÙÙÙØ© ÙØ±ØªÙØ¹Ø©', 'ÙØªØ§Ø¬Ø± B2B'],
    pricingTiers: [
      {
        name: 'Standard',
        nameAr: 'Ø§ÙØ£Ø³Ø§Ø³Ù',
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
        nameAr: 'Ø§ÙÙØªÙØ¯Ù',
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
        nameAr: 'Ø§ÙØ§Ø­ØªØ±Ø§ÙÙ',
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
        nameAr: 'Ø§ÙÙØ¤Ø³Ø³Ù',
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
      'Ø¨Ø¯ÙÙ Ø±Ø³ÙÙ Ø¹ÙÙ Ø§ÙÙØ¹Ø§ÙÙØ§Øª ÙÙ Ø¬ÙÙØ¹ Ø§ÙØ¨Ø§ÙØ§Øª',
      'Ø£Ø¯ÙØ§Øª ÙÙÙØ© ÙÙØ¨ÙØ¹ ÙØªØ¹Ø¯Ø¯ Ø§ÙÙÙÙØ§Øª ÙØ§ÙÙB2B',
      'Ø£Ø¯Ø§Ø¡ ÙØ£ÙØ§Ù Ø¹ÙÙ ÙØ³ØªÙÙ Ø§ÙÙØ¤Ø³Ø³Ø§Øª',
      'ØªÙØ§ÙÙ ÙØ§Ø³Ø¹ ÙØ¹ ØªØ·Ø¨ÙÙØ§Øª Ø§ÙØ´Ø­Ù ÙØ§ÙØ¯ÙØ¹ Ø§ÙØ¹Ø§ÙÙÙØ©',
    ],
    cons: [
      'ÙØ§ ÙÙØ¬Ø¯ Ø¯Ø¹Ù ÙØ¨Ø§Ø´Ø± ÙÙØ¯Ù Ø£Ù STC Pay Ø£Ù ØªØ§Ø¨',
      'Ø§ÙÙØ§Ø¬ÙØ© ÙØ§ÙÙØ«Ø§Ø¦Ù ØºÙØ± ÙØªÙÙØ±Ø© Ø¨Ø§ÙØ¹Ø±Ø¨ÙØ©',
      'Ø§ÙØ§ÙØªÙØ§Ù Ø¨ÙÙ Ø§ÙØ¨Ø§ÙØ§Øª ÙØ¹ØªÙØ¯ Ø¹ÙÙ Ø³ÙÙ Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª Ø§ÙØ³ÙÙÙØ© ÙÙØ¯ ÙØªØ·ÙØ¨ ØªØ±ÙÙØ© ÙÙØ§Ø¬Ø¦Ø©',
    ],
    featureSupport: {
      'ÙØ§Ø¬ÙØ© Ø¹Ø±Ø¨ÙØ© ÙØ§ÙÙØ©': 'no',
      'Ø¯Ø¹Ù RTL': 'partial',
      'ÙØ¯Ù (Mada)': 'no',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'ØªØ§Ø¨ ÙÙÙØ¯ÙÙØ¹Ø§Øª': 'no',
      'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù 24/7': 'no',
      'Ø´Ø­Ù Aramex/SMSA ÙØ¯ÙØ¬': 'no',
    } as Record<string, SupportLevel>,
  },
  {
    slug: 'magento',
    nameAr: 'ÙØ§Ø¬ÙØªÙ',
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
    warningTextAr: 'ÙØ§Ø¬ÙØªÙ ØºÙØ± ÙÙØ§Ø³Ø¨ Ø§ÙØªØµØ§Ø¯ÙØ§Ù ÙÙØ°Ø§ Ø§ÙØ­Ø¬Ù ÙÙ Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª. ÙÙØµØ­ Ø¨Ù Ø³ÙØ© Ø£Ù Ø²Ø¯.',
    descriptionAr:
      'ÙØ§Ø¬ÙØªÙ (Ø£Ø¯ÙØ¨Ù ÙÙÙÙØ±Ø³) ÙÙØµØ© ÙÙØªÙØ­Ø© Ø§ÙÙØµØ¯Ø± ÙØ®ØµØµØ© ÙÙÙØ¤Ø³Ø³Ø§Øª Ø§ÙÙØ¨Ø±ÙØ ØªÙÙØ± ÙØ±ÙÙØ© ÙØ§Ø¦ÙØ© ÙÙ Ø§ÙØªØ®ØµÙØµ ÙØ§ÙØªÙØ³Ø¹Ø ÙÙÙÙØ§ ØªØªØ·ÙØ¨ ÙØ±ÙÙ ØªØ·ÙÙØ± ÙØªØ®ØµØµ ÙØªÙØ§ÙÙÙ ØªØ´ØºÙÙ ÙØµÙØ§ÙØ© ÙØ±ØªÙØ¹Ø© Ø¨Ø´ÙÙ ÙØ³ØªÙØ±.',
    quickVerdictAr:
      'ÙÙØ§Ø³Ø¨ ÙÙØ· ÙÙÙØ¤Ø³Ø³Ø§Øª Ø§ÙÙØ¨Ø±Ù Ø°Ø§Øª Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª Ø§ÙÙØ±ØªÙØ¹Ø© ÙÙØ±ÙÙ ØªÙÙÙ Ø¯Ø§Ø®ÙÙ ÙØªØ®ØµØµØ ØºÙØ± Ø§ÙØªØµØ§Ø¯Ù ÙÙÙØªØ§Ø¬Ø± Ø§ÙØµØºÙØ±Ø© ÙØ§ÙÙØªÙØ³Ø·Ø©.',
    bestForTypes: [
      'Ø§ÙÙØ¤Ø³Ø³Ø§Øª Ø§ÙÙØ¨Ø±Ù',
      'Ø§ÙÙØªØ§Ø¬Ø± Ø°Ø§Øª Ø§ÙØ§Ø­ØªÙØ§Ø¬Ø§Øª Ø§ÙÙØ¹ÙØ¯Ø© Ø¬Ø¯Ø§Ù',
      'Ø§ÙØ´Ø±ÙØ§Øª Ø§ÙØªÙ ØªÙÙÙ ÙØ±ÙÙ ØªØ·ÙÙØ± Ø¯Ø§Ø®ÙÙ',
    ],
    pricingTiers: [
      {
        name: 'Open Source',
        nameAr: 'ÙÙØªÙØ­ Ø§ÙÙØµØ¯Ø±',
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
        labelAr: 'Ø§Ø³ØªØ¶Ø§ÙØ© VPS / Cloud',
        monthlySAR: 750,
        isRequired: true,
        scenarios: [],
        sortOrder: 1,
      },
      {
        labelAr: 'ØµÙØ§ÙØ© ÙØ·ÙØ± PHP ÙØªØ®ØµØµ',
        monthlySAR: 7500,
        isRequired: true,
        scenarios: [],
        sortOrder: 2,
      },
      {
        labelAr: 'Ø¥Ø¶Ø§ÙØ§Øª ÙØªØ±Ø§Ø®ÙØµ ØªØ¬Ø§Ø±ÙØ©',
        monthlySAR: 375,
        isRequired: false,
        scenarios: [],
        sortOrder: 3,
      },
      {
        labelAr: 'Ø£ÙØ§Ù + CDN + ÙØ±Ø§ÙØ¨Ø©',
        monthlySAR: 188,
        isRequired: true,
        scenarios: [],
        sortOrder: 4,
      },
    ],
    pros: [
      'ÙØ±ÙÙØ© ÙØªØ®ØµÙØµ ØºÙØ± ÙØ­Ø¯ÙØ¯ÙÙ Ø¹ÙÙ ÙØ³ØªÙÙ Ø§ÙÙÙØ¯ ÙØ§ÙØ¨ÙÙØ©',
      'ÙØªØ­ÙÙ Ø£Ø­Ø¬Ø§Ù ÙØªØ§ÙÙØ¬Ø§Øª ÙØ­Ø±ÙØ© Ø²ÙØ§Ø± Ø¶Ø®ÙØ©',
      'ÙØ§ ØªÙØ¬Ø¯ Ø±Ø³ÙÙ ØªØ±Ø®ÙØµ ÙØ¥ØµØ¯Ø§Ø± Ø§ÙÙØµØ¯Ø± Ø§ÙÙÙØªÙØ­',
      'ÙÙØ§Ø³Ø¨ ÙØªØ¹ÙÙØ¯Ø§Øª B2B ÙØ§ÙØªØ³Ø¹ÙØ± ÙØªØ¹Ø¯Ø¯ Ø§ÙÙØ³ØªÙÙØ§Øª',
    ],
    cons: [
      'ØªÙÙÙØ© ØªØ´ØºÙÙ Ø´ÙØ±ÙØ© ÙØ±ØªÙØ¹Ø© Ø¬Ø¯Ø§Ù (Ø§Ø³ØªØ¶Ø§ÙØ© + ÙØ·ÙØ± ÙØªØ®ØµØµ)',
      'ÙÙØ­ÙÙ ØªØ¹ÙÙ Ø­Ø§Ø¯ ÙÙØªØ·ÙØ¨ ÙØ±ÙÙ ØªØ·ÙÙØ± Ø¯Ø§Ø¦Ù',
      'ÙØ§ ÙÙØ¬Ø¯ Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù Ø±Ø³ÙÙ ÙØªÙØ§ÙÙ ÙØ­Ø¯ÙØ¯ ÙØ¹ Ø¨ÙØ§Ø¨Ø§Øª Ø§ÙØ¯ÙØ¹ Ø§ÙØ®ÙÙØ¬ÙØ©',
    ],
    featureSupport: {
      'ÙØ§Ø¬ÙØ© Ø¹Ø±Ø¨ÙØ© ÙØ§ÙÙØ©': 'partial',
      'Ø¯Ø¹Ù RTL': 'yes',
      'ÙØ¯Ù (Mada)': 'partial',
      'Apple Pay': 'yes',
      'STC Pay': 'no',
      'ØªØ§Ø¨ ÙÙÙØ¯ÙÙØ¹Ø§Øª': 'partial',
      'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù 24/7': 'no',
      'Ø´Ø­Ù Aramex/SMSA ÙØ¯ÙØ¬': 'partial',
    } as Record<string, SupportLevel>,
  },
] as const;

// -------------------------------------------------------------
// FEATURE â CATEGORY MAPPING
// -------------------------------------------------------------
const FEATURE_CATEGORY_MAP: Record<string, string> = {
  'ÙØ§Ø¬ÙØ© Ø¹Ø±Ø¨ÙØ© ÙØ§ÙÙØ©': 'language-region',
  'Ø¯Ø¹Ù RTL': 'language-region',
  'ÙØ¯Ù (Mada)': 'gulf-payments',
  'Apple Pay': 'gulf-payments',
  'STC Pay': 'gulf-payments',
  'ØªØ§Ø¨ ÙÙÙØ¯ÙÙØ¹Ø§Øª': 'gulf-payments',
  'Ø¯Ø¹Ù Ø¹Ø±Ø¨Ù 24/7': 'technical-support',
  'Ø´Ø­Ù Aramex/SMSA ÙØ¯ÙØ¬': 'shipping-logistics',
};

async function main() {
  console.log('ð± Ø¨Ø¯Ø¡ ØªØ¹Ø¨Ø¦Ø© ÙØ§Ø¹Ø¯Ø© Ø§ÙØ¨ÙØ§ÙØ§Øª...');

  // Clean existing data (idempotent seed) â children first.
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
  console.log(`â ØªÙ Ø¥ÙØ´Ø§Ø¡ ${FEATURE_CATEGORIES.length} ÙØ¦Ø§Øª ÙØ²Ø§ÙØ§`);

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
        throw new Error(`ÙØ§ ØªÙØ¬Ø¯ ÙØ¦Ø© ÙØ®Ø§ØµÙØ©: ${featureNameAr}`);
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

    console.log(`â ØªÙ Ø¥ÙØ´Ø§Ø¡ ÙÙØµØ©: ${p.nameAr} (${p.slug})`);
  }

  // 4) Site settings (single row)
  await prisma.siteSettings.create({
    data: {
      siteNameAr: 'Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±',
      taglineAr: 'Ø§ÙÙØ±Ø¬Ø¹ Ø§ÙØ£ÙÙ Ø¹Ø±Ø¨ÙØ§Ù ÙÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ©',
      contactEmail: 'info@daleel-almatajir.com',
      twitterUrl: null,
      linkedinUrl: null,
      youtubeUrl: null,
      disclosureTextAr:
        'Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± ÙÙÙØ¹ ÙØ³ØªÙÙØ ÙÙØ¯ ÙØ­ØµÙ Ø¹ÙÙ Ø¹ÙÙÙØ© ÙÙ Ø¨Ø¹Ø¶ Ø§ÙØ±ÙØ§Ø¨Ø· Ø§ÙØªØ§Ø¨Ø¹Ø© ÙÙ ÙØ°Ø§ Ø§ÙÙÙÙØ¹ Ø¯ÙÙ Ø£Ù ØªÙÙÙØ© Ø¥Ø¶Ø§ÙÙØ© Ø¹ÙÙÙ. ÙØ°Ø§ ÙØ§ ÙØ¤Ø«Ø± Ø¹ÙÙ ØªÙÙÙÙØ§ØªÙØ§ Ø£Ù ØªØ±ØªÙØ¨ Ø§ÙÙÙØ§Ø±ÙØ§ØªØ ÙØ§ÙØªÙ ØªØ³ØªÙØ¯ Ø¥ÙÙ Ø£Ø³Ø¹Ø§Ø± ÙÙØ²Ø§ÙØ§ Ø­ÙÙÙÙØ© ÙÙÙ ÙÙØµØ©.',
      defaultMetaTitle: 'Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± â ÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© ÙÙ Ø§ÙØ³Ø¹ÙØ¯ÙØ© Ù¢Ù Ù¢Ù¦',
      defaultMetaDesc:
        'ÙØ§Ø±Ù Ø¨ÙÙ Ø³ÙØ©Ø Ø²Ø¯Ø Ø´ÙØ¨ÙÙØ§ÙØ ÙÙÙÙÙØ±Ø³Ø Ø¨ÙØº ÙÙÙØ±Ø³ ÙÙØ§Ø¬ÙØªÙ ÙÙ Ø­ÙØ« Ø§ÙØ£Ø³Ø¹Ø§Ø± ÙØ§ÙÙØ²Ø§ÙØ§Ø ÙØ§Ø­Ø³Ø¨ Ø§ÙØªÙÙÙØ© Ø§ÙÙØ¹ÙÙØ© ÙÙØªØ¬Ø±Ù Ø¨Ø§ÙØ±ÙØ§Ù Ø§ÙØ³Ø¹ÙØ¯Ù.',
    },
  });
  console.log('â ØªÙ Ø¥ÙØ´Ø§Ø¡ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§ÙÙÙÙØ¹');

  console.log('ð Ø§ÙØªÙÙØª ØªØ¹Ø¨Ø¦Ø© ÙØ§Ø¹Ø¯Ø© Ø§ÙØ¨ÙØ§ÙØ§Øª Ø¨ÙØ¬Ø§Ø­');
}

main()
  .catch((e) => {
    console.error('â ÙØ´Ù ÙÙ ØªØ¹Ø¨Ø¦Ø© ÙØ§Ø¹Ø¯Ø© Ø§ÙØ¨ÙØ§ÙØ§Øª:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
