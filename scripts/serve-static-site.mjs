import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || process.argv[2] || 3050);
const require = createRequire(import.meta.url);

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

function apiFilePath(urlPath) {
  const apiRoot = path.resolve(root, 'api');
  const cleanName = decodeURIComponent(urlPath.split('?')[0])
    .replace(/^\/api\/+/, '')
    .replace(/\.js$/i, '')
    .replace(/[^a-z0-9_-]/gi, '');
  if (!cleanName) return null;
  const resolved = path.resolve(apiRoot, `${cleanName}.js`);
  return resolved.startsWith(apiRoot) ? resolved : null;
}

function attachJsonResponse(response) {
  response.status = statusCode => ({
    json(payload) {
      response.statusCode = statusCode;
      if (!response.hasHeader('Content-Type')) {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      response.end(JSON.stringify(payload));
    }
  });
  return response;
}

const server = createServer(async (request, response) => {
  const requestPath = request.url || '/';
  if (requestPath.split('?')[0].startsWith('/api/')) {
    const filePath = apiFilePath(requestPath);
    if (!filePath || !existsSync(filePath)) {
      response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify({ ok: false, message: 'API route not found.' }));
      return;
    }

    try {
      delete require.cache[require.resolve(filePath)];
      const handler = require(filePath);
      await handler(request, attachJsonResponse(response));
    } catch (error) {
      if (!response.headersSent) {
        response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      }
      response.end(JSON.stringify({
        ok: false,
        message: error instanceof Error ? error.message : 'Local API route failed.'
      }));
    }
    return;
  }

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
