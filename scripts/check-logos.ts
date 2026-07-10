import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const platforms = await prisma.platform.findMany({ select: { slug: true, logo: true } });
  for (const p of platforms) {
    console.log(`${p.slug}: ${p.logo ? p.logo.substring(0, 60) + '...' : 'EMPTY'}`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());