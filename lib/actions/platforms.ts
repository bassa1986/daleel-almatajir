'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../db';

export interface BasicInfoInput {
  nameAr: string;
  nameEn: string;
  logo: string;
  brandColor: string;
  websiteUrl: string;
  affiliateUrl: string;
  cookieDurationDays: number;
  commissionInfo: string;
  descriptionAr: string;
  rating: number;
  setupFeeSAR: number;
  isEnterprise: boolean;
  warningThresholdSAR: number | null;
  warningTextAr: string;
}

export async function saveBasicInfo(platformId: string, input: BasicInfoInput) {
  await prisma.platform.update({
    where: { id: platformId },
    data: {
      nameAr: input.nameAr,
      nameEn: input.nameEn,
      logo: input.logo,
      brandColor: input.brandColor,
      websiteUrl: input.websiteUrl,
      affiliateUrl: input.affiliateUrl,
      cookieDurationDays: input.cookieDurationDays,
      commissionInfo: input.commissionInfo || null,
      descriptionAr: input.descriptionAr,
      rating: input.rating,
      setupFeeSAR: input.setupFeeSAR,
      isEnterprise: input.isEnterprise,
      warningThresholdSAR: input.warningThresholdSAR,
      warningTextAr: input.warningTextAr || null,
    },
  });
  revalidateAll();
}

export interface TierInput {
  id?: string;
  name: string;
  nameAr: string;
  minRevenueSAR: number;
  maxRevenueSAR: number | null;
  monthlyFeeSAR: number;
  transactionFeePct: number;
  perOrderFee: number;
  maxOrders: number | null;
  annualRevLimitSAR: number | null;
}

/** Replaces all pricing tiers for a platform with the given list (delete + recreate). */
export async function saveTiers(platformId: string, tiers: TierInput[]) {
  await prisma.$transaction([
    prisma.pricingTier.deleteMany({ where: { platformId } }),
    prisma.pricingTier.createMany({
      data: tiers.map((t, i) => ({
        platformId,
        name: t.name,
        nameAr: t.nameAr,
        minRevenueSAR: t.minRevenueSAR,
        maxRevenueSAR: t.maxRevenueSAR,
        monthlyFeeSAR: t.monthlyFeeSAR,
        transactionFeePct: t.transactionFeePct,
        perOrderFee: t.perOrderFee,
        maxOrders: t.maxOrders,
        annualRevLimitSAR: t.annualRevLimitSAR,
        sortOrder: i + 1,
      })),
    }),
  ]);
  revalidateAll();
}

export interface HiddenCostInput {
  labelAr: string;
  monthlySAR: number;
  isRequired: boolean;
  scenarios: string[];
}

export async function saveHiddenCosts(platformId: string, costs: HiddenCostInput[]) {
  await prisma.$transaction([
    prisma.hiddenCost.deleteMany({ where: { platformId } }),
    prisma.hiddenCost.createMany({
      data: costs.map((c, i) => ({
        platformId,
        labelAr: c.labelAr,
        monthlySAR: c.monthlySAR,
        isRequired: c.isRequired,
        scenarios: c.scenarios,
        sortOrder: i + 1,
      })),
    }),
  ]);
  revalidateAll();
}

export interface FeatureInput {
  categoryId: string;
  featureNameAr: string;
  supported: 'yes' | 'no' | 'partial';
  noteAr?: string;
}

export async function saveFeatures(platformId: string, features: FeatureInput[]) {
  await prisma.$transaction([
    prisma.platformFeature.deleteMany({ where: { platformId } }),
    prisma.platformFeature.createMany({
      data: features.map((f) => ({
        platformId,
        categoryId: f.categoryId,
        featureNameAr: f.featureNameAr,
        supported: f.supported,
        noteAr: f.noteAr || null,
      })),
    }),
  ]);
  revalidateAll();
}

export async function saveProsAndCons(platformId: string, pros: string[], cons: string[]) {
  await prisma.$transaction([
    prisma.platformPro.deleteMany({ where: { platformId } }),
    prisma.platformCon.deleteMany({ where: { platformId } }),
    prisma.platformPro.createMany({
      data: pros.filter(Boolean).map((textAr, i) => ({ platformId, textAr, sortOrder: i + 1 })),
    }),
    prisma.platformCon.createMany({
      data: cons.filter(Boolean).map((textAr, i) => ({ platformId, textAr, sortOrder: i + 1 })),
    }),
  ]);
  revalidateAll();
}

export async function saveSummary(platformId: string, quickVerdictAr: string, bestForTypes: string[]) {
  await prisma.platform.update({
    where: { id: platformId },
    data: { quickVerdictAr, bestForTypes },
  });
  revalidateAll();
}

function revalidateAll() {
  revalidatePath('/admin/platforms');
  revalidatePath('/muqaranat');
  revalidatePath('/');
  revalidatePath('/calculator');
}
