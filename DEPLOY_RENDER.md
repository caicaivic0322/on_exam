# Render 部署指南

## 静态导出模式

该项目使用 Next.js 静态导出模式部署到 Render 平台。

### 部署配置

#### Render.yaml
```yaml
services:
  - type: static
    name: exam-platform
    buildCommand: npm ci && npm run build
    staticPublishPath: ./out
    envs:
      - key: NODE_VERSION
        value: "18"
      - key: NEXT_PRIVATE_TARGET
        value: "export"
```

#### Next.js 配置
```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true
  },
  experimental: {
    reactCompiler: true
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  distDir: 'out',
  assetPrefix: '',
  basePath: '',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
}

module.exports = nextConfig
```

### 部署步骤

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "提交信息"
   git push origin master
   ```

2. **在 Render 上创建静态站点**
   - 访问 [Render Dashboard](https://dashboard.render.com/)
   - 点击 "New +" → "Static Site"
   - 连接你的 GitHub 仓库
   - 设置以下配置：
     - **Build Command**: `npm ci && npm run build`
     - **Publish Directory**: `./out`
     - **Environment**: Node
     - **Node Version**: `18`

3. **环境变量设置**
   - `NODE_VERSION`: `18`
   - `NEXT_PRIVATE_TARGET`: `export`

### 修复的问题

以下是在部署过程中遇到并解决的问题：

1. **动态路由缺少 `generateStaticParams()`**
   - 错误: `Page "/quiz/[chapterId]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.`
   - 解决: 为动态路由页面添加 `generateStaticParams()` 函数

2. **客户端组件与静态导出的冲突**
   - 错误: 客户端组件无法导出服务器端函数
   - 解决: 将 `/quiz/[chapterId]/page.tsx` 从客户端组件转换为服务器组件

3. **TypeScript 类型错误**
   - 错误: `'quiz' is possibly 'null'.`
   - 解决: 修改 `generateQuiz` 函数确保总是返回有效对象

4. **静态导出时的运行时错误**
   - 错误: `Cannot read properties of undefined (reading 'id')`
   - 解决: 在 QuizRunner 组件中添加安全检查

### 预期结果

部署成功后，你将得到：

- ✅ **主页**: `https://your-app-name.onrender.com/`
- ✅ **测验页面**: `https://your-app-name.onrender.com/quiz/1`, `/quiz/2`, ..., `/quiz/15`
- ✅ **404 页面**: `https://your-app-name.onrender.com/404`
- ✅ **客户端路由**: 使用 Next.js 静态导出特性支持客户端导航

### 注意事项

- 所有测验页面在构建时预生成，提供最佳性能
- 图片使用 `unoptimized: true` 配置以支持静态导出
- 使用 `trailingSlash: true` 确保静态文件正确链接
- 客户端路由正常工作，无需额外的服务器端支持

### 测试部署

构建完成后，你应该看到类似输出：

```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ● /quiz/[chapterId]
  ├ /quiz/1
  ├ /quiz/2
  ├ /quiz/3
  └ [+12 more paths]

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

这表明所有页面都已成功预生成并可以静态部署。