import { writeFileSync } from 'fs';

const content = [
  "import type { MetadataRoute } from 'next';",
  "",
  "export const dynamic = 'force-dynamic';",
  "",
  "export default function sitemap(): MetadataRoute.Sitemap {",
  "  return [",
  "    { url: 'https://daleel-almatajir.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },",
  "  ];",
  "}",
  ""
].join('\n');

writeFileSync('./app/sitemap.ts', content, 'utf8');
console.log('Written successfully');
