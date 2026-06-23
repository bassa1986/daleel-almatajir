import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const toFix = [
  './app/أدلة/page.tsx',
  './app/أدلة/[slug]/page.tsx',
  './app/مقارنات/page.tsx',
  './app/مقارنات/[slug]/page.tsx',
  './app/درسات-الحالة/page.tsx'
];

for (const file of toFix) {
  try {
    let content = readFileSync(file, 'utf8');
    if (!content.includes('revalidate')) {
      content = "export const dynamic = 'force-dynamic';\nexport const revalidate = 0;\n" + content;
      writeFileSync(file, content);
      console.log('Fixed:', file);
    }
  } catch (e) {
    console.log('Skip:', file, e.message);
  }
}
