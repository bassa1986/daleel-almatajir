const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const platforms = await prisma.platform.findMany({
    orderBy: { nameAr: 'asc' },
    include: {
      pros: { orderBy: { sortOrder: 'asc' } },
      cons: { orderBy: { sortOrder: 'asc' } },
    },
  });

  let md = '# Daleel Al-Matajir — Editorial review\n\n';
  md += 'Please review each section below for tone and factual accuracy. Mark corrections inline or in comments.\n\n---\n\n';

  for (const p of platforms) {
    md += `## ${p.nameAr} (${p.nameEn})\n\n`;
    md += `**Description:**\n${p.descriptionAr || '(none)'}\n\n`;
    md += `**Quick verdict:**\n${p.quickVerdictAr || '(none)'}\n\n`;
    md += `**Commission info:**\n${p.commissionInfo || '(none)'}\n\n`;
    md += `**Pros:**\n`;
    p.pros.forEach((pro, i) => { md += `${i + 1}. ${pro.textAr}\n`; });
    md += `\n**Cons:**\n`;
    p.cons.forEach((con, i) => { md += `${i + 1}. ${con.textAr}\n`; });
    md += `\n---\n\n`;
  }

  fs.writeFileSync('editorial-review.md', md, 'utf8');
  console.log('✓ Written editorial-review.md');
  console.log(`  ${platforms.length} platforms exported`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
