// =============================================================
// Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø± â Design tokens (JS/TS access)
//
// Mirrors the CSS custom properties defined in app/globals.css `@theme`.
// Use this where Tailwind classes can't reach â Recharts series colors,
// canvas/SVG fills, <meta theme-color>, etc. For everything else, prefer
// the Tailwind utilities (bg-primary, text-secondary, .glass, .figure...).
// =============================================================

export const colors = {
  background: '#0A0F1E',
  surface: '#0F1629',
  surfaceRaised: '#141B2E',

  primary: '#3B82F6',
  secondary: '#06B6D4',

  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',

  adminSidebar: '#0F1629',
  adminBackground: '#0B1120',
} as const;

/** Ordered palette for charts with multiple series (e.g. subscriber-source pie chart). */
export const chartPalette: readonly string[] = [
  colors.primary,
  colors.secondary,
  colors.success,
  colors.warning,
  colors.danger,
  '#A78BFA', // violet-400 â extra series color if needed
];

export const radii = {
  panel: '1.25rem',
  pill: '999px',
} as const;
