const fs = require("fs");
const t = "\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629";
const d = "\u0642\u0635\u0635 \u0646\u062C\u0627\u062D \u062D\u0642\u064A\u0642\u064A\u0629 \u0645\u0646 \u062A\u062C\u0627\u0631 \u064A\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0647\u0630\u0647 \u0627\u0644\u0645\u0646\u0635\u0627\u062A. \u0642\u0631\u064A\u0628\u0627\u064B.";
const lines = [
`import type { Metadata } from "next";`,
`import { SiteHeader } from "@/components/layout/site-header";`,
`import { SiteFooter } from "@/components/layout/site-footer";`,
`export const metadata: Metadata = { title: "${t} \u2014 \u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u062A\u0627\u062C\u0631" };`,
"export default function CaseStudiesPage() {",
"  return (",",
"    <>",
"      <SiteHeader />",
`      <main className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">`,
`        <div className="text-center glass p-16 max-w-lg">`,
`          <h1 className="text-4xl font-extrabold text-white mb-4">${t}</h1>`,
`          <p className="text-slate-400">${d}</p>`,
"        </div>",
"      </main>",
"      <SiteFooter />",
"    </>",
"  );",
"}",
];
fs.writeFileSync("app/case-studies/page.tsx", lines.join("\n"), {encoding:"utf8"});
console.log("case-studies done:", fs.readFileSync("app/case-studies/page.tsx","utf8").includes("\u062F\u0631\u0627\u0633\u0627\u062A") ? "OK" : "FAIL");
