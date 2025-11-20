import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 优化云部署配置
  output: 'standalone',
  // 允许外部图片
  images: {
    domains: [],
    unoptimized: true
  },
  // 启用压缩
  compress: true,
  // 生产环境优化
  poweredByHeader: false,
  // 静态文件服务优化
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
