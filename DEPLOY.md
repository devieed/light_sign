# GitHub Pages 部署指南

## 📋 部署步骤

### 1. 创建 GitHub 仓库

在 GitHub 上创建一个新仓库（如 `light-sign`）

### 2. 推送代码到 GitHub

```bash
git init
git add .
git commit -m "Initial commit: 跑马灯提示牌项目"
git branch -M main
git remote add origin https://github.com/你的用户名/light-sign.git
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库的 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 代码推送后会自动触发部署

### 4. 配置自定义域名 botcode.cc

#### 在域名提供商处配置 DNS

有两种方式：

**方式一：使用 CNAME（推荐）**
```
类型: CNAME
名称: @（或留空）
值: 你的用户名.github.io
TTL: 默认或 3600
```

**方式二：使用 A 记录**
```
类型: A
名称: @（或留空）
值: 185.199.108.153
TTL: 默认或 3600
```

添加第二个 A 记录：
```
类型: A
名称: @（或留空）
值: 185.199.109.153
TTL: 默认或 3600
```

添加第三个 A 记录：
```
类型: A
名称: @（或留空）
值: 185.199.110.153
TTL: 默认或 3600
```

添加第四个 A 记录：
```
类型: A
名称: @（或留空）
值: 185.199.111.153
TTL: 默认或 3600
```

**添加 www 子域名（可选）**
```
类型: CNAME
名称: www
值: 你的用户名.github.io
TTL: 默认或 3600
```

#### 在 GitHub 仓库中配置

1. 进入仓库的 Settings → Pages
2. Custom domain 输入：`botcode.cc`
3. 点击 Save
4. 等待 DNS 检查通过（可能需要几分钟到几小时）
5. 勾选 "Enforce HTTPS"（DNS 检查通过后才能勾选）

### 5. 验证部署

- DNS 生效后访问 https://botcode.cc
- 首次部署大约需要 1-2 分钟
- 可以在 Actions 标签页查看部署进度

## 🔄 更新网站

只需将代码推送到 main 分支，GitHub Actions 会自动重新构建和部署：

```bash
git add .
git commit -m "更新说明"
git push
```

## ⚠️ 注意事项

1. **DNS 生效时间**：域名配置后可能需要几分钟到 48 小时才能完全生效
2. **HTTPS 证书**：GitHub Pages 会自动为自定义域名配置免费的 SSL 证书
3. **CNAME 文件**：项目中的 `public/CNAME` 文件会在构建时自动复制到输出目录，不要删除
4. **仓库可见性**：仓库可以是公开的或私有的，GitHub Pages 都能正常工作

## 🛠️ 常见问题

### 域名配置后无法访问

- 检查 DNS 是否正确配置
- 使用 `nslookup botcode.cc` 或在线 DNS 检查工具验证
- DNS 生效前，仍可通过 `https://你的用户名.github.io/仓库名` 访问

### 部署失败

- 检查 Actions 标签页的错误信息
- 确认 package.json 中的依赖版本正确
- 查看 vite.config.js 中的 base 配置

### 页面空白

- 检查浏览器控制台的错误信息
- 确认静态资源路径正确
- 清除浏览器缓存后重试

## 📞 需要帮助？

如有问题，请检查：
1. GitHub Actions 的构建日志
2. 浏览器开发者工具的控制台
3. GitHub Pages 的状态页面

