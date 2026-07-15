const fs = require("fs");
const q = String.fromCharCode(39);
const content = `${q}use client${q};
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/star-rating";
import type { PlatformDisplay } from "@/lib/data/platforms";

interface PlatformGridProps { platforms: PlatformDisplay[]; }

const LOGO_EXT: Record<string, string> = {
  shopify: "png",
  zid: "png",
  salla: "png",
  woocommerce: "svg",
  bigcommerce: "svg",
  magento: "svg",
};

export function PlatformGrid({ platforms }: PlatformGridProps) {
  if (!platforms || platforms.length === 0) return null;
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">\u0627\u0644\u0645\u0646\u0635\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629</h2>
          <p className="text-slate-400">\u0666 \u0645\u0646\u0635\u0627\u062A \u0628\u0623\u0633\u0639\u0627\u0631 \u062D\u0642\u064A\u0642\u064A\u0629 \u0628\u0627\u0644\u0631\u064A\u0627\u0644 \u0627\u0644\u0633\u0639\u0648\u062F\u064A</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={\`/muqaranat/\${p.slug}\`} className="glass glass-hover p-6 block h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden p-1"
                    style={{ backgroundColor: \`\${p.brandColor}22\` }}>
                    <Image
                      src={\`/logos/\${p.slug}.\${LOGO_EXT[p.slug] || "svg"}\`}
                      alt={p.nameAr}
                      width={56}
                      height={56}
                      className="object-contain w-full h-full"
                      unoptimized
                    />
                  </div>
                  <span className={\`badge text-xs \${p.origin === "GCC" ? "badge-secondary" : "badge-primary"}\`}>
                    {p.origin === "GCC" ? "\u062E\u0644\u064A\u062C\u064A" : "\u0639\u0627\u0644\u0645\u064A"}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">{p.nameAr}</h3>
                <StarRating rating={p.rating} className="mb-3" />
                <div className="mt-auto text-lg font-bold text-white">
                  {p.startingPriceSAR === 0
                    ? <span className="text-emerald-400">\u0645\u062C\u0627\u0646\u064A</span>
                    : <>{p.startingPriceSAR.toLocaleString("en-US")} <span className="text-sm text-slate-400">\u0631.\u0633/\u0634\u0647\u0631</span></>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync("components/home/platform-grid.tsx", content, "utf8");
console.log("Written. Has Arabic:", /[\\u0600-\\u06FF]/.test(fs.readFileSync("components/home/platform-grid.tsx","utf8")));
