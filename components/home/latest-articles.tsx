import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  titleAr: string;
  metaDescAr: string | null;
  category: string | null;
  publishedAt: Date | null;
}

interface Props {
  articles: Article[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'مقارنات': 'badge-primary',
  'مراجعات': 'badge-secondary',
  'أدلة': 'badge-success',
  'دراسات الحالة': 'badge-warning',
};

export function LatestArticles({ articles }: Props) {
  if (!articles || articles.length === 0) return null;
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-white">أحدث المقالات</h2>
          <Link href="/adilla" className="text-secondary hover:underline text-sm font-semibold">عرض الكل ←</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/adilla/${article.slug}`} className="glass glass-hover p-6 block">
              {article.category && (
                <span className={`badge text-xs mb-3 inline-block ${CATEGORY_COLORS[article.category] || 'badge-primary'}`}>{article.category}</span>
              )}
              <h3 className="text-lg font-extrabold text-white mb-2 leading-snug">{article.titleAr}</h3>
              {article.metaDescAr && <p className="text-slate-400 text-sm line-clamp-2">{article.metaDescAr}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}