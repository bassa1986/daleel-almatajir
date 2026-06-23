'use client';

import { useState, useTransition } from 'react';
import { Save } from 'lucide-react';
import { saveSiteSettings, type SiteSettingsInput } from '@/lib/actions/settings';

interface SettingsFormProps {
  id: string | null;
  initial: SiteSettingsInput;
}

export function SettingsForm({ id, initial }: SettingsFormProps) {
  const [form, setForm] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function field(key: keyof SiteSettingsInput) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [key]: e.target.value });
        setSaved(false);
      },
    };
  }

  function save() {
    startTransition(async () => {
      await saveSiteSettings(id, form);
      setSaved(true);
    });
  }

  return (
    <div className="max-w-2xl space-y-5">
      <Row label="Site name (Arabic)"><input dir="rtl" className="admin-field" {...field('siteNameAr')} /></Row>
      <Row label="Tagline (Arabic)"><input dir="rtl" className="admin-field" {...field('taglineAr')} /></Row>
      <Row label="Contact email"><input dir="ltr" className="admin-field" {...field('contactEmail')} /></Row>
      <div className="grid grid-cols-3 gap-4">
        <Row label="Twitter URL"><input dir="ltr" className="admin-field" {...field('twitterUrl')} /></Row>
        <Row label="LinkedIn URL"><input dir="ltr" className="admin-field" {...field('linkedinUrl')} /></Row>
        <Row label="YouTube URL"><input dir="ltr" className="admin-field" {...field('youtubeUrl')} /></Row>
      </div>
      <Row label="Affiliate disclosure text (Arabic)">
        <textarea dir="rtl" rows={4} className="admin-field resize-none" {...field('disclosureTextAr')} />
      </Row>
      <Row label="Default meta title"><input dir="rtl" className="admin-field" {...field('defaultMetaTitle')} /></Row>
      <Row label="Default meta description">
        <textarea dir="rtl" rows={3} className="admin-field resize-none" {...field('defaultMetaDesc')} />
      </Row>

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={isPending} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50">
          <Save size={14} /> {isPending ? 'Saving...' : 'Save'}
        </button>
        {saved && <span className="text-xs text-emerald-400">Saved ✓</span>}
      </div>

      <style jsx global>{`
        .admin-field {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          color: white;
        }
      `}</style>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
