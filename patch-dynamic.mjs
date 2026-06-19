import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      let content = readFileSync(full, 'utf8');
      if (!content.includes("force-dynamic")) {
        content = "export const dynamic = 'force-dynamic';\n" + content;
        writeFileSync(full, content);
        console.log('Patched:', full);
      }
    }
  }
}

walk('./app');
console.log('Done.');
