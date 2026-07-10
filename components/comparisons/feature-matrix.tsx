'use client';

import { useMemo, useState } from 'react';
import { Check, X, Minus, ChevronDown } from 'lucide-react';
import type { FeatureMatrixRow } from '@/lib/data/features';
import type { SupportLevel } from '@/lib/calculator/types';

interface FeatureMatrixProps {
  rows: FeatureMatrixRow[];
  nameA: string;
  nameB: string;
}

export function FeatureMatrix({ rows, nameA, nameB }: FeatureMatrixProps) {
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const row of rows) seen.set(row.categorySlug, row.categoryNameAr);
    return Array.from(seen.entries()).map(([slug, nameAr]) => ({ slug, nameAr }));
  }, [rows]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(categories.map((c) => c.slug)));

  const filteredRows = activeCategory === 'all' ? rows : rows.filter((r) => r.categorySlug === activeCategory);

  const grouped = useMemo(() => {
    const map = new Map<string, FeatureMatrixRow[]>();
    for (const row of filteredRows) {
      const list = map.get(row.categorySlug) ?? [];
      list.push(row);
      map.set(row.categorySlug, list);
    }
    return map;
  }, [filteredRows]);

  function toggleCategory(slug: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <section id="features" className="mb-12">
      <h2 className="text-2xl font-extrabold text-white mb-6">ÙØµÙÙÙØ© Ø§ÙÙØ²Ø§ÙØ§</h2>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterChip label="Ø§ÙÙÙ" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
        {categories.map((cat) => (
          <FilterChip
            key={cat.slug}
            label={cat.nameAr}
            active={activeCategory === cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
          />
        ))}
      </div>

      <div className="glass overflow-hidden">
        {categories
          .filter((cat) => grouped.has(cat.slug))
          .map((cat) => {
            const catRows = grouped.get(cat.slug) ?? [];
            const isOpen = openCategories.has(cat.slug);
            return (
              <div key={cat.slug} className="border-b border-white/6 last:border-0">
                <button
                  onClick={() => toggleCategory(cat.slug)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-right"
                >
                  <span className="text-sm font-bold text-white">{cat.nameAr}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4">
                    {/* Column headers */}
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 text-xs text-slate-500 mb-2 px-1">
                      <span />
                      <span className="w-16 text-center">{nameA}</span>
                      <span className="w-16 text-center">{nameB}</span>
                    </div>
                    {catRows.map((row) => (
                      <div
                        key={row.featureNameAr}
                        className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-2 px-1 text-sm"
                      >
                        <span className="text-slate-300">{row.featureNameAr}</span>
                        <span className="w-16 flex justify-center">
                          <SupportIcon level={row.supportA} />
                        </span>
                        <span className="w-16 flex justify-center">
                          <SupportIcon level={row.supportB} />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
        active
          ? 'border-primary/40 bg-primary/15 text-blue-300'
          : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
      }`}
    >
      {label}
    </button>
  );
}

function SupportIcon({ level }: { level: SupportLevel }) {
  if (level === 'yes') return <Check size={16} className="text-emerald-400" />;
  if (level === 'partial') return <Minus size={16} className="text-amber-400" />;
  return <X size={16} className="text-red-400" />;
}
