import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder assets are SVGs served from /public. Allow the image
    // optimizer to serve them safely (they are our own, first-party assets).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
