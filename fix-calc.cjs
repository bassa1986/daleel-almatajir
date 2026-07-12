const fs = require("fs");
const t = "\u062D\u0627\u0633\u0628\u0629 \u062A\u0643\u0627\u0644\u064A\u0641 \u0627\u0644\u0645\u0646\u0635\u0627\u062A";
const d1 = "\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u062C\u0631\u0643 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0645\u0642\u0627\u0631\u0646\u0629 \u062F\u0642\u064A\u0642\u0629 \u0628\u064A\u0646 ";
const d2 = " \u0645\u0646\u0635\u0627\u062A \u0628\u0627\u0644\u0631\u064A\u0627\u0644 \u0627\u0644\u0633\u0639\u0648\u062F\u064A";
const lines = [
`import type { Metadata } from "next";`,
`import { Suspense } from "react";`,
`import { SiteHeader } from "@/components/layout/site-header";`,
`import { SiteFooter } from "@/components/layout/site-footer";`,
`import { CalculatorApp } from "@/components/calculator/calculator-app";`,
`import { getPlatformsForCalculator } from "@/lib/data/platforms";`,
`export const metadata: Metadata = { title: "${t} \u0662\u0660\u0662\u0666", description: "${d1}6${d2}" };`,
"export const revalidate = 3600;",
"export default async function CalculatorPage() {",
"  const platforms = await getPlatformsForCalculator();",
"  return (",",
"    <>",
"      <SiteHeader />",
`      <main className="min-h-screen pt-28 pb-20 px-4">`,
`        <div className="text-center mb-10 max-w-3xl mx-auto">`,
`          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">${t}</h1>`,
`          <p className="text-slate-400 text-lg">${d1}{platforms.length}${d2}</p>`,
"        </div>",
`        <Suspense fallback={<div className="max-w-5xl mx-auto"><div className="glass h-64 mb-8 animate-pulse"/></div>}>`,
"          <CalculatorApp platforms={platforms}/>",
"        </Suspense>",
"      </main>",
"      <SiteFooter />",
"    </>",
"  );",
"}",
];
fs.writeFileSync("app/calculator/page.tsx", lines.join("\n"), {encoding:"utf8"});
console.log("calc done:", fs.readFileSync("app/calculator/page.tsx","utf8").includes("\u062D\u0627\u0633\u0628\u0629") ? "OK" : "FAIL");
