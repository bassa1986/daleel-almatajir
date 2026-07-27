const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
p.article.count()
  .then(c => console.log("SUCCESS, count:", c))
  .catch(e => console.log("FAILED:", e.message))
  .finally(() => p.$disconnect());
