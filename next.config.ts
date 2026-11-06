import type { NextConfig } from "next";

/** GitHub Pages project site: https://marwan-ahmed-dev.github.io/Tovix/ */
const basePath = "/Tovix";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  // PPR/cache-components are incompatible with `output: "export"` (static HTML copy step).
  cacheComponents: false,
  partialPrefetching: false,
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
