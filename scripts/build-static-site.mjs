import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");

const entries = [
  "index.html",
  "admin.html",
  "catering.html",
  "styling.html",
  "cocktail.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "css",
  "js",
  "assets",
  "ads",
  "brand",
];

mkdirSync(publicDir, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  const target = path.join(publicDir, entry);

  if (!existsSync(source)) {
    continue;
  }

  rmSync(target, { force: true, recursive: true });
  cpSync(source, target, { recursive: true });
}

console.log("Static site copied into public/ for Vercel deployment.");
