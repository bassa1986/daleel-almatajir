'use server';

import { prisma } from '../db';

export interface SubscribeResult {
  success: boolean;
  messageAr: string;
}

export async function subscribeEmail(
  email: string,
  source: 'footer' | 'calculator' | 'article' | 'comparison'
): Promise<SubscribeResult> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, messageAr: 'يرجى إدخال بريد إلكتروني صحيح.' };
  }

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source },
    });
    return { success: true, messageAr: 'تم الاشتراك بنجاح! شكراً لك.' };
  } catch {
    return { success: false, messageAr: 'حدث خطأ. يرجى المحاولة مرة أخرى.' };
  }
}
