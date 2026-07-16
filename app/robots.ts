import type { MetadataRoute } from 'next';

const BASE_URL = 'https://daleel-almatajir.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/muqaranat/', '/calculator/', '/adilla/'],
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
