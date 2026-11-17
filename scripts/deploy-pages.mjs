// Builds the static preview with a base path and force-pushes it to the `gh-pages` branch (GitHub Pages).
// Usage: npm run deploy:pages
//
// The build runs in a throw-away copy (.pages-build/) so out/ and a running `next dev` are not touched.
// The preview keeps `noindex` (NEXT_PUBLIC_SITE_LIVE is not set) and shows e-mail/Facebook instead of the form.
import { execSync, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim();
const repoName = remote.replace(/\.git$/, "").split("/").pop();
const owner = remote.match(/github\.com[:/]([^/]+)\//)?.[1] ?? "";
const basePath = `/${repoName}`;
const build = join(root, ".pages-build");
const out = join(build, "out");

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", ...opts, env: { ...process.env, ...opts.env } });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} failed`);
}

rmSync(build, { recursive: true, force: true });
mkdirSync(build);
for (const item of ["src", "public", "scripts", "package.json", "package-lock.json", "next.config.ts", "tsconfig.json"]) {
  cpSync(join(root, item), join(build, item), { recursive: true });
}
rmSync(join(build, "public", "_redirects"));

const env = { BASE_PATH: basePath, NEXT_PUBLIC_SITE_LIVE: "", NEXT_PUBLIC_FORM_ENABLED: "" };
run("npx", ["next", "build"], { cwd: build, env });
run("node", ["scripts/check-links.mjs"], { cwd: build, env });
if (!existsSync(join(out, "index.html"))) throw new Error("Static export did not produce out/index.html");

const name = execSync("git config user.name", { encoding: "utf8" }).trim();
const email = execSync("git config user.email", { encoding: "utf8" }).trim();
writeFileSync(join(out, ".nojekyll"), "");
run("git", ["-C", out, "init", "-q", "-b", "gh-pages"]);
run("git", ["-C", out, "add", "-A"]);
run("git", ["-C", out, "-c", `user.name=${name}`, "-c", `user.email=${email}`, "commit", "-q", "-m", "Deploy static preview to GitHub Pages"]);
run("git", ["-C", out, "push", "-f", remote, "HEAD:gh-pages"]);
rmSync(build, { recursive: true, force: true });
console.log(`\nDeployed: https://${owner.toLowerCase()}.github.io${basePath}/`);
