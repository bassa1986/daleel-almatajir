const fs = require("fs");
const f = "components/home/top-comparisons.tsx";
let c = fs.readFileSync(f, "utf8");
const quote = String.fromCharCode(39);
c = c.replace("use client", quote + "use client" + quote);
fs.writeFileSync(f, c, "utf8");
console.log("Line1:", c.split("\n")[0]);