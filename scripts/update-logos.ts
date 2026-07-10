import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sallaLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect width="120" height="60" fill="#004956" rx="8"/><text x="60" y="42" font-family="Arial" font-size="30" font-weight="900" fill="white" text-anchor="middle">سلة</text></svg>';

const zidLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect width="120" height="60" fill="#1a1a2e" rx="8"/><text x="60" y="42" font-family="Arial" font-size="30" font-weight="900" fill="#C8A96E" text-anchor="middle">زد</text></svg>';

const shopifyLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#96bf48" rx="8"/><text x="50" y="65" font-family="Arial" font-size="48" font-weight="900" fill="white" text-anchor="middle">S</text></svg>';

const wooLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect width="120" height="60" fill="#96588a" rx="8"/><text x="60" y="42" font-family="Arial" font-size="22" font-weight="900" fill="white" text-anchor="middle">WooCommerce</text></svg>';

const bigLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect width="120" height="60" fill="#222" rx="8"/><text x="60" y="35" font-family="Arial" font-size="16" font-weight="900" fill="#34bbe6" text-anchor="middle">Big</text><text x="60" y="52" font-family="Arial" font-size="12" fill="white" text-anchor="middle">Commerce</text></svg>';

const magentoLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f26322" rx="8"/><polygon points="50,10 70,22 70,68 50,80 30,68 30,22" fill="none" stroke="white" stroke-width="5"/><line x1="50" y1="10" x2="50" y2="45" stroke="white" stroke-width="5"/></svg>';

function toDataUri(svg: string): string {
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

const LOGOS: Record<string, string> = {
  salla: toDataUri(sallaLogo),
  zid: toDataUri(zidLogo),
  shopify: toDataUri(shopifyLogo),
  woocommerce: toDataUri(wooLogo),
  bigcommerce: toDataUri(bigLogo),
  magento: toDataUri(magentoLogo),
};

async function main() {
  console.log("Updating logos...");
  for (const [slug, logo] of Object.entries(LOGOS)) {
    const result = await prisma.platform.update({
      where: { slug },
      data: { logo },
      select: { slug: true, logo: true },
    });
    console.log(`✓ ${slug}: ${result.logo ? result.logo.substring(0, 40) + '...' : 'FAILED'}`);
  }
  console.log("\n✅ Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());