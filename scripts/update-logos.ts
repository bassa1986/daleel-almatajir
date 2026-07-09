import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Real SVG logos encoded as data URIs - no external requests needed
const LOGOS: Record<string, string> = {
  salla: `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><rect width="200" height="60" fill="#004956" rx="8"/><text x="100" y="42" font-family="Arial,sans-serif" font-size="32" font-weight="900" fill="white" text-anchor="middle">سلة</text></svg>`).toString('base64')}`,
  
  zid: `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><rect width="200" height="60" fill="#1a1a2e" rx="8"/><text x="100" y="42" font-family="Arial,sans-serif" font-size="32" font-weight="900" fill="#C8A96E" text-anchor="middle">زد</text></svg>`).toString('base64')}`,
  
  shopify: `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110"><path fill="#96bf48" d="M95.5 26.6c-.1-.7-.7-1.1-1.2-1.1s-10.5-.7-10.5-.7-7-6.9-7.7-7.6c-.7-.7-2.1-.5-2.6-.3 0 0-1.3.4-3.4 1.1-.4-1.1-.9-2.4-1.7-3.8-2.4-4.7-5.9-7.1-10.2-7.1-.3 0-.6 0-.9.1-.1-.2-.3-.3-.4-.5-2-2.1-4.5-3.1-7.5-3-5.9.1-11.7 4.4-16.5 12-3.3 5.3-5.9 11.9-6.6 17.1L16.8 35c-2.3.7-2.4.8-2.7 3-.2 1.7-6.6 51-6.6 51l52.5 9.2 28.4-6.1S95.6 27.4 95.5 26.6zM68.3 19.3c-1.6.5-3.5 1.1-5.4 1.7-.1-2.7-.4-6.5-1.8-9.7 4.4.8 6.6 5.8 7.2 8zm-9.2 2.9c-3.7 1.1-7.7 2.4-11.7 3.6.7-4.4 2.8-8.7 5.3-11.6 1.1-1.2 2.7-2.5 4.5-3.2 1.7 3.3 2 7.9 1.9 11.2zM49.7 8.1c1.5 0 2.7.3 3.8.9-1.7.9-3.3 2.2-4.8 3.9-3.9 4.2-6.8 10.8-7.5 17.1l-9.9 3.1C33.3 23.8 40.7 8.3 49.7 8.1z"/><path fill="#96bf48" d="M94.3 25.5c-.5 0-10.5-.7-10.5-.7s-7-6.9-7.7-7.6c-.3-.3-.6-.4-.9-.4V97l28.4-6.1S95.6 27.4 95.5 26.6c-.1-.7-.7-1.1-1.2-1.1z"/><path fill="#fff" d="M58.5 35.7l-3.5 10.5s-3.1-1.6-6.8-1.4c-5.4.3-5.5 3.8-5.4 4.7.5 7.7 20.7 9.4 21.9 25.4.9 13.1-7 22.1-18.2 22.8-13.4.8-20.7-7-20.7-7l2.8-12s7.4 5.6 13.3 5.2c3.9-.2 5.3-3.4 5.1-5.6-.7-10-17.1-9.4-18.2-23.9C27.9 41.9 36 28.2 54.7 27c7.7-.4 11.9 1.6 11.9 1.6l-8.1 7.1z"/></svg>`).toString('base64')}`,

  woocommerce: `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80"><rect width="300" height="80" fill="#96588a" rx="10"/><text x="30" y="52" font-family="Arial,sans-serif" font-size="36" font-weight="900" fill="white">Woo</text><text x="142" y="52" font-family="Arial,sans-serif" font-size="36" font-weight="400" fill="#c59ed6">Commerce</text></svg>`).toString('base64')}`,

  bigcommerce: `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80"><rect width="300" height="80" fill="#121113" rx="10"/><text x="20" y="52" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="white">Big</text><text x="82" y="52" font-family="Arial,sans-serif" font-size="28" font-weight="400" fill="#34bbe6">Commerce</text></svg>`).toString('base64')}`,

  magento: `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80"><rect width="200" height="80" fill="#f26322" rx="10"/><polygon points="100,15 120,25 120,55 100,65 80,55 80,25" fill="none" stroke="white" stroke-width="4"/><line x1="100" y1="15" x2="100" y2="40" stroke="white" stroke-width="4"/><text x="100" y="75" font-family="Arial,sans-serif" font-size="0" fill="white" text-anchor="middle">M</text></svg>`).toString('base64')}`,
};

async function main() {
  console.log("\n=== Updating platform logos ===\n");

  for (const [slug, logo] of Object.entries(LOGOS)) {
    await prisma.platform.update({
      where: { slug },
      data: { logo },
    });
    console.log(`✓ Updated logo: ${slug}`);
  }

  console.log("\n✅ All logos updated!\n");
}

main()
  .catch(err => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());