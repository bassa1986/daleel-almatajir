const fs = require("fs");
const q = String.fromCharCode(39);

// Helper to write file and report
function w(path, content) {
  fs.writeFileSync(path, content, "utf8");
  const ok = fs.readFileSync(path, "utf8").substring(0, 50);
  console.log("OK:", path, "->", ok.substring(0, 40));
}

// All Arabic text as unicode escapes
const A = {
  heroTitle: "\u0627\u062E\u062A\u0631 \u0645\u0646\u0635\u0629 \u0645\u062A\u062C\u0631\u0643",
  heroSub: "\u0628\u062B\u0642\u0629",
  heroDesc: "\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0623\u0648\u0644 \u0639\u0631\u0628\u064A\u0627\u064B \u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0633\u0644\u0629\u060C \u0632\u062F\u060C \u0634\u0648\u0628\u064A\u0641\u0627\u064A\u060C \u0648\u0648\u0643\u0648\u0645\u0631\u0633\u060C BigCommerce \u0648\u0645\u0627\u062C\u0646\u062A\u0648 \u2014 \u0628\u0623\u0633\u0639\u0627\u0631 \u062D\u0642\u064A\u0642\u064A\u0629 \u0628\u0627\u0644\u0631\u064A\u0627\u0644 \u0627\u0644\u0633\u0639\u0648\u062F\u064A",
  heroBtn1: "\u2190 \u0627\u062D\u0633\u0628 \u062A\u0643\u0627\u0644\u064A\u0641\u0643 \u0627\u0644\u0622\u0646",
  heroBtn2: "\u2190 \u0642\u0627\u0631\u0646 \u0627\u0644\u0645\u0646\u0635\u0627\u062A",
  trust1: "\u0666 \u0645\u0646\u0635\u0627\u062A",
  trust2: "\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u062F\u064E\u0651\u062B\u0629 \u064A\u0648\u0646\u064A\u0648 \u0662\u0660\u0662\u0666",
  trust3: "\u0645\u0633\u062A\u0642\u0644 \u0648\u0645\u0648\u0636\u0648\u0639\u064A",
  refFirst: "\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u062A\u0642\u0646\u064A \u0627\u0644\u0623\u0648\u0644 \u0644\u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0628\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629",
  compPlatforms: "\u0627\u0644\u0645\u0646\u0635\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629",
  sixPlatforms: "\u0666 \u0645\u0646\u0635\u0627\u062A \u0628\u0623\u0633\u0639\u0627\u0631 \u062D\u0642\u064A\u0642\u064A\u0629 \u0628\u0627\u0644\u0631\u064A\u0627\u0644 \u0627\u0644\u0633\u0639\u0648\u062F\u064A",
  gcc: "\u062E\u0644\u064A\u062C\u064A",
  global: "\u0639\u0627\u0644\u0645\u064A",
  free: "\u0645\u062C\u0627\u0646\u064A",
  sarMonth: "\u0631.\u0633/\u0634\u0647\u0631",
  compareTitle: "\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u0646\u0635\u0627\u062A",
  chooseOrCompare: "\u0627\u062E\u062A\u0631 \u0645\u0646\u0635\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0623\u0648 \u0642\u0627\u0631\u0646 \u0628\u064A\u0646 \u0645\u0646\u0635\u062A\u064A\u0646",
  platformReviews: "\u0645\u0631\u0627\u062C\u0639\u0627\u062A \u0627\u0644\u0645\u0646\u0635\u0627\u062A",
  directCompare: "\u0645\u0642\u0627\u0631\u0646\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629 (VS)",
  mostFamous: "\u0623\u0634\u0647\u0631 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0627\u062A",
  chooseComparison: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u062A\u064A \u062A\u0646\u0627\u0633\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A\u0643",
  allComparisons: "\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0627\u062A \u2190",
  calcTitle: "\u062D\u0627\u0633\u0628\u0629 \u062A\u0643\u0627\u0644\u064A\u0641 \u0627\u0644\u0645\u0646\u0635\u0627\u062A",
  calcDesc1: "\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u062C\u0631\u0643 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0645\u0642\u0627\u0631\u0646\u0629 \u062F\u0642\u064A\u0642\u0629 \u0628\u064A\u0646 ",
  calcDesc2: " \u0645\u0646\u0635\u0627\u062A \u0628\u0627\u0644\u0631\u064A\u0627\u0644 \u0627\u0644\u0633\u0639\u0648\u062F\u064A",
  caseTitle: "\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629",
  caseDesc: "\u0642\u0635\u0635 \u0646\u062C\u0627\u062D \u062D\u0642\u064A\u0642\u064A\u0629 \u0645\u0646 \u062A\u062C\u0627\u0631 \u064A\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0647\u0630\u0647 \u0627\u0644\u0645\u0646\u0635\u0627\u062A. \u0642\u0631\u064A\u0628\u0627\u064B.",
  guidesTitle: "\u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A",
  guidesDesc: "\u0645\u0642\u0627\u0644\u0627\u062A \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0644\u0644\u0633\u0648\u0642 \u0627\u0644\u062E\u0644\u064A\u062C\u064A",
  noArticles: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0642\u0627\u0644\u0627\u062A \u0628\u0639\u062F. \u0642\u0631\u064A\u0628\u0627\u064B!",
  privacyTitle: "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
  privacyText: "\u0646\u062D\u0646 \u0646\u062D\u062A\u0631\u0645 \u062E\u0635\u0648\u0635\u064A\u062A\u0643. \u0644\u0627 \u0646\u0628\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0644\u0623\u0637\u0631\u0627\u0641 \u062B\u0627\u0644\u062B\u0629.",
  affTitle: "\u0625\u0641\u0635\u0627\u062D \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0628\u0639\u0629",
  affText: "\u0628\u0639\u0636 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639 \u0647\u064A \u0631\u0648\u0627\u0628\u0637 \u062A\u0627\u0628\u0639\u0629. \u0639\u0646\u062F \u0627\u0644\u0634\u0631\u0627\u0621 \u0639\u0628\u0631\u0647\u0627 \u0646\u062D\u0635\u0644 \u0639\u0644\u0649 \u0639\u0645\u0648\u0644\u0629 \u0635\u063A\u064A\u0631\u0629 \u062F\u0648\u0646 \u0623\u064A \u062A\u0643\u0644\u0641\u0629 \u0625\u0636\u0627\u0641\u064A\u0629 \u0639\u0644\u064A\u0643.",
  siteTitle: "\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u062A\u0627\u062C\u0631",
  siteMeta: "\u0645\u0642\u0627\u0631\u0646\u0629 \u0645\u0646\u0635\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",
  siteDesc: "\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0623\u0648\u0644 \u0639\u0631\u0628\u064A\u0627\u064B \u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0633\u0644\u0629\u060C \u0632\u062F\u060C \u0634\u0648\u0628\u064A\u0641\u0627\u064A\u060C \u0648\u0648\u0643\u0648\u0645\u0631\u0633\u060C BigCommerce \u0648\u0645\u0627\u062C\u0646\u062A\u0648.",
  calcBtn: "\u2190 \u0627\u062D\u0633\u0628 \u062A\u0643\u0644\u0641\u062A\u0643",
  nav1: "\u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0627\u062A",
  nav2: "\u0627\u0644\u062D\u0627\u0633\u0628\u0629",
  nav3: "\u0627\u0644\u0623\u062F\u0644\u0629",
  nav4: "\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629",
  footerDesc: "\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0623\u0648\u0644 \u0639\u0631\u0628\u064A\u0627\u064B \u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0645\u0646\u0635\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0641\u064A \u0627\u0644\u0633\u0648\u0642 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0648\u0627\u0644\u062E\u0644\u064A\u062C\u064A.",
  pages: "\u0627\u0644\u0635\u0641\u062D\u0627\u062A",
  legal: "\u0642\u0627\u0646\u0648\u0646\u064A",
  rights: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.",
  independent: "\u0645\u0633\u062A\u0642\u0644 \u0648\u0645\u0648\u0636\u0648\u0639\u064A \u2014 \u0644\u0633\u0646\u0627 \u062A\u0627\u0628\u0639\u064A\u0646 \u0644\u0623\u064A \u0645\u0646\u0635\u0629",
  privacy: "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
  affLink: "\u0625\u0641\u0635\u0627\u062D \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0628\u0639\u0629",
  salla: "\u0633\u0644\u0629",
  zid: "\u0632\u062F",
  shopify: "\u0634\u0648\u0628\u064A\u0641\u0627\u064A",
  woo: "\u0648\u0648\u0643\u0648\u0645\u0631\u0633",
  big: "\u0628\u064A\u063A \u0643\u0648\u0645\u0631\u0633",
};

// 1. app/layout.tsx
w("app/layout.tsx", `import type { Metadata, Viewport } from "next";
import { cairo } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "${A.siteTitle} \u2014 ${A.siteMeta}",
    template: "%s | ${A.siteTitle}",
  },
  description: "${A.siteDesc}",
};

export const viewport: Viewport = { themeColor: "#0A0F1E" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head><meta charSet="utf-8" /></head>
      <body className="min-h-screen bg-background font-sans text-slate-200 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}`);

// 2. components/layout/site-header.tsx
w("components/layout/site-header.tsx", `${q}use client${q};
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/muqaranat", label: "${A.nav1}" },
  { href: "/calculator", label: "${A.nav2}" },
  { href: "/adilla", label: "${A.nav3}" },
  { href: "/case-studies", label: "${A.nav4}" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-white tracking-tight">${A.siteTitle}</Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white transition-colors font-medium">{link.label}</Link>
          ))}
        </nav>
        <Link href="/calculator" className="hidden md:flex btn btn-primary text-sm px-4 py-2 rounded-full font-bold">${A.calcBtn}</Link>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-white/6 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-slate-300 hover:text-white font-medium">{link.label}</Link>
          ))}
          <Link href="/calculator" onClick={() => setOpen(false)} className="btn btn-primary text-sm px-4 py-2 rounded-full font-bold text-center">${A.calcBtn}</Link>
        </div>
      )}
    </header>
  );
}`);

// 3. components/layout/site-footer.tsx
w("components/layout/site-footer.tsx", `import Link from "next/link";

const MAIN_LINKS = [
  { href: "/muqaranat", label: "${A.nav1}" },
  { href: "/calculator", label: "${A.nav2}" },
  { href: "/adilla", label: "${A.nav3}" },
  { href: "/case-studies", label: "${A.nav4}" },
];
const LEGAL_LINKS = [
  { href: "/privacy", label: "${A.privacy}" },
  { href: "/affiliate-disclosure", label: "${A.affLink}" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-background/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-xl font-extrabold text-white mb-3 block">${A.siteTitle}</Link>
            <p className="text-slate-400 text-sm leading-relaxed">${A.footerDesc}</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">${A.pages}</h3>
            <ul className="space-y-2">
              {MAIN_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">${A.legal}</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">\u00A9 {new Date().getFullYear()} ${A.siteTitle}. ${A.rights}</p>
          <p className="text-slate-600 text-xs">${A.independent}</p>
        </div>
      </div>
    </footer>
  );
}`);

// 4. components/home/hero-section.tsx
w("components/home/hero-section.tsx", `${q}use client${q};
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, RefreshCw, BarChart2 } from "lucide-react";
import type { PlatformDisplay } from "@/lib/data/platforms";

const TRUST_ITEMS = [
  { icon: BarChart2, text: "${A.trust1}" },
  { icon: RefreshCw, text: "${A.trust2}" },
  { icon: Shield, text: "${A.trust3}" },
];

const PLATFORM_COLORS: Record<string, string> = {
  salla: "#4CAF50", zid: "#2196F3", shopify: "#96BF48",
  woocommerce: "#7F54B3", bigcommerce: "#34313F", magento: "#F26322",
};

interface HeroSectionProps { platforms: PlatformDisplay[]; }

export function HeroSection({ platforms }: HeroSectionProps) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden mesh-gradient flex flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          ${A.refFirst}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
          ${A.heroTitle}
          <span className="block text-secondary mt-2">${A.heroSub}</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          ${A.heroDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/calculator" className="btn btn-primary px-8 py-4 rounded-full text-lg font-bold">${A.heroBtn1}</Link>
          <Link href="/muqaranat" className="btn btn-ghost px-8 py-4 rounded-full text-lg font-bold">${A.heroBtn2}</Link>
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
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[platform.slug] || "#fff" }} />
                {platform.nameAr}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}`);

// 5. components/home/top-comparisons.tsx
w("components/home/top-comparisons.tsx", `${q}use client${q};
import Link from "next/link";
import { motion } from "framer-motion";

const COMPARISONS = [
  { slugA: "salla", slugB: "zid", nameA: "${A.salla}", nameB: "${A.zid}" },
  { slugA: "salla", slugB: "shopify", nameA: "${A.salla}", nameB: "${A.shopify}" },
  { slugA: "zid", slugB: "shopify", nameA: "${A.zid}", nameB: "${A.shopify}" },
  { slugA: "shopify", slugB: "woocommerce", nameA: "${A.shopify}", nameB: "${A.woo}" },
  { slugA: "salla", slugB: "woocommerce", nameA: "${A.salla}", nameB: "${A.woo}" },
  { slugA: "shopify", slugB: "bigcommerce", nameA: "${A.shopify}", nameB: "${A.big}" },
];

export function TopComparisons() {
  return (
    <section className="py-20 px-4 bg-white/2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">${A.mostFamous}</h2>
          <p className="text-slate-400">${A.chooseComparison}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISONS.map(({ slugA, slugB, nameA, nameB }) => (
            <motion.div key={\`\${slugA}-\${slugB}\`} whileHover={{ scale: 1.02 }}>
              <Link href={\`/muqaranat/\${slugA}-vs-\${slugB}\`} className="glass glass-hover flex items-center justify-between p-5 block">
                <span className="font-bold text-white">{nameA}</span>
                <span className="badge badge-neutral text-xs font-extrabold px-3 py-1">VS</span>
                <span className="font-bold text-white">{nameB}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/muqaranat" className="text-secondary hover:underline font-semibold">${A.allComparisons}</Link>
        </div>
      </div>
    </section>
  );
}`);

// 6. app/muqaranat/page.tsx
w("app/muqaranat/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getPlatformsForDisplay } from "@/lib/data/platforms";
import { StarRating } from "@/components/ui/star-rating";
export const metadata: Metadata = { title: "${A.compareTitle} \u0662\u0660\u0662\u0666" };
export const revalidate = 3600;
const VS_PAIRS = [
  ["salla","zid"],["salla","shopify"],["salla","woocommerce"],["zid","shopify"],["zid","woocommerce"],
  ["shopify","woocommerce"],["salla","bigcommerce"],["zid","bigcommerce"],["shopify","bigcommerce"],
  ["woocommerce","bigcommerce"],["salla","magento"],["zid","magento"],["shopify","magento"],
  ["woocommerce","magento"],["bigcommerce","magento"],
] as const;
export default async function ComparisonsPage() {
  const platforms = await getPlatformsForDisplay();
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-white mb-4">${A.compareTitle}</h1>
            <p className="text-slate-400 text-xl">${A.chooseOrCompare}</p>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-6">${A.platformReviews}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {platforms.map((p) => (
              <Link key={p.slug} href={\`/muqaranat/\${p.slug}\`} className="glass glass-hover p-6 block">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden p-1" style={{ backgroundColor: \`\${p.brandColor}22\` }}>
                    <img src={\`/logos/\${p.slug}.png\`} alt={p.nameAr} className="w-full h-full object-contain" />
                  </div>
                  <span className={\`badge text-xs \${p.origin==="GCC"?"badge-secondary":"badge-primary"}\`}>{p.origin==="GCC"?"${A.gcc}":"${A.global}"}</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">{p.nameAr}</h3>
                <StarRating rating={p.rating} className="mb-3" />
                <div className="text-lg font-bold text-white">
                  {p.startingPriceSAR===0?<span className="text-emerald-400">${A.free}</span>:<>{p.startingPriceSAR.toLocaleString("en-US")} <span className="text-sm text-slate-400">${A.sarMonth}</span></>}
                </div>
              </Link>
            ))}
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-6">${A.directCompare}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VS_PAIRS.map(([a,b])=>{
              const pa=platforms.find(p=>p.slug===a);
              const pb=platforms.find(p=>p.slug===b);
              if(!pa||!pb)return null;
              return(
                <Link key={\`\${a}-\${b}\`} href={\`/muqaranat/\${a}-vs-\${b}\`} className="glass glass-hover flex items-center gap-3 p-4">
                  <span className="font-bold text-white text-sm flex-1">{pa.nameAr}</span>
                  <span className="badge badge-neutral text-xs font-extrabold">VS</span>
                  <span className="font-bold text-white text-sm flex-1 text-left">{pb.nameAr}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`);

// 7. app/calculator/page.tsx
w("app/calculator/page.tsx", `import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CalculatorApp } from "@/components/calculator/calculator-app";
import { getPlatformsForCalculator } from "@/lib/data/platforms";
export const metadata: Metadata = { title: "${A.calcTitle} \u0662\u0660\u0662\u0666" };
export const revalidate = 3600;
export default async function CalculatorPage() {
  const platforms = await getPlatformsForCalculator();
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">${A.calcTitle}</h1>
          <p className="text-slate-400 text-lg">${A.calcDesc1}{platforms.length}${A.calcDesc2}</p>
        </div>
        <Suspense fallback={<div className="max-w-5xl mx-auto"><div className="glass h-64 mb-8 animate-pulse"/></div>}>
          <CalculatorApp platforms={platforms}/>
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}`);

// 8. app/case-studies/page.tsx
w("app/case-studies/page.tsx", `import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
export const metadata: Metadata = { title: "${A.caseTitle} \u2014 ${A.siteTitle}" };
export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="text-center glass p-16 max-w-lg">
          <h1 className="text-4xl font-extrabold text-white mb-4">${A.caseTitle}</h1>
          <p className="text-slate-400">${A.caseDesc}</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`);

// 9. app/adilla/page.tsx
w("app/adilla/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { prisma } from "@/lib/db";
export const metadata: Metadata = { title: "${A.guidesTitle} \u2014 ${A.siteTitle}" };
export const revalidate = 3600;
export default async function GuidesPage() {
  const articles = await prisma.article.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" }, take: 20 });
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-white mb-4">${A.guidesTitle}</h1>
            <p className="text-slate-400 text-xl">${A.guidesDesc}</p>
          </div>
          {articles.length===0?(
            <div className="glass p-16 text-center"><p className="text-slate-400 text-lg">${A.noArticles}</p></div>
          ):(
            <div className="grid gap-6">
              {articles.map((article)=>(
                <Link key={article.id} href={\`/adilla/\${article.slug}\`} className="glass glass-hover p-6 block">
                  <h2 className="text-xl font-extrabold text-white mb-2">{article.titleAr}</h2>
                  {article.metaDescAr&&<p className="text-slate-400 text-sm">{article.metaDescAr}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`);

// 10. app/privacy/page.tsx
w("app/privacy/page.tsx", `import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
export const metadata: Metadata = { title: "${A.privacyTitle} \u2014 ${A.siteTitle}" };
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-10">
          <h1 className="text-4xl font-extrabold text-white mb-6">${A.privacyTitle}</h1>
          <p className="text-slate-300 leading-relaxed">${A.privacyText}</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`);

// 11. app/affiliate-disclosure/page.tsx
w("app/affiliate-disclosure/page.tsx", `import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
export const metadata: Metadata = { title: "${A.affTitle} \u2014 ${A.siteTitle}" };
export default function AffiliateDisclosurePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-10">
          <h1 className="text-4xl font-extrabold text-white mb-6">${A.affTitle}</h1>
          <p className="text-slate-300 leading-relaxed">${A.affText}</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}`);

console.log("\nAll files written successfully!");
console.log("Verifying Arabic in key files:");
["app/layout.tsx","components/layout/site-header.tsx","components/home/hero-section.tsx","components/home/top-comparisons.tsx","app/muqaranat/page.tsx"].forEach(f => {
  const c = fs.readFileSync(f, "utf8");
  const hasArabic = /[\u0600-\u06FF]/.test(c);
  console.log((hasArabic ? "OK" : "FAIL") + ": " + f);
});