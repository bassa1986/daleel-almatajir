<<<<<<< HEAD
﻿'use client';
=======
'use client';
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import type { ArticleCard } from '@/lib/data/articles';

function formatDateAr(date: Date | null): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

const CATEGORY_COLORS: Record<string, string> = {
  مقارنات: 'badge-primary',
  مراجعات: 'badge-secondary',
  أدلة: 'badge-success',
  'دراسات الحالة': 'badge-warning',
  أخبار: 'badge-neutral',
};

interface LatestArticlesProps {
  articles: ArticleCard[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-2">أحدث المقالات</h2>
            <p className="text-slate-400">مقالات ودراسات محدّثة من فريق دليل المتاجر</p>
          </div>
<<<<<<< HEAD
          <Link href="/adilla" className="btn-glass text-sm px-5 py-2.5">
=======
          <Link href="/أدلة" className="btn-glass text-sm px-5 py-2.5">
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f
            جميع المقالات <ArrowLeft size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
<<<<<<< HEAD
                href={`/adilla/${article.slug}`}
=======
                href={`/أدلة/${article.slug}`}
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f
                className="group glass glass-hover flex flex-col h-full"
              >
                {/* Featured image */}
                <div className="relative h-44 rounded-t-[calc(var(--radius-panel)-1px)] overflow-hidden bg-surface-raised">
                  {article.featuredImage ? (
                    <img
                      src={article.featuredImage}
                      alt={article.featuredImageAlt ?? article.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen size={40} className="text-white/10" />
                    </div>
                  )}
                  {/* Category badge overlaid */}
                  <div className="absolute top-3 right-3">
                    <span className={`badge text-xs ${CATEGORY_COLORS[article.category] ?? 'badge-neutral'}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.titleAr}
                  </h3>

                  <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readingTimeMin} دقائق للقراءة
                    </span>
                    {article.publishedAt && (
                      <span>{formatDateAr(article.publishedAt)}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-3 text-sm text-primary font-semibold">
                    اقرأ المقال <ArrowLeft size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
<<<<<<< HEAD

=======
>>>>>>> ca239989fff9125529f0ce22d5442ac82e5aac5f
