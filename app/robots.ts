import type { MetadataRoute } from 'next';

const BASE_URL = 'https://daleel-almatajir.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/مقارنات/', '/حاسبة-التكاليف/', '/أدلة/'],
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
