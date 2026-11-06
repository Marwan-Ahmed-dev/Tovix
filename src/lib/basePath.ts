/**
 * Client-side base path for static assets. Must match `basePath` in `next.config.ts`.
 * Set `NEXT_PUBLIC_BASE_PATH=/Tovix` when building for GitHub Pages (see CI workflow).
 */
export const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
