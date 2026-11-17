// Checks every internal href/src in out/**/*.html resolves to a file, and lists external links.
// Run after a build: node scripts/check-links.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = "out";
const pages = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) pages.push(p);
  }
};
walk(OUT);

const broken = [];
const external = new Set();
let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const refs = new Set();
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/srcSet="([^"]+)"/gi)) for (const part of m[1].split(",")) refs.add(part.trim().split(/\s+/)[0]);
  for (const raw of refs) {
    const ref = raw.replace(/&amp;/g, "&");
    if (/^(mailto:|tel:|data:|#)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) {
      external.add(ref);
      continue;
    }
    if (!ref.startsWith("/")) continue;
    const base = process.env.BASE_PATH ?? "";
    const clean = decodeURIComponent(ref.split("#")[0].split("?")[0]).replace(base && new RegExp(`^${base}(?=/)`), "");
    const target = path.join(OUT, clean);
    checked++;
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(path.join(target, "index.html")));
    if (!ok) broken.push(`${page}: ${ref}`);
  }
}
console.log(`${pages.length} pages, ${checked} internal references, ${broken.length} broken`);
broken.slice(0, 40).forEach((b) => console.log("  BROKEN", b));
console.log("external:");
[...external].sort().forEach((e) => console.log("  ", e));
process.exit(broken.length ? 1 : 0);
