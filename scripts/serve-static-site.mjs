import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 3040);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://127.0.0.1:${port}`).pathname);
  const normalized = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(root, normalized));
  if (!filePath.startsWith(root)) return path.join(root, "index.html");
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    return path.join(filePath, "index.html");
  }
  return filePath;
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || "/");
  const finalPath = existsSync(filePath) ? filePath : path.join(root, "index.html");
  const type = contentTypes[path.extname(finalPath).toLowerCase()] || "application/octet-stream";

  response.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  createReadStream(finalPath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`90 PROJECT local preview: http://127.0.0.1:${port}`);
});
