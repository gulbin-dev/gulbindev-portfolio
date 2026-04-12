import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    deviceSizes: [320, 330, 380, 420, 450, 480, 768, 1080, 1200, 1400],
    imageSizes: [250, 280, 300, 370, 700, 800, 900, 1000, 1200, 1400],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gulbindev-portfolio-preview.vercel.app",
        port: "",
        pathname: "/home-page/**",
      },
    ],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
