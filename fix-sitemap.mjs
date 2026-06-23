import { writeFileSync } from 'fs';

const sitemap = import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://daleel-almatajir.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://daleel-almatajir.com/admin', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
;

writeFileSync('./app/sitemap.ts', sitemap);
console.log('Done.');
