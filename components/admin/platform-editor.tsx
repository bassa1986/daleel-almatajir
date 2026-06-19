'use client';

import { useState, useTransition } from 'react';
import { Plus, Trash2, Save, Check, X, Minus } from 'lucide-react';
import {
  saveBasicInfo,
  saveTiers,
  saveHiddenCosts,
  saveFeatures,
  saveProsAndCons,
  saveSummary,
  type TierInput,
  type HiddenCostInput,
  type FeatureInput,
} from '@/lib/actions/platforms';

const TABS = [
  { key: 'basic', labelAr: 'المعلومات الأساسية' },
  { key: 'pricing', labelAr: 'الأسعار والتكاليف' },
  { key: 'features', labelAr: 'مصفوفة المزايا' },
  { key: 'proscons', labelAr: 'المميزات والعيوب' },
  { key: 'summary', labelAr: 'الملخص والتوصية' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export interface PlatformEditorData {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  brandColor: string;
  websiteUrl: string;
  affiliateUrl: string;
  cookieDurationDays: number;
  commissionInfo: string | null;
  descriptionAr: string;
  rating: number;
  setupFeeSAR: number;
  isEnterprise: boolean;
  warningThresholdSAR: number | null;
  warningTextAr: string | null;
  quickVerdictAr: string | null;
  bestForTypes: string[];
  pricingTiers: TierInput[];
  hiddenCosts: HiddenCostInput[];
  pros: { textAr: string }[];
  cons: { textAr: string }[];
  features: (FeatureInput & { categoryNameAr: string })[];
}

interface PlatformEditorProps {
  platform: PlatformEditorData;
  categories: { id: string; nameAr: string }[];
}

export function PlatformEditor({ platform, categories }: PlatformEditorProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('basic');

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/8 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.key ? 'border-primary text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.labelAr}
          </button>
        ))}
      </div>

      {activeTab === 'basic' && <BasicInfoTab platform={platform} />}
      {activeTab === 'pricing' && <PricingTab platform={platform} />}
      {activeTab === 'features' && <FeaturesTab platform={platform} categories={categories} />}
      {activeTab === 'proscons' && <ProsConsTab platform={platform} />}
      {activeTab === 'summary' && <SummaryTab platform={platform} />}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Tab 1 — Basic info                                                 */
/* ---------------------------------------------------------------- */

function BasicInfoTab({ platform }: { platform: PlatformEditorData }) {
  const [form, setForm] = useState({
    nameAr: platform.nameAr,
    nameEn: platform.nameEn,
    logo: platform.logo,
    brandColor: platform.brandColor,
    websiteUrl: platform.websiteUrl,
    affiliateUrl: platform.affiliateUrl,
    cookieDurationDays: platform.cookieDurationDays,
    commissionInfo: platform.commissionInfo ?? '',
    descriptionAr: platform.descriptionAr,
    rating: platform.rating,
    setupFeeSAR: platform.setupFeeSAR,
    isEnterprise: platform.isEnterprise,
    warningThresholdSAR: platform.warningThresholdSAR,
    warningTextAr: platform.warningTextAr ?? '',
  });
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(() => saveBasicInfo(platform.id, form));
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <LabeledInput label="الاسم بالعربية" value={form.nameAr} onChange={(v) => setForm({ ...form, nameAr: v })} dir="rtl" />
        <LabeledInput label="الاسم بالإنجليزية" value={form.nameEn} onChange={(v) => setForm({ ...form, nameEn: v })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabeledInput label="رابط الموقع" value={form.websiteUrl} onChange={(v) => setForm({ ...form, websiteUrl: v })} />
        <LabeledInput label="رابط الإحالة (Affiliate)" value={form.affiliateUrl} onChange={(v) => setForm({ ...form, affiliateUrl: v })} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <LabeledInput label="لون العلامة" value={form.brandColor} onChange={(v) => setForm({ ...form, brandColor: v })} />
        <LabeledInput
          label="التقييم (0-5)"
          type="number"
          value={String(form.rating)}
          onChange={(v) => setForm({ ...form, rating: Number(v) })}
        />
        <LabeledInput
          label="مدة الكوكي (أيام)"
          type="number"
          value={String(form.cookieDurationDays)}
          onChange={(v) => setForm({ ...form, cookieDurationDays: Number(v) })}
        />
      </div>
      <LabeledTextarea label="الوصف بالعربية" value={form.descriptionAr} onChange={(v) => setForm({ ...form, descriptionAr: v })} />
      <div className="grid grid-cols-2 gap-4">
        <LabeledInput
          label="رسوم الإعداد (ر.س)"
          type="number"
          value={String(form.setupFeeSAR)}
          onChange={(v) => setForm({ ...form, setupFeeSAR: Number(v) })}
        />
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            checked={form.isEnterprise}
            onChange={(e) => setForm({ ...form, isEnterprise: e.target.checked })}
            id="isEnterprise"
          />
          <label htmlFor="isEnterprise" className="text-sm text-slate-300">منصة مؤسسية (Enterprise)</label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabeledInput
          label="حد التحذير (ر.س/شهر، اختياري)"
          type="number"
          value={form.warningThresholdSAR === null ? '' : String(form.warningThresholdSAR)}
          onChange={(v) => setForm({ ...form, warningThresholdSAR: v === '' ? null : Number(v) })}
        />
        <LabeledInput label="نص التحذير" value={form.warningTextAr} onChange={(v) => setForm({ ...form, warningTextAr: v })} dir="rtl" />
      </div>

      <button onClick={save} disabled={isPending} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50">
        <Save size={14} /> {isPending ? 'جارٍ الحفظ...' : 'حفظ'}
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Tab 2 — Pricing tiers + hidden costs                                */
/* ---------------------------------------------------------------- */

function PricingTab({ platform }: { platform: PlatformEditorData }) {
  const [tiers, setTiers] = useState<TierInput[]>(platform.pricingTiers);
  const [costs, setCosts] = useState<HiddenCostInput[]>(platform.hiddenCosts);
  const [isPendingTiers, startTiers] = useTransition();
  const [isPendingCosts, startCosts] = useTransition();

  function updateTier(i: number, patch: Partial<TierInput>) {
    setTiers((prev) => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  }
  function addTier() {
    setTiers((prev) => [
      ...prev,
      { name: '', nameAr: '', minRevenueSAR: 0, maxRevenueSAR: null, monthlyFeeSAR: 0, transactionFeePct: 0, perOrderFee: 0, maxOrders: null, annualRevLimitSAR: null },
    ]);
  }
  function removeTier(i: number) {
    setTiers((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateCost(i: number, patch: Partial<HiddenCostInput>) {
    setCosts((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }
  function addCost() {
    setCosts((prev) => [...prev, { labelAr: '', monthlySAR: 0, isRequired: true, scenarios: [] }]);
  }
  function removeCost(i: number) {
    setCosts((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-10">
      {/* Tiers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">باقات الأسعار</h3>
          <button onClick={addTier} className="btn-glass text-xs px-3 py-1.5">
            <Plus size={13} /> إضافة باقة
          </button>
        </div>
        <div className="space-y-3">
          {tiers.map((tier, i) => (
            <div key={i} className="glass p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <LabeledInput label="الاسم بالعربية" value={tier.nameAr} onChange={(v) => updateTier(i, { nameAr: v })} dir="rtl" compact />
              <LabeledInput label="رسوم شهرية (ر.س)" type="number" value={String(tier.monthlyFeeSAR)} onChange={(v) => updateTier(i, { monthlyFeeSAR: Number(v) })} compact />
              <LabeledInput label="رسوم المعاملات (%)" type="number" value={String(tier.transactionFeePct)} onChange={(v) => updateTier(i, { transactionFeePct: Number(v) })} compact />
              <LabeledInput label="حد أدنى للإيراد" type="number" value={String(tier.minRevenueSAR)} onChange={(v) => updateTier(i, { minRevenueSAR: Number(v) })} compact />
              <LabeledInput label="حد أقصى للإيراد" type="number" value={tier.maxRevenueSAR === null ? '' : String(tier.maxRevenueSAR)} onChange={(v) => updateTier(i, { maxRevenueSAR: v === '' ? null : Number(v) })} compact />
              <LabeledInput label="حد أقصى للطلبات" type="number" value={tier.maxOrders === null ? '' : String(tier.maxOrders)} onChange={(v) => updateTier(i, { maxOrders: v === '' ? null : Number(v) })} compact />
              <div className="flex items-end">
                <button onClick={() => removeTier(i)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1">
                  <Trash2 size={13} /> حذف
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => startTiers(() => saveTiers(platform.id, tiers))}
          disabled={isPendingTiers}
          className="btn-primary text-sm px-5 py-2.5 mt-4 disabled:opacity-50"
        >
          <Save size={14} /> حفظ الباقات
        </button>
      </div>

      {/* Hidden costs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">التكاليف الخفية</h3>
          <button onClick={addCost} className="btn-glass text-xs px-3 py-1.5">
            <Plus size={13} /> إضافة تكلفة
          </button>
        </div>
        <div className="space-y-3">
          {costs.map((cost, i) => (
            <div key={i} className="glass p-4 grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
              <LabeledInput label="الوصف" value={cost.labelAr} onChange={(v) => updateCost(i, { labelAr: v })} dir="rtl" compact />
              <LabeledInput label="القيمة (ر.س/شهر)" type="number" value={String(cost.monthlySAR)} onChange={(v) => updateCost(i, { monthlySAR: Number(v) })} compact />
              <LabeledInput
                label="السيناريوهات (مفصولة بفاصلة)"
                value={cost.scenarios.join(',')}
                onChange={(v) => updateCost(i, { scenarios: v.split(',').map((s) => s.trim()).filter(Boolean) })}
                compact
              />
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={cost.isRequired} onChange={(e) => updateCost(i, { isRequired: e.target.checked })} />
                <label className="text-xs text-slate-400">إلزامي</label>
                <button onClick={() => removeCost(i)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 mr-auto">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => startCosts(() => saveHiddenCosts(platform.id, costs))}
          disabled={isPendingCosts}
          className="btn-primary text-sm px-5 py-2.5 mt-4 disabled:opacity-50"
        >
          <Save size={14} /> حفظ التكاليف الخفية
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Tab 3 — Feature matrix                                              */
/* ---------------------------------------------------------------- */

function FeaturesTab({ platform, categories }: { platform: PlatformEditorData; categories: { id: string; nameAr: string }[] }) {
  const [features, setFeatures] = useState<FeatureInput[]>(
    platform.features.map((f) => ({ categoryId: f.categoryId, featureNameAr: f.featureNameAr, supported: f.supported, noteAr: f.noteAr }))
  );
  const [isPending, startTransition] = useTransition();

  function update(i: number, patch: Partial<FeatureInput>) {
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }
  function add() {
    setFeatures((prev) => [...prev, { categoryId: categories[0]?.id ?? '', featureNameAr: '', supported: 'no' }]);
  }
  function remove(i: number) {
    setFeatures((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white">مصفوفة المزايا</h3>
        <button onClick={add} className="btn-glass text-xs px-3 py-1.5">
          <Plus size={13} /> إضافة ميزة
        </button>
      </div>
      <div className="space-y-2">
        {features.map((f, i) => (
          <div key={i} className="glass p-3 grid grid-cols-[1fr_140px_auto_auto] gap-3 items-center">
            <input
              value={f.featureNameAr}
              onChange={(e) => update(i, { featureNameAr: e.target.value })}
              placeholder="اسم الميزة"
              dir="rtl"
              className="admin-mini-input"
            />
            <select value={f.categoryId} onChange={(e) => update(i, { categoryId: e.target.value })} className="admin-mini-input" dir="rtl">
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nameAr}</option>
              ))}
            </select>
            <div className="flex gap-1">
              {(['yes', 'partial', 'no'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => update(i, { supported: level })}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    f.supported === level
                      ? level === 'yes' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : level === 'partial' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-red-500/20 border-red-500/40 text-red-400'
                      : 'border-white/10 text-slate-500'
                  }`}
                >
                  {level === 'yes' ? <Check size={14} /> : level === 'partial' ? <Minus size={14} /> : <X size={14} />}
                </button>
              ))}
            </div>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => startTransition(() => saveFeatures(platform.id, features))}
        disabled={isPending}
        className="btn-primary text-sm px-5 py-2.5 mt-4 disabled:opacity-50"
      >
        <Save size={14} /> حفظ المزايا
      </button>

      <style jsx global>{`
        .admin-mini-input {
          border-radius: 0.4rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.4rem 0.6rem;
          font-size: 0.75rem;
          color: white;
        }
      `}</style>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Tab 4 — Pros & Cons                                                  */
/* ---------------------------------------------------------------- */

function ProsConsTab({ platform }: { platform: PlatformEditorData }) {
  const [pros, setPros] = useState(platform.pros.map((p) => p.textAr));
  const [cons, setCons] = useState(platform.cons.map((c) => c.textAr));
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ListEditor title="المميزات" items={pros} setItems={setPros} />
        <ListEditor title="العيوب" items={cons} setItems={setCons} />
      </div>
      <button
        onClick={() => startTransition(() => saveProsAndCons(platform.id, pros, cons))}
        disabled={isPending}
        className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50"
      >
        <Save size={14} /> حفظ
      </button>
    </div>
  );
}

function ListEditor({ title, items, setItems }: { title: string; items: string[]; setItems: (v: string[]) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <button onClick={() => setItems([...items, ''])} className="btn-glass text-xs px-2.5 py-1">
          <Plus size={12} />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => setItems(items.map((it, idx) => (idx === i ? e.target.value : it)))}
              dir="rtl"
              className="admin-mini-input flex-1"
            />
            <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Tab 5 — Summary & recommendation                                    */
/* ---------------------------------------------------------------- */

function SummaryTab({ platform }: { platform: PlatformEditorData }) {
  const [quickVerdictAr, setQuickVerdictAr] = useState(platform.quickVerdictAr ?? '');
  const [bestForTypes, setBestForTypes] = useState(platform.bestForTypes.join(', '));
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-5 max-w-2xl">
      <LabeledTextarea label="الحكم السريع (Quick Verdict)" value={quickVerdictAr} onChange={setQuickVerdictAr} rows={5} />
      <LabeledInput label="الأنسب لـ (مفصولة بفاصلة)" value={bestForTypes} onChange={setBestForTypes} dir="rtl" />
      <button
        onClick={() =>
          startTransition(() =>
            saveSummary(platform.id, quickVerdictAr, bestForTypes.split(',').map((s) => s.trim()).filter(Boolean))
          )
        }
        disabled={isPending}
        className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50"
      >
        <Save size={14} /> حفظ
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Shared field components                                            */
/* ---------------------------------------------------------------- */

function LabeledInput({
  label,
  value,
  onChange,
  type = 'text',
  dir = 'ltr',
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  dir?: 'ltr' | 'rtl';
  compact?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        className={compact ? 'admin-mini-input w-full' : 'admin-input-full'}
      />
      <style jsx global>{`
        .admin-input-full {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          color: white;
        }
        .admin-mini-input {
          border-radius: 0.4rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.4rem 0.6rem;
          font-size: 0.75rem;
          color: white;
        }
      `}</style>
    </div>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir="rtl"
        rows={rows}
        className="admin-input-full resize-none"
      />
    </div>
  );
}
