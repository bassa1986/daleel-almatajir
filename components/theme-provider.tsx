'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

/**
 * دليل المتاجر is dark-only ("dark is default and only mode"). We still use
 * next-themes (rather than hardcoding) so the `<html class="dark">` /
 * `color-scheme` machinery that components and third-party libraries expect
 * is present, without exposing a toggle in the UI.
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} {...props}>
      {children}
    </NextThemesProvider>
  );
}
