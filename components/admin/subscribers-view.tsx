'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { chartPalette } from '@/lib/design/tokens';

export interface SubscriberRow {
  id: string;
  email: string;
  source: string;
  createdAt: string; // ISO string
}

interface SubscribersViewProps {
  subscribers: SubscriberRow[];
}

export function SubscribersView({ subscribers }: SubscribersViewProps) {
  const sourceCounts = subscribers.reduce<Record<string, number>>((acc, s) => {
    acc[s.source] = (acc[s.source] ?? 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(sourceCounts).map(([name, value]) => ({ name, value }));

  function exportCsv() {
    const header = 'email,source,created_at\n';
    const rows = subscribers.map((s) => `${s.email},${s.source},${s.createdAt}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-6">
      {/* Table */}
      <div className="glass overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/8">
          <span className="text-sm text-slate-400">{subscribers.length} total subscribers</span>
          <button onClick={exportCsv} className="btn-glass text-xs px-3 py-1.5">
            <Download size={13} /> Export CSV
          </button>
        </div>
        {subscribers.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No subscribers yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-white/8">
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Source</th>
                <th className="p-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-white/6 last:border-0">
                  <td className="p-3 text-white" dir="ltr">{s.email}</td>
                  <td className="p-3">
                    <span className="badge badge-neutral text-xs">{s.source}</span>
                  </td>
                  <td className="p-3 text-slate-500 text-xs">
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(s.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pie chart */}
      <div className="glass p-5">
        <h3 className="font-bold text-white mb-4 text-sm">By source</h3>
        {pieData.length === 0 ? (
          <p className="text-xs text-slate-500">No data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0F1629', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        )}
        <div className="space-y-1.5 mt-3">
          {pieData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartPalette[i % chartPalette.length] }} />
              <span className="text-slate-400 flex-1">{d.name}</span>
              <span className="text-white figure">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
