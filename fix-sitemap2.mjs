import { writeFileSync, readFileSync } from 'fs';

const sitemap = import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://daleel-almatajir.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
  ];
}
;

writeFileSync('./app/sitemap.ts', sitemap);
console.log('Written:', readFileSync('./app/sitemap.ts', 'utf8').substring(0, 100));
