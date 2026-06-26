import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://daleel-almatajir.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
  ];
}
