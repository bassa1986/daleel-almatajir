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
    return { success: false, messageAr: 'يرجى إدخال بريد إلكتروني صحيح.' };
    return { success: false, messageAr: 'ÙØ±Ø¬Ù Ø¥Ø¯Ø®Ø§Ù Ø¨Ø±ÙØ¯ Ø¥ÙÙØªØ±ÙÙÙ ØµØ­ÙØ­.' };
  }

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source },
    return { success: true, messageAr: 'تم الاشتراك بنجاح! شكراً لك.' };
    return { success: true, messageAr: 'ØªÙ Ø§ÙØ§Ø´ØªØ±Ø§Ù Ø¨ÙØ¬Ø§Ø­! Ø´ÙØ±Ø§Ù ÙÙ.' };
    return { success: false, messageAr: 'حدث خطأ. يرجى المحاولة مرة أخرى.'     return { success: false, messageAr: 'Ø­Ø¯Ø« Ø®Ø·Ø£. ÙØ±Ø¬Ù Ø§ÙÙØ­Ø§ÙÙØ© ÙØ±Ø© Ø£Ø®Ø±Ù.' };
  }
}
