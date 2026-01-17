#!/bin/bash

# 跑马灯提示牌 - 初始化和部署脚本

echo "🎯 跑马灯提示牌 - 初始化脚本"
echo "================================"
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未检测到 Node.js"
    echo "请先安装 Node.js (https://nodejs.org/)"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"
echo ""

# 询问是否安装依赖
read -p "是否安装项目依赖？(y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 正在安装依赖..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ 依赖安装成功！"
    else
        echo "❌ 依赖安装失败，请检查错误信息"
        exit 1
    fi
fi

echo ""
echo "🎉 项目初始化完成！"
echo ""
echo "接下来你可以："
echo ""
echo "1️⃣  本地开发："
echo "   npm run dev"
echo ""
echo "2️⃣  构建生产版本："
echo "   npm run build"
echo ""
echo "3️⃣  部署到 GitHub Pages："
echo "   - 创建 GitHub 仓库"
echo "   - git init"
echo "   - git add ."
echo "   - git commit -m 'Initial commit'"
echo "   - git branch -M main"
echo "   - git remote add origin https://github.com/你的用户名/仓库名.git"
echo "   - git push -u origin main"
echo ""
echo "📖 详细部署说明请查看 DEPLOY.md"
echo "🚀 快速开始指南请查看 QUICKSTART.md"
echo ""

