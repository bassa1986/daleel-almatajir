'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../db';

export async function updateAffiliateLink(platformId: string, affiliateUrl: string, cookieDurationDays: number) {
  await prisma.platform.update({
    where: { id: platformId },
    data: { affiliateUrl, cookieDurationDays },
  });
  revalidatePath('/admin/affiliate-links');
  revalidatePath('/مقارنات');
}
