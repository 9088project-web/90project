import { cp, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'public');

const entries = [
  'index.html',
  'admin.html',
  'catering.html',
  'cocktail.html',
  'styling.html',
  'member.html',
  'referral.html',
  'rewards.html',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'css',
  'js',
  'assets',
  'ads',
  'brand'
];

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!(await exists(source))) continue;
  await cp(source, path.join(outDir, entry), { recursive: true, force: true });
}

console.log(`Static site built into ${path.relative(root, outDir) || 'public'}`);
