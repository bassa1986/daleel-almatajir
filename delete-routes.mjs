import { rmSync, readdirSync } from 'fs';
import { join } from 'path';

const appDir = './app';
const keep = ['admin', 'api', 'globals.css', 'layout.tsx', 'not-found.tsx', 'page.tsx', 'robots.ts', 'sitemap.ts'];

for (const entry of readdirSync(appDir)) {
  if (!keep.includes(entry)) {
    const full = join(appDir, entry);
    rmSync(full, { recursive: true, force: true });
    console.log('Deleted:', entry);
  }
}
console.log('Done.');
