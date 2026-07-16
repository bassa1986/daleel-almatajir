'use server';

import { prisma } from '@/lib/db';

export interface SubscribeResult {
  success: boolean;
  messageAr: string;
}

export async function subscribeEmail(email: string, source?: string): Promise<SubscribeResult> {
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    return { success: false, messageAr: 'يرجى إدخال بريد إلكتروني صحيح.' };
  }

  try {
    await prisma.subscriber.upsert({
      where: { email: trimmed },
      update: {},
      create: { email: trimmed, source: source ?? 'website' },
    });
    return { success: true, messageAr: 'تم الاشتراك بنجاح! شكراً لك.' };
  } catch {
    return { success: false, messageAr: 'حدث خطأ. يرجى المحاولة مرة أخرى.' };
  }
}
