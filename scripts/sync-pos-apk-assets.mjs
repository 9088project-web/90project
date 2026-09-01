import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const assetsDir = path.join(root, 'android-pos', 'app', 'src', 'main', 'assets');

const files = [
  'pos.html',
  path.join('css', 'pos.css'),
  path.join('js', 'pos.js'),
  path.join('assets', 'images', 'logo', 'logo-icon-dark.jpg')
];

await mkdir(assetsDir, { recursive: true });

for (const file of files) {
  const source = path.join(root, file);
  const destination = path.join(assetsDir, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { force: true });
}

console.log('POS APK assets synced.');
