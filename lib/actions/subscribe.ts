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
    return { success: false, messageAr: 'ÙØ±Ø¬Ù Ø¥Ø¯Ø®Ø§Ù Ø¨Ø±ÙØ¯ Ø¥ÙÙØªØ±ÙÙÙ ØµØ­ÙØ­.' };
  }

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source },
    });
    return { success: true, messageAr: 'ØªÙ Ø§ÙØ§Ø´ØªØ±Ø§Ù Ø¨ÙØ¬Ø§Ø­! Ø´ÙØ±Ø§Ù ÙÙ.' };
  } catch {
    return { success: false, messageAr: 'Ø­Ø¯Ø« Ø®Ø·Ø£. ÙØ±Ø¬Ù Ø§ÙÙØ­Ø§ÙÙØ© ÙØ±Ø© Ø£Ø®Ø±Ù.' };
  }
}
