import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  // 简化配置，避免冲突
  poweredByHeader: false,
};

export default nextConfig;
