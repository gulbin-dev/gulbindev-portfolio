import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gulbindev-portfolio-preview.vercel.app",
        port: "",
        pathname: "/home-page/**",
      },
    ],
  },
};

export default nextConfig;
