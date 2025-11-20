import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 云部署优化配置
  output: 'export', // 静态导出
  distDir: 'out', // 明确指定输出目录
  // 修复静态服务器路由问题
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
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
