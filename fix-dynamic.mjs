import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'admin') {
      walk(full);
    } else if (entry.name === 'page.tsx') {
      const content = readFileSync(full, 'utf8');
      if (!content.includes('force-dynamic')) {
        writeFileSync(full, "export const dynamic = 'force-dynamic'\n" + content);
        console.log('Updated:', full);
      }
    }
  }
}

walk('./app');
console.log('Done.');
