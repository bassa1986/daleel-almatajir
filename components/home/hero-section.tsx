'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, RefreshCw, BarChart2 } from "lucide-react";
import type { PlatformDisplay } from "@/lib/data/platforms";

const TRUST_ITEMS = [
  { icon: BarChart2, text: "٦ منصات" },
  { icon: RefreshCw, text: "بيانات محدَّثة يونيو ٢٠٢٦" },
  { icon: Shield, text: "مستقل وموضوعي" },
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
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[platform.slug] || "#fff" }} />
                {platform.nameAr}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}