import type { Metadata, Viewport } from 'next';
import { cairo } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± â ÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ©',
    template: '%s | Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±',
  },
  description: 'Ø§ÙÙØ±Ø¬Ø¹ Ø§ÙØ£ÙÙ Ø¹Ø±Ø¨ÙØ§Ù ÙÙÙØ§Ø±ÙØ© Ø³ÙØ©Ø Ø²Ø¯Ø Ø´ÙØ¨ÙÙØ§ÙØ ÙÙÙÙÙØ±Ø³Ø BigCommerce ÙÙØ§Ø¬ÙØªÙ.',
};

export const viewport: Viewport = {
  themeColor: '#0A0F1E',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±',
  alternateName: 'Daleel Al-Matajir',
  url: 'https://daleel-almatajir.com',
  description: 'Ø§ÙÙØ±Ø¬Ø¹ Ø§ÙØ£ÙÙ Ø¹Ø±Ø¨ÙØ§Ù ÙÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© ÙÙ Ø§ÙØ³Ø¹ÙØ¯ÙØ© ÙØ§ÙØ®ÙÙØ¬.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-screen bg-background font-sans text-slate-200 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}