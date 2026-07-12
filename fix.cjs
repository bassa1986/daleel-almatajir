const fs = require("fs");
const s = "\u0633\u0644\u0629";
const z = "\u0632\u062F";
const sh = "\u0634\u0648\u0628\u064A\u0641\u0627\u064A";
const w = "\u0648\u0648\u0643\u0648\u0645\u0631\u0633";
const b = "\u0628\u064A\u063A \u0643\u0648\u0645\u0631\u0633";
const ah = "\u0623\u0634\u0647\u0631 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0627\u062A";
const ch = "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u062A\u064A \u062A\u0646\u0627\u0633\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A\u0643";
const all = "\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0627\u062A \u2190";
const lines = [
"use client",
`import Link from "next/link";`,
`import { motion } from "framer-motion";`,
"",
"const COMPARISONS = [",
`  { slugA: "salla", slugB: "zid", nameA: "${s}", nameB: "${z}" },`,
`  { slugA: "salla", slugB: "shopify", nameA: "${s}", nameB: "${sh}" },`,
`  { slugA: "zid", slugB: "shopify", nameA: "${z}", nameB: "${sh}" },`,
`  { slugA: "shopify", slugB: "woocommerce", nameA: "${sh}", nameB: "${w}" },`,
`  { slugA: "salla", slugB: "woocommerce", nameA: "${s}", nameB: "${w}" },`,
`  { slugA: "shopify", slugB: "bigcommerce", nameA: "${sh}", nameB: "${b}" },`,
"];",
"",
"export function TopComparisons() {",
"  return (",
`    <section className=\"py-20 px-4 bg-white/2\">`,
`      <div className=\"max-w-6xl mx-auto\">`,
`        <div className=\"text-center mb-12\">`,
`          <h2 className=\"text-3xl md:text-4xl font-extrabold text-white mb-4\">${ah}</h2>`,
`          <p className=\"text-slate-400\">${ch}</p>`,
"        </div>",
`        <div className=\"grid sm:grid-cols-2 lg:grid-cols-3 gap-4\">`,
"          {COMPARISONS.map(({ slugA, slugB, nameA, nameB }) => (",
`            <motion.div key={\`\${slugA}-\${slugB}\`} whileHover={{ scale: 1.02 }}>`,
`              <Link href={\`/muqaranat/\${slugA}-vs-\${slugB}\`} className=\"glass glass-hover flex items-center justify-between p-5 block\">`,
`                <span className=\"font-bold text-white\">{nameA}</span>`,
`                <span className=\"badge badge-neutral text-xs font-extrabold px-3 py-1\">VS</span>`,
`                <span className=\"font-bold text-white\">{nameB}</span>`,
"              </Link>",
"            </motion.div>",
"          ))}",
"        </div>",
`        <div className=\"text-center mt-8\">`,
`          <Link href=\"/muqaranat\" className=\"text-secondary hover:underline font-semibold\">${all}</Link>`,
"        </div>",
"      </div>",
"    </section>",
"  );",
"}",
];
fs.writeFileSync("components/home/top-comparisons.tsx", lines.join("\n"), {encoding:"utf8"});
const check = fs.readFileSync("components/home/top-comparisons.tsx","utf8");
console.log("Has Arabic:", check.includes("\u0633\u0644\u0629") ? "YES" : "NO");
