import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "files.catbox.moe",
      },
      {
        protocol: "https",
        hostname: "cdn.corenexis.com",
        port: "",
        pathname: "/f/**",
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "2c6fgwrx-3000.uks1.devtunnels.ms"],
    },
  },
};

export default nextConfig;