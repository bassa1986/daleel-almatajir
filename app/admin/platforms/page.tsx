export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function AdminPlatformsPage() {
  const platforms = await prisma.platform.findMany({ orderBy: { nameAr: 'asc' } });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-6">Platforms</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((p) => (
          <Link key={p.id} href={`/admin/platforms/${p.slug}`} className="glass p-5 block hover:border-white/20 transition-all">
            <div
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mb-3"
              style={{ backgroundColor: `${p.brandColor}22`, color: p.brandColor }}
            >
              â—
            </div>
            <div className="font-extrabold text-white">{p.nameAr}</div>
            <div className="text-xs text-slate-500">{p.nameEn} Â· {p.origin}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
