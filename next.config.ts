import type { NextConfig } from "next";

/**
 * GitHub Pages serves the site from /<repo>/, so the static export needs a basePath there.
 * Locally (`npm run dev`) and on other hosts the site lives at the root.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "adventist-portal-redesign";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPages ? `/${repo}` : undefined,
  // next/image does not prefix basePath onto plain string sources, so photos read it from here.
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "" },
  images: {
    // Static export has no image optimizer; photos in /public/photos are already resized and compressed.
    unoptimized: true,
  },
};

export default nextConfig;
