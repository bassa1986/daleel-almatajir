import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.platform.count();
  console.log(`✓ Connected! Found ${count} platforms in database.`);
}
main()
  .catch(err => { console.error("DB Error:", err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
