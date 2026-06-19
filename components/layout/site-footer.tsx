'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Youtube, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { subscribeEmail } from '@/lib/actions/subscribe';

const NAV_LINKS = [
  { href: '/مقارنات', labelAr: 'المقارنات' },
  { href: '/حاسبة-التكاليف', labelAr: 'الحاسبة' },
  { href: '/أدلة', labelAr: 'الأدلة' },
  { href: '/دراسات-الحالة', labelAr: 'دراسات الحالة' },
];

const LEGAL_LINKS = [
  { href: '/سياسة-الخصوصية', labelAr: 'سياسة الخصوصية' },
  { href: '/إفصاح-التابع', labelAr: 'إفصاح الروابط التابعة' },
];

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubscribe() {
    if (!email) return;
    setStatus('loading');
    const result = await subscribeEmail(email, 'footer');
    setStatus(result.success ? 'success' : 'error');
    setMessage(result.messageAr);
    if (result.success) setEmail('');
  }

  return (
    <footer className="border-t border-white/6 bg-surface/50 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Newsletter + brand row */}
        <div className="grid md:grid-cols-2 gap-12 mb-14">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-3">دليل المتاجر</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-sm">
              المرجع الأول عربياً لمقارنة منصات التجارة الإلكترونية. بيانات مستقلة وموضوعية،
              محدّثة دورياً، للمساعدة في اتخاذ القرار الصحيح.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تويتر"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="لينكدإن"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="يوتيوب"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Mail size={18} className="text-secondary" />
              اشترك في النشرة الأسبوعية
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              أحدث مقارنات الأسعار وتحديثات المنصات مباشرةً إلى بريدك.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-emerald-400 text-sm font-semibold"
              >
                <CheckCircle2 size={18} />
                {message}
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 backdrop-blur-sm transition-all"
                  dir="ltr"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading' || !email}
                  className="btn-primary text-sm px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? '...' : 'اشترك'}
                </button>
              </div>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-xs mt-2">{message}</p>
            )}
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {link.labelAr}
            </Link>
          ))}
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              {link.labelAr}
            </Link>
          ))}
        </div>

        <div className="section-divider mb-8" />

        {/* Affiliate disclosure */}
        <div className="glass p-5 mb-8 rounded-xl">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-400">إفصاح: </span>
            دليل المتاجر موقع مستقل، وقد نحصل على عمولة من بعض الروابط التابعة في هذا الموقع دون
            أي تكلفة إضافية عليك. هذا لا يؤثر على تقييماتنا أو ترتيب المقارنات، والتي تستند
            إلى أسعار ومزايا حقيقية لكل منصة.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <span>© ٢٠٢٦ دليل المتاجر — مستقل عن جميع المنصات المذكورة</span>
          <span className="flex items-center gap-1">
            صُنع بـ ♥ للتجار العرب
          </span>
        </div>
      </div>
    </footer>
  );
}
