# Render 部署指南

你的 exam-platform 项目可以很轻松地部署到 Render 上！Render 对 Next.js 应用有很好的支持。

## 🚀 快速部署步骤

### 方法一：通过 GitHub 部署 (推荐)

1. **确保代码已推送到 GitHub**
   ```bash
   git add .
   git commit -m "添加 Render 部署配置"
   git push origin master
   ```

2. **在 Render 创建 Web Service**
   - 访问 [Render Dashboard](https://dashboard.render.com)
   - 点击 "New +" → "Web Service"
   - 连接你的 GitHub 仓库
   - 选择 `exam-platform` 仓库

3. **配置部署设置**
   - **Name**: `exam-platform`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run build && npm run start`
   - **Plan**: 选择 `Free` (适合测试)

4. **环境变量设置**
   在 Render 控制台的环境变量部分添加：
   ```
   NODE_VERSION = 18
   ```

5. **部署**
   - 点击 "Create Web Service"
   - Render 会自动构建和部署
   - 部署完成后会提供访问 URL

### 方法二：通过 render.yaml 配置

项目根目录已包含 `render.yaml` 配置文件，可以实现自动化部署。

1. 推送代码到 GitHub
2. 在 Render 中选择 "Blueprint" 部署
3. Render 会自动读取 `render.yaml` 配置

## 📋 Render 部署优势

- ✅ **免费额度**: 每月 750 小时运行时间
- ✅ **自动 HTTPS**: 免费的 SSL 证书
- ✅ **自动部署**: 代码推送时自动重新部署
- ✅ **日志监控**: 实时查看构建和运行日志
- ✅ **健康检查**: 内置服务健康监控

## 🌐 部署后的访问

部署成功后，你会得到类似这样的 URL：
- `https://exam-platform.onrender.com`

## 🔧 自定义域名 (可选)

1. 在 Render 控制台选择你的服务
2. 点击 "Settings" 标签
3. 找到 "Custom Domains" 部分
4. 添加你的域名并配置 DNS

## 📊 监控和日志

- **构建日志**: 查看 `Build Logs`
- **运行日志**: 查看 `Logs`
- **性能监控**: Render 提供基本的性能指标

## 🆘 常见问题

**Q: 构建失败怎么办？**
A: 检查构建日志，常见问题是依赖版本不兼容

**Q: 应用启动失败？**
A: 确保 `startCommand` 正确，并且没有运行时错误

**Q: 免费计划有什么限制？**
A: 免费计划的应用在 15 分钟不活跃后会自动休眠

## 🎉 部署完成

部署成功后，你的 exam-platform 就可以通过 Render 提供的 URL 访问了！

---

💡 **提示**: 如果需要持续在线访问，可以考虑升级到付费计划，或者使用其他云服务商的免费额度。