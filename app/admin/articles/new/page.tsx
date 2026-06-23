import { ArticleForm } from '@/components/admin/article-form';

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-6">New Article</h1>
      <ArticleForm />
    </div>
  );
}
