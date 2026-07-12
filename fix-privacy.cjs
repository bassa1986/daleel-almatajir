const fs = require("fs");
const t = "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629";
const d = "\u0646\u062D\u0646 \u0646\u062D\u062A\u0631\u0645 \u062E\u0635\u0648\u0635\u064A\u062A\u0643. \u0644\u0627 \u0646\u0628\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0644\u0623\u0637\u0631\u0627\u0641 \u062B\u0627\u0644\u062B\u0629.";
const lines = [
`import type { Metadata } from "next";`,
`import { SiteHeader } from "@/components/layout/site-header";`,
`import { SiteFooter } from "@/components/layout/site-footer";`,
`export const metadata: Metadata = { title: "${t} \u2014 \u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u062A\u0627\u062C\u0631" };`,
"export default function PrivacyPage() {",
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
fs.writeFileSync("app/privacy/page.tsx", lines.join("\n"), {encoding:"utf8"});
console.log("privacy done:", fs.readFileSync("app/privacy/page.tsx","utf8").includes("\u062E\u0635\u0648\u0635\u064A\u0629") ? "OK" : "FAIL");
