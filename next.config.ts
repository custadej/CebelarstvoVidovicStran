import type { NextConfig } from "next";

// BASE_PATH serves the export from a sub-path, e.g. /CebelarstvoVidovic on GitHub Pages (scripts/deploy-pages.mjs).
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  allowedDevOrigins: ['192.168.1.7'],
  images: { unoptimized: true },
  // Each language has its own root layout, so the 404 page is global (src/app/global-not-found.tsx).
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
