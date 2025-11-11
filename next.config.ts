import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "www.notion.so" },
      { hostname: "s3.us-west-2.amazonaws.com" },
      { hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
    ],
  },
};

export default nextConfig;
