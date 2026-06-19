'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../db';

export interface SiteSettingsInput {
  siteNameAr: string;
  taglineAr: string;
  contactEmail: string;
  twitterUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  disclosureTextAr: string;
  defaultMetaTitle: string;
  defaultMetaDesc: string;
}

export async function saveSiteSettings(id: string | null, input: SiteSettingsInput) {
  const data = {
    siteNameAr: input.siteNameAr,
    taglineAr: input.taglineAr || null,
    contactEmail: input.contactEmail || null,
    twitterUrl: input.twitterUrl || null,
    linkedinUrl: input.linkedinUrl || null,
    youtubeUrl: input.youtubeUrl || null,
    disclosureTextAr: input.disclosureTextAr || null,
    defaultMetaTitle: input.defaultMetaTitle || null,
    defaultMetaDesc: input.defaultMetaDesc || null,
  };

  if (id) {
    await prisma.siteSettings.update({ where: { id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath('/admin/settings');
  revalidatePath('/');
}
