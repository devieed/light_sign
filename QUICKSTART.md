# 🚀 快速开始

## 项目结构

```
light_sign/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── public/
│   └── CNAME                   # 自定义域名配置文件
├── src/
│   ├── components/
│   │   └── MarqueeText.vue    # 跑马灯文字组件
│   ├── App.vue                 # 主应用组件
│   ├── main.js                 # 入口文件
│   └── style.css               # 全局样式
├── index.html                  # HTML 模板
├── package.json                # 项目依赖配置
├── vite.config.js              # Vite 构建配置
├── README.md                   # 项目说明
├── DEPLOY.md                   # 部署指南
└── .gitignore                  # Git 忽略文件
```

## 本地运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

开发服务器会在 http://localhost:5173 启动

### 3. 构建生产版本（可选）

```bash
npm run build
```

构建产物会输出到 `dist` 目录

### 4. 预览生产构建（可选）

```bash
npm run preview
```

## 部署到 GitHub Pages

### 快速部署

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit: 跑马灯提示牌"

# 4. 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git

# 5. 推送到 main 分支
git branch -M main
git push -u origin main
```

### 启用 GitHub Pages

1. 打开 GitHub 仓库页面
2. 点击 Settings（设置）
3. 左侧菜单点击 Pages
4. Source 选择 "GitHub Actions"
5. 等待自动部署完成（约 1-2 分钟）

### 配置自定义域名 botcode.cc

详细步骤请查看 [DEPLOY.md](./DEPLOY.md)

## 功能说明

### 配置选项

- **显示文字**：输入想要显示的跑马灯文字（最多 200 字符）
- **文字颜色**：通过颜色选择器或输入十六进制颜色值
- **背景颜色**：设置跑马灯的背景颜色
- **文字大小**：20-300px 可调节
- **滚动速度**：5-60 秒（数值越小，速度越快）
- **滚动方向**：从右到左或从左到右
- **粗体开关**：切换文字粗细

### 特色功能

✅ **自动保存配置**：所有设置自动保存到浏览器本地存储，刷新不丢失  
✅ **移动端适配**：完美支持手机横屏显示  
✅ **响应式设计**：自适应不同屏幕尺寸  
✅ **流畅动画**：使用 CSS3 动画，性能优秀  
✅ **简单易用**：界面直观，操作简单

## 使用建议

### 电脑端
- 全屏使用效果最佳（按 F11 进入全屏）
- 适合在会议、活动、展示等场景使用

### 移动端
- **横屏使用**以获得最佳体验
- 可以在活动现场举着手机展示
- 支持 iOS 和 Android

### 应用场景

- 📢 活动现场提示牌
- 🎉 庆祝标语展示
- 💼 会议欢迎标语
- 🏪 商店促销信息
- 📱 手持提示牌
- 🎯 任何需要滚动文字的场合

## 技术特点

- ⚡ **Vite**：极速的开发服务器和构建工具
- 🎨 **Vue 3**：渐进式 JavaScript 框架
- 📦 **轻量级**：无需安装额外依赖库
- 🚀 **自动部署**：推送代码即自动部署
- 🔒 **HTTPS**：GitHub Pages 自动配置 SSL 证书

## 浏览器支持

- ✅ Chrome（推荐）
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动端浏览器

建议使用最新版本的现代浏览器以获得最佳体验。

## 常见问题

### 如何进入全屏？
- Windows/Linux：按 F11
- Mac：Cmd + Ctrl + F

### 如何退出全屏？
- 按 Esc 键或再次按 F11

### 移动端如何横屏？
- 关闭屏幕旋转锁定
- 将手机横向放置

### 配置会丢失吗？
- 不会，所有配置自动保存到浏览器本地存储
- 清除浏览器数据会导致配置丢失

## 更新日志

### v1.0.0 (2026-01-17)
- ✨ 初始版本发布
- 🎨 支持自定义文字、颜色、大小
- ⚡ 支持滚动速度和方向调节
- 📱 完美适配移动端横屏
- 💾 配置自动保存功能
- 🚀 GitHub Actions 自动部署

## 许可证

MIT License - 自由使用、修改和分发

---

**享受使用跑马灯提示牌吧！** 🎉

