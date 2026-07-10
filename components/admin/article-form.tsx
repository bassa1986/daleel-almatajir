'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, Send, Trash2 } from 'lucide-react';
import { TiptapEditor } from './tiptap-editor';
import { createArticle, updateArticle, deleteArticle, type ArticleFormInput } from '@/lib/actions/articles';

const CATEGORIES = ['ÙÙØ§Ø±ÙØ§Øª', 'ÙØ±Ø§Ø¬Ø¹Ø§Øª', 'Ø£Ø¯ÙØ©', 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§ÙØ­Ø§ÙØ©', 'Ø£Ø®Ø¨Ø§Ø±'];

export interface ArticleFormData {
  id?: string;
  slug: string;
  titleAr: string;
  bodyHtml: string;
  category: string;
  status: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  tags: string[];
  metaTitleAr: string | null;
  metaDescAr: string | null;
  readingTimeMin: number;
}

interface ArticleFormProps {
  article?: ArticleFormData;
}

function slugify(title: string): string {
  return title.trim().replace(/\s+/g, '-').slice(0, 80);
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [titleAr, setTitleAr] = useState(article?.titleAr ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [bodyHtml, setBodyHtml] = useState(article?.bodyHtml ?? '<p></p>');
  const [category, setCategory] = useState(article?.category ?? CATEGORIES[0]);
  const [status, setStatus] = useState(article?.status ?? 'draft');
  const [featuredImage, setFeaturedImage] = useState(article?.featuredImage ?? '');
  const [featuredImageAlt, setFeaturedImageAlt] = useState(article?.featuredImageAlt ?? '');
  const [tagsInput, setTagsInput] = useState(article?.tags.join(', ') ?? '');
  const [metaTitleAr, setMetaTitleAr] = useState(article?.metaTitleAr ?? '');
  const [metaDescAr, setMetaDescAr] = useState(article?.metaDescAr ?? '');

  function buildInput(targetStatus: string): ArticleFormInput {
    return {
      slug: slug || slugify(titleAr),
      titleAr,
      bodyHtml,
      category,
      status: targetStatus as 'draft' | 'published',
      featuredImage,
      featuredImageAlt,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      metaTitleAr,
      metaDescAr,
      readingTimeMin: article?.readingTimeMin ?? 0,
    };
  }

  function handleSave(targetStatus: 'draft' | 'published') {
    if (!titleAr.trim()) {
      alert('ÙØ±Ø¬Ù Ø¥Ø¯Ø®Ø§Ù Ø¹ÙÙØ§Ù ÙÙÙÙØ§Ù');
      return;
    }
    startTransition(async () => {
      const input = buildInput(targetStatus);
      if (article?.id) {
        await updateArticle(article.id, input);
        setStatus(targetStatus);
        router.refresh();
      } else {
        await createArticle(input); // redirects on success
      }
    });
  }

  function handleDelete() {
    if (!article?.id) return;
    if (!window.confirm('ÙÙ Ø£ÙØª ÙØªØ£ÙØ¯ ÙÙ Ø­Ø°Ù ÙØ°Ø§ Ø§ÙÙÙØ§ÙØ ÙØ§ ÙÙÙÙ Ø§ÙØªØ±Ø§Ø¬Ø¹ Ø¹Ù ÙØ°Ø§ Ø§ÙØ¥Ø¬Ø±Ø§Ø¡.')) return;
    startTransition(async () => {
      await deleteArticle(article.id!);
      router.push('/admin/articles');
    });
  }

  return (
    <div dir="ltr" className="pb-24">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Editor (70%) */}
        <div dir="rtl">
          <input
            type="text"
            value={titleAr}
            onChange={(e) => {
              setTitleAr(e.target.value);
              if (!article?.id) setSlug(slugify(e.target.value));
            }}
            placeholder="Ø¹ÙÙØ§Ù Ø§ÙÙÙØ§Ù"
            className="w-full text-2xl font-extrabold bg-transparent text-white placeholder-slate-600 mb-4 focus:outline-none border-b border-white/10 pb-3"
          />
          <TiptapEditor content={bodyHtml} onChange={setBodyHtml} />
        </div>

        {/* Sidebar (30%) */}
        <div className="space-y-5">
          <Field label="Ø§ÙØ±Ø§Ø¨Ø· (Slug)">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              dir="ltr"
              className="admin-input"
            />
          </Field>

          <Field label="Ø§ÙØªØµÙÙÙ">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="admin-input" dir="rtl">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="ØµÙØ±Ø© ÙÙÙØ²Ø© (Ø±Ø§Ø¨Ø·)">
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://..."
              className="admin-input"
            />
          </Field>

          <Field label="ÙØµ Ø¨Ø¯ÙÙ ÙÙØµÙØ±Ø© (Alt)">
            <input
              type="text"
              value={featuredImageAlt}
              onChange={(e) => setFeaturedImageAlt(e.target.value)}
              dir="rtl"
              className="admin-input"
            />
          </Field>

          <Field label="Ø§ÙÙØ³ÙÙ (ÙÙØµÙÙØ© Ø¨ÙØ§ØµÙØ©)">
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              dir="rtl"
              className="admin-input"
            />
          </Field>

          <div className="border-t border-white/8 pt-4">
            <div className="text-xs font-bold text-slate-400 mb-3">SEO</div>
            <Field label="Ø¹ÙÙØ§Ù Meta">
              <input
                type="text"
                value={metaTitleAr}
                onChange={(e) => setMetaTitleAr(e.target.value)}
                dir="rtl"
                className="admin-input"
              />
            </Field>
            <Field label="ÙØµÙ Meta">
              <textarea
                value={metaDescAr}
                onChange={(e) => setMetaDescAr(e.target.value)}
                dir="rtl"
                rows={3}
                className="admin-input resize-none"
              />
            </Field>
          </div>

          {article?.id && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors pt-2"
            >
              <Trash2 size={13} /> Ø­Ø°Ù Ø§ÙÙÙØ§Ù
            </button>
          )}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-56 right-0 border-t border-white/8 bg-[#0B1120]/95 backdrop-blur-md px-6 py-3 flex items-center justify-end gap-3">
        <span className="text-xs text-slate-500 flex-1">
          {status === 'published' ? 'ð¢ ÙÙØ´ÙØ±' : 'âª ÙØ³ÙØ¯Ø©'}
        </span>
        <button onClick={() => handleSave('draft')} disabled={isPending} className="btn-glass text-sm px-4 py-2 disabled:opacity-50">
          <Save size={14} /> Ø­ÙØ¸ ÙØ³ÙØ¯Ø©
        </button>
        <button
          onClick={() => window.open(`/Ø£Ø¯ÙØ©/${slug}`, '_blank')}
          disabled={!article?.id}
          className="btn-glass text-sm px-4 py-2 disabled:opacity-50"
        >
          <Eye size={14} /> ÙØ¹Ø§ÙÙØ©
        </button>
        <button onClick={() => handleSave('published')} disabled={isPending} className="btn-primary text-sm px-4 py-2 disabled:opacity-50">
          <Send size={14} /> Ø§ÙØ´Ø± Ø§ÙØ¢Ù
        </button>
      </div>

      <style jsx global>{`
        .admin-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          color: white;
        }
        .admin-input:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
