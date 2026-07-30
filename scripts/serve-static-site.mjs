import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || process.argv[2] || 3050);

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.gif', 'image/gif'],
  ['.mp4', 'video/mp4'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8']
]);

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]).replace(/^\/+/, '');
  const fileName = cleanPath || 'index.html';
  const withHtml = path.extname(fileName) ? fileName : `${fileName}.html`;
  const resolved = path.resolve(root, withHtml);
  return resolved.startsWith(root) ? resolved : path.join(root, 'index.html');
}

const server = createServer(async (request, response) => {
  const filePath = safePath(request.url || '/');
  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('Not a file');
    const type = contentTypes.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`90 PROJECT local preview: http://127.0.0.1:${port}/`);
});
