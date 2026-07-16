'use client';

import { useState, useTransition } from 'react';
import { Check, X, Pencil } from 'lucide-react';
import { updateAffiliateLink } from '@/lib/actions/platforms';

interface AffiliateLinkRow {
  id: string;
  nameAr: string;
  affiliateUrl: string;
  updatedAt: Date;
}

interface AffiliateLinksTableProps {
  rows: AffiliateLinkRow[];
}

export function AffiliateLinksTable({ rows }: AffiliateLinksTableProps) {
  return (
    <div className="glass overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/8 text-right text-xs text-slate-500">
            <th className="px-5 py-3 font-medium">المنصة</th>
            <th className="px-5 py-3 font-medium">رابط الأفلييت</th>
            <th className="px-5 py-3 font-medium">آخر تحديث</th>
            <th className="px-5 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row({ row }: { row: AffiliateLinkRow }) {
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(row.affiliateUrl);
  const [isPending, startTransition] = useTransition();

  function validate(value: string) {
    try {
      new URL(value);
      return true;
    } catch {
      alert('رابط غير صالح');
      return false;
    }
  }

  function save() {
    if (!validate(url)) return;
    startTransition(() => updateAffiliateLink(row.id, url));
    setEditing(false);
  }

  return (
    <tr className="border-b border-white/6 last:border-0">
      <td className="px-5 py-3 font-semibold text-white">{row.nameAr}</td>
      <td className="px-5 py-3">
        {editing ? (
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            dir="ltr"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary/50"
          />
        ) : (
          <span dir="ltr" className="text-slate-400 text-xs truncate block max-w-xs">{row.affiliateUrl}</span>
        )}
      </td>
      <td className="px-5 py-3 text-xs text-slate-500">
        {new Date(row.updatedAt).toLocaleDateString('ar-SA')}
      </td>
      <td className="px-5 py-3 text-left">
        {editing ? (
          <div className="flex items-center gap-2 justify-end">
            <button onClick={save} disabled={isPending} className="text-emerald-400 hover:text-emerald-300">
              <Check size={16} />
            </button>
            <button onClick={() => { setUrl(row.affiliateUrl); setEditing(false); }} className="text-slate-500 hover:text-slate-300">
              <X size={16} />
            </button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="text-slate-500 hover:text-slate-300">
            <Pencil size={14} />
          </button>
        )}
      </td>
    </tr>
  );
}
