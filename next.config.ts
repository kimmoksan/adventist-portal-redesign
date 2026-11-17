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
  images: {
    // Static export has no image optimizer; Unsplash already serves sized, compressed images.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
