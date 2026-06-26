export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { prisma } from '@/lib/db';

const STALE_THRESHOLD_DAYS = 30;

export default async function AdminDashboard() {
  const [articleCount, publishedCount, subscriberCount, platforms] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'published' } }),
    prisma.subscriber.count(),
    prisma.platform.findMany({ select: { nameAr: true, slug: true, updatedAt: true } }),
  ]);

  const now = Date.now();
  const stalePlatforms = platforms.filter(
    (p) => Math.floor((now - p.updatedAt.getTime()) / (1000 * 60 * 60 * 24)) > STALE_THRESHOLD_DAYS
  );

  const stats = [
    { label: 'Total Articles', value: articleCount, color: '#3B82F6' },
    { label: 'Published', value: publishedCount, color: '#22C55E' },
    { label: 'Subscribers', value: subscriberCount, color: '#06B6D4' },
    { label: 'Platforms', value: platforms.length, color: '#F59E0B' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-5 rounded-xl">
            <div className="figure text-3xl font-extrabold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Calculator freshness warning (badge if any platform's pricing data is >30 days old) */}
      {stalePlatforms.length > 0 && (
        <div className="glass p-4 rounded-xl mb-6 border border-amber-500/30 bg-amber-500/5 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="text-amber-300 font-semibold">{stalePlatforms.length} platform(s)</span>
            <span className="text-slate-400"> haven't had pricing reviewed in over {STALE_THRESHOLD_DAYS} days: </span>
            {stalePlatforms.map((p, i) => (
              <span key={p.slug}>
                <Link href={`/admin/platforms/${p.slug}`} className="text-amber-300 hover:underline">
                  {p.nameAr}
                </Link>
                {i < stalePlatforms.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="glass p-6 rounded-xl">
        <h2 className="font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="btn-primary text-sm px-4 py-2">+ New Article</Link>
          <Link href="/admin/platforms" className="btn-glass text-sm px-4 py-2">Manage Platforms</Link>
          <Link href="/admin/calculator" className="btn-glass text-sm px-4 py-2">Calculator Config</Link>
          <Link href="/admin/subscribers" className="btn-glass text-sm px-4 py-2">View Subscribers</Link>
        </div>
      </div>
    </div>
  );
}
