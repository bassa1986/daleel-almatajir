import type { Metadata, Viewport } from 'next';
import { cairo } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

// NOTE: this is the layout for the public (RTL, Arabic) site. The admin CMS
// (Section 7) gets its own nested layout at app/admin/layout.tsx that
// overrides `dir` to "ltr" with a dark sidebar — see SECTION 7.

export const metadata: Metadata = {
  title: {
    default: 'دليل المتاجر — مقارنة منصات التجارة الإلكترونية',
    template: '%s | دليل المتاجر',
  },
  description: 'المرجع الأول عربياً لمقارنة سلة، زد، شوبيفاي، ووكومرس، BigCommerce وماجنتو.',
};

export const viewport: Viewport = {
  themeColor: '#0A0F1E',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'دليل المتاجر',
  alternateName: 'Daleel Al-Matajir',
  url: 'https://daleel-almatajir.com',
  description: 'المرجع الأول عربياً لمقارنة منصات التجارة الإلكترونية في السعودية والخليج.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
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
