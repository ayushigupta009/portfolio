import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only. Next treats a request for /_next/* from a different origin than
  // the one the server was reached on as cross-origin and blocks it — so
  // opening the dev server on a LAN IP (phone testing) loads the HTML but not
  // the images, CSS or client JS. Listing the private ranges here allows it.
  allowedDevOrigins: ["192.168.1.119", "192.168.1.*", "10.0.0.*", "172.16.*.*"],

  images: {
    // Placeholder assets are SVGs served from /public. Allow the image
    // optimizer to serve them safely (they are our own, first-party assets).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
