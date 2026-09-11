import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const assetsDir = path.join(root, 'android-pos', 'app', 'src', 'main', 'assets');

const files = [
  'pos.html',
  'orders.html',
  'orders.webmanifest',
  path.join('css', 'pos.css'),
  path.join('css', 'order-center.css'),
  path.join('js', 'pos.js'),
  path.join('js', 'order-center.js'),
  path.join('js', 'growth-domain.mjs'),
  path.join('js', 'growth-cloud.mjs'),
  path.join('js', 'supabase-config.json'),
  path.join('assets', 'images', 'logo', 'logo-icon-dark.jpg')
];

await mkdir(assetsDir, { recursive: true });

for (const file of files) {
  const source = path.join(root, file);
  const destination = path.join(assetsDir, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { force: true });
}

console.log('Order center APK assets synced.');
