<<<<<<< HEAD
=======
export const dynamic = 'force-dynamic';
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f
import { prisma } from '@/lib/db';
import { SettingsForm } from '@/components/admin/settings-form';

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-6">Settings</h1>
      <SettingsForm
        id={settings?.id ?? null}
        initial={{
          siteNameAr: settings?.siteNameAr ?? 'دليل المتاجر',
          taglineAr: settings?.taglineAr ?? '',
          contactEmail: settings?.contactEmail ?? '',
          twitterUrl: settings?.twitterUrl ?? '',
          linkedinUrl: settings?.linkedinUrl ?? '',
          youtubeUrl: settings?.youtubeUrl ?? '',
          disclosureTextAr: settings?.disclosureTextAr ?? '',
          defaultMetaTitle: settings?.defaultMetaTitle ?? '',
          defaultMetaDesc: settings?.defaultMetaDesc ?? '',
        }}
      />
    </div>
  );
}
