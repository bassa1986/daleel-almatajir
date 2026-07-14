import type { Metadata, Viewport } from "next";
import { cairo } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "دليل المتاجر — مقارنة منصات التجارة الإلكترونية",
    template: "%s | دليل المتاجر",
  },
  description: "المرجع الأول عربياً لمقارنة سلة، زد، شوبيفاي، ووكومرس، BigCommerce وماجنتو.",
};

export const viewport: Viewport = { themeColor: "#0A0F1E" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head><meta charSet="utf-8" /></head>
      <body className="min-h-screen bg-background font-sans text-slate-200 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}