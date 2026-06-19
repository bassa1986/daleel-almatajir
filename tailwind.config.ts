import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS 4 is configured primarily in CSS via `@theme` in
 * app/globals.css — this file is NOT required for the build. It's kept
 * minimal, purely so editor tooling (Tailwind IntelliSense, etc.) can
 * resolve content paths for class-name autocomplete.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
};

export default config;
