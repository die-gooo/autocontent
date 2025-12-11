import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Ensure Turbopack uses system TLS certificates so font fetches
    // (e.g., Google Fonts in layout.tsx) succeed during build.
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
