const fs = require("fs");
const t = "\u0625\u0641\u0635\u0627\u062D \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0628\u0639\u0629";
const d = "\u0628\u0639\u0636 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639 \u0647\u064A \u0631\u0648\u0627\u0628\u0637 \u062A\u0627\u0628\u0639\u0629. \u0639\u0646\u062F \u0627\u0644\u0634\u0631\u0627\u0621 \u0639\u0628\u0631\u0647\u0627 \u0646\u062D\u0635\u0644 \u0639\u0644\u0649 \u0639\u0645\u0648\u0644\u0629 \u0635\u063A\u064A\u0631\u0629 \u062F\u0648\u0646 \u0623\u064A \u062A\u0643\u0644\u0641\u0629 \u0625\u0636\u0627\u0641\u064A\u0629 \u0639\u0644\u064A\u0643.";
const lines = [
`import type { Metadata } from "next";`,
`import { SiteHeader } from "@/components/layout/site-header";`,
`import { SiteFooter } from "@/components/layout/site-footer";`,
`export const metadata: Metadata = { title: "${t} \u2014 \u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u062A\u0627\u062C\u0631" };`,
"export default function AffiliateDisclosurePage() {",
"  return (",",
"    <>",
"      <SiteHeader />",
`      <main className="min-h-screen pt-28 pb-20 px-4">`,
`        <div className="max-w-3xl mx-auto glass p-10">`,
`          <h1 className="text-4xl font-extrabold text-white mb-6">${t}</h1>`,
`          <p className="text-slate-300 leading-relaxed">${d}</p>`,
"        </div>",
"      </main>",
"      <SiteFooter />",
"    </>",
"  );",
"}",
];
fs.writeFileSync("app/affiliate-disclosure/page.tsx", lines.join("\n"), {encoding:"utf8"});
console.log("affiliate done:", fs.readFileSync("app/affiliate-disclosure/page.tsx","utf8").includes("\u0631\u0648\u0627\u0628\u0637") ? "OK" : "FAIL");
