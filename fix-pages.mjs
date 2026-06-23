import { writeFileSync } from 'fs';

const files = [
  './app/أدلة/page.tsx',
  './app/أدلة/[slug]/page.tsx',
  './app/مقارنات/page.tsx',
  './app/مقارنات/[slug]/page.tsx',
];

const placeholder = export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return <div>Loading...</div>;
}
;

for (const file of files) {
  try {
    writeFileSync(file, placeholder);
    console.log('✓', file);
  } catch (e) {
    console.log('✗', file, e.message);
  }
}
