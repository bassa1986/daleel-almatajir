import type { MetadataRoute } from 'next';

const BASE_URL = 'https://daleel-almatajir.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: ['/muqaranat/', '/calculator/', '/adilla/'],
      allow: ['/ÙÙØ§Ø±ÙØ§Øª/', '/Ø­Ø§Ø³Ø¨Ø©-Ø§ÙØªÙØ§ÙÙÙ/', '/Ø£Ø¯ÙØ©/'],
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
