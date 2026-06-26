export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/db';

export default async function AdminArticlesListPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, titleAr: true, slug: true, category: true, status: true, updatedAt: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-white">Articles</h1>
        <Link href="/admin/articles/new" className="btn-primary text-sm px-4 py-2">
          <Plus size={15} /> New Article
        </Link>
      </div>

      <div className="glass overflow-hidden">
        {articles.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No articles yet. Create your first one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-xs text-slate-500 border-b border-white/8">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-white/6 last:border-0 hover:bg-white/3">
                  <td className="p-4">
                    <Link href={`/admin/articles/${a.id}`} className="text-white font-semibold hover:text-primary">
                      {a.titleAr}
                    </Link>
                    <div className="text-xs text-slate-500 mt-0.5" dir="ltr">/{a.slug}</div>
                  </td>
                  <td className="p-4 text-slate-400">{a.category}</td>
                  <td className="p-4">
                    <span className={`badge text-xs ${a.status === 'published' ? 'badge-success' : 'badge-neutral'}`}>
                      {a.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-xs">
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(a.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
