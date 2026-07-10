'use client';

import { useState, useTransition } from 'react';
import { Save, Sparkles } from 'lucide-react';
import { updateAffiliateLink } from '@/lib/actions/affiliate';

export interface AffiliateRow {
  id: string;
  nameAr: string;
  affiliateUrl: string;
  cookieDurationDays: number;
}

export function AffiliateLinksTable({ rows }: { rows: AffiliateRow[] }) {
  return (
    <div className="glass overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-right text-xs text-slate-500 border-b border-white/8">
            <th className="p-3 font-medium">Platform</th>
            <th className="p-3 font-medium">Affiliate URL</th>
            <th className="p-3 font-medium">Cookie (days)</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <AffiliateRowEditor key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AffiliateRowEditor({ row }: { row: AffiliateRow }) {
  const [url, setUrl] = useState(row.affiliateUrl);
  const [days, setDays] = useState(row.cookieDurationDays);
  const [isPending, startTransition] = useTransition();

  function appendUtm() {
    try {
      const u = new URL(url);
      u.searchParams.set('utm_source', 'daleel-almatajir');
      u.searchParams.set('utm_medium', 'affiliate');
      u.searchParams.set('utm_campaign', 'platform-review');
      setUrl(u.toString());
    } catch {
      alert('Ø±Ø§Ø¨Ø· ØºÙØ± ØµØ§ÙØ­');
    }
  }

  function save() {
    startTransition(() => updateAffiliateLink(row.id, url, days));
  }

  return (
    <tr className="border-b border-white/6 last:border-0">
      <td className="p-3 text-white font-semibold whitespace-nowrap">{row.nameAr}</td>
      <td className="p-3">
        <div className="flex items-center gap-1.5">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            dir="ltr"
            className="flex-1 min-w-[220px] rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          />
          <button onClick={appendUtm} title="Append UTM params" className="text-slate-400 hover:text-secondary flex-shrink-0">
            <Sparkles size={14} />
          </button>
        </div>
      </td>
      <td className="p-3">
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white figure"
        />
      </td>
      <td className="p-3">
        <span className={`badge text-xs ${url ? 'badge-success' : 'badge-danger'}`}>{url ? 'Active' : 'Missing'}</span>
      </td>
      <td className="p-3">
        <button onClick={save} disabled={isPending} className="btn-glass text-xs px-2.5 py-1.5 disabled:opacity-50">
          <Save size={12} />
        </button>
      </td>
    </tr>
  );
}
