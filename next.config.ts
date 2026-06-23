import type { NextConfig } from 'next';

const config: NextConfig = {
  // Prisma Client should not be bundled into the serverless function bundle —
  // this is the stable (non-experimental) key as of Next.js 15.
  serverExternalPackages: ['@prisma/client', 'prisma'],

  images: {
    // Allow external featured-image domains used by the CMS
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: 'daleel-almatajir.com' },
    ],
  },
};

export default config;
