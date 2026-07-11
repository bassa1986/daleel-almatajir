const fs = require('fs');
const path = require('path');

const files = {
  'components/home/hero-section.tsx': `'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, RefreshCw, BarChart2 } from 'lucide-react';
import type { PlatformDisplay } from '@/lib/data/platforms';

const TRUST_ITEMS = [
  { icon: BarChart2, text: '٦ منصات' },
  { icon: RefreshCw, text: 'بيانات محدّثة يونيو ٢٠٢٦' },
  { icon: Shield, text: 'مستقل وموضوعي' },
];

const PLATFORM_COLORS: Record<string, string> = {
  salla: '#4CAF50', zid: '#2196F3', shopify: '#96BF48',
  woocommerce: '#7F54B3', bigcommerce: '#34313F', magento: '#F26322',
};

interface HeroSectionProps { platforms: PlatformDisplay[]; }

export function HeroSection({ platforms }: HeroSectionProps) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden mesh-gradient flex flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          المرجع التقني الأول للتجارة الإلكترونية بالسعودية
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
          اختر منصة متجرك
          <span className="block text-secondary mt-2">بثقة</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          المرجع الأول عربياً لمقارنة سلة، زد، شوبيفاي، ووكومرس، BigCommerce وماجنتو — بأسعار حقيقية بالريال السعودي
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/calculator" className="btn btn-primary px-8 py-4 rounded-full text-lg font-bold">← احسب تكاليفك الآن</Link>
          <Link href="/muqaranat" className="btn btn-ghost px-8 py-4 rounded-full text-lg font-bold">← قارن المنصات</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 mb-14">
          {TRUST_ITEMS.map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon size={16} className="text-secondary" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        {platforms && platforms.length > 0 && (
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {platforms.map((platform, i) => (
              <motion.div key={platform.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                className="glass px-4 py-2 rounded-full text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[platform.slug] || '#fff' }} />
                {platform.nameAr}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}`,

  'components/layout/site-header.tsx': `'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/muqaranat', label: 'المقارنات' },
  { href: '/calculator', label: 'الحاسبة' },
  { href: '/adilla', label: 'الأدلة' },
  { href: '/case-studies', label: 'دراسات الحالة' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-white tracking-tight">دليل المتاجر</Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white transition-colors font-medium">{link.label}</Link>
          ))}
        </nav>
        <Link href="/calculator" className="hidden md:flex btn btn-primary text-sm px-4 py-2 rounded-full font-bold">← احسب تكلفتك</Link>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-white/6 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-slate-300 hover:text-white font-medium">{link.label}</Link>
          ))}
          <Link href="/calculator" onClick={() => setOpen(false)} className="btn btn-primary text-sm px-4 py-2 rounded-full font-bold text-center">← احسب تكلفتك</Link>
        </div>
      )}
    </header>
  );
}`,

  'components/layout/site-footer.tsx': `import Link from 'next/link';

const MAIN_LINKS = [
  { href: '/muqaranat', label: 'المقارنات' },
  { href: '/calculator', label: 'الحاسبة' },
  { href: '/adilla', label: 'الأدلة' },
  { href: '/case-studies', label: 'دراسات الحالة' },
];

const LEGAL_LINKS = [
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/affiliate-disclosure', label: 'إفصاح الروابط التابعة' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-background/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-xl font-extrabold text-white mb-3 block">دليل المتاجر</Link>
            <p className="text-slate-400 text-sm leading-relaxed">المرجع الأول عربياً لمقارنة منصات التجارة الإلكترونية في السوق السعودي والخليجي.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">الصفحات</h3>
            <ul className="space-y-2">
              {MAIN_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">قانوني</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} دليل المتاجر. جميع الحقوق محفوظة.</p>
          <p className="text-slate-600 text-xs">مستقل وموضوعي — لسنا تابعين لأي منصة</p>
        </div>
      </div>
    </footer>
  );
}`,

  'app/layout.tsx': `import type { Metadata, Viewport } from 'next';
import { cairo } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'دليل المتاجر — مقارنة منصات التجارة الإلكترونية',
    template: '%s | دليل المتاجر',
  },
  description: 'المرجع الأول عربياً لمقارنة سلة، زد، شوبيفاي، ووكومرس، BigCommerce وماجنتو.',
};

export const viewport: Viewport = {
  themeColor: '#0A0F1E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head><meta charSet="utf-8" /></head>
      <body className="min-h-screen bg-background font-sans text-slate-200 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}`,
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.writeFileSync(fullPath, content, { encoding: 'utf8' });
  console.log('Written: ' + filePath);
}
console.log('Done!');
