const fs = require("fs");
const q = String.fromCharCode(39);
const files = [
  "components/home/hero-section.tsx",
  "components/home/platform-grid.tsx", 
  "components/home/calculator-teaser.tsx",
  "components/comparisons/mini-calculator-embedded.tsx",
  "components/comparisons/vs-hero.tsx",
  "app/admin-login/page.tsx",
  "app/admin-setup/page.tsx",
];
files.forEach(f => {
  try {
    let c = fs.readFileSync(f, "utf8");
    if (c.startsWith("use client")) {
      c = c.replace("use client", q + "use client" + q);
      fs.writeFileSync(f, c, "utf8");
      console.log("Fixed:", f);
    } else {
      console.log("OK:", f, "->", c.split("\n")[0].substring(0,20));
    }
  } catch(e) { console.log("SKIP:", f); }
});