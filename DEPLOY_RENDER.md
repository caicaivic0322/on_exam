# Render 部署指南

## 部署配置

### 更新后的部署设置

本项目已配置为静态导出模式，适用于 Render 静态站点托管。

**构建命令:**
```bash
npm ci && npm run build
```

**部署设置:**
- **类型**: 静态网站 (Static)
- **发布目录**: `./out`
- **Node 版本**: 18

### 配置文件说明

#### render.yaml
```yaml
services:
  - type: static
    name: exam-platform
    buildCommand: npm ci && npm run build
    staticPublishPath: ./out
    envVars:
      - key: NODE_VERSION
        value: "18"
      - key: NEXT_PRIVATE_TARGET
        value: "export"
```

#### next.config.ts
```typescript
const nextConfig: NextConfig = {
  output: 'export', // 静态导出
  trailingSlash: true, // 添加尾斜杠
  skipTrailingSlashRedirect: true,
  images: {
    domains: [],
    unoptimized: true
  },
  compress: true,
  poweredByHeader: false,
  staticPageGenerationTimeout: 1000,
};
```

## 部署步骤

1. **推送到 Git 仓库**
   ```bash
   git add .
   git commit -m "更新 Render 部署配置为静态导出"
   git push
   ```

2. **在 Render 中创建新服务**
   - 连接你的 Git 仓库
   - 选择 "Static Site" 类型
   - 设置构建命令: `npm ci && npm run build`
   - 设置发布目录: `./out`

3. **配置环境变量**
   - `NODE_VERSION`: `18`
   - `NEXT_PRIVATE_TARGET`: `export`

## 注意事项

- ✅ **已修复**: 移除 `output: 'standalone'`，改为 `output: 'export'`
- ✅ **已修复**: 将 Render 类型从 `web` 改为 `static`
- ✅ **已修复**: 设置正确的发布目录 `staticPublishPath: ./out`
- ✅ **已优化**: 添加 `trailingSlash` 和相关静态站点优化
- ✅ **已移除**: 不再需要 `PORT` 环境变量和 `startCommand`

## 预期结果

部署成功后，你的应用将以静态网站形式托管，支持:
- 主页路由: `/`
- 测验路由: `/quiz/1/`
- 自动处理客户端路由

**重要**: 由于是静态导出，客户端路由将依赖 Next.js 的回退机制。