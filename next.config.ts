import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    deviceSizes: [320, 330, 380, 420, 450, 480, 768, 1080, 1200, 1400],
    imageSizes: [100, 250, 280, 300, 370, 700, 800, 900, 1000, 1200, 1400],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gulbindev-portfolio-preview.vercel.app",
        port: "",
        pathname: "/frame-image/**",
      },
      {
        protocol: "https",
        hostname: "portfolio-gulbindev.vercel.app",
        port: "",
        pathname: "/frame-image/**",
      },
    ],
    minimumCacheTTL: 2678400,
  },
  deploymentId:
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 32) || `local-${Date.now()}`,
};

export default nextConfig;
