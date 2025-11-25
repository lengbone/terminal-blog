# Terminal Blog

一个基于 Next.js 15 构建的终端风格博客模板。

![Terminal Blog](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ 特性

- 🖥️ **终端风格 UI** - 独特的命令行界面设计
- 🌓 **深色/浅色主题** - 一键切换，自动记忆
- ⌨️ **交互式命令** - 支持终端命令导航
- 📝 **MDX 支持** - Markdown + JSX 混合写作
- 🎨 **代码高亮** - 支持 30+ 种编程语言
- 📱 **响应式设计** - 完美适配移动端
- 🔍 **全文搜索** - 快速查找文章
- 🏷️ **标签系统** - 文章分类管理
- 🚀 **SEO 优化** - 自动生成 sitemap

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm / yarn / pnpm

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/terminal-blog.git
cd terminal-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 创建文章

在 `content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: "我的第一篇文章"
date: "2025-11-25"
description: "这是文章描述"
tags: ["blog", "tutorial"]
---

文章内容...
```

## 📁 项目结构

```text
terminal-blog/
├── content/
│   └── posts/          # 博客文章 (.mdx)
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # React 组件
│   │   ├── Layout/     # 布局组件
│   │   ├── Terminal/   # 终端组件
│   │   ├── Theme/      # 主题组件
│   │   ├── MDX/        # MDX 渲染
│   │   └── UI/         # UI 组件
│   └── lib/            # 工具函数
├── public/             # 静态资源
└── package.json
```

## ⚙️ 配置

### 站点信息

编辑 `src/lib/config.ts`：

```typescript
export const siteConfig = {
  name: "Terminal Blog",
  description: "A terminal-style blog built with Next.js",
  url: "https://yourblog.com",
  author: {
    name: "Your Name",
    role: "Full Stack Developer",
    location: "Earth",
    skills: ["TypeScript", "React", "Node.js", "Python", "Go"],
    bio: "A developer who loves building things with code.",
  },
  links: {
    github: "https://github.com/yourusername",
    twitter: "", // 留空则不显示
    email: "",   // 留空则不显示
  },
};
```

### 主题颜色

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
  --terminal-green: #22c55e;
  --terminal-purple: #a855f7;
  --terminal-cyan: #06b6d4;
  /* ... */
}
```

## 🌐 部署到 Vercel

Vercel 是部署 Next.js 应用的最佳平台，提供免费托管、自动 HTTPS、全球 CDN。

### 方式一：一键部署

点击下方按钮，直接从模板创建并部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lengbone/terminal-blog)

### 方式二：从 GitHub 导入

1. **Fork 仓库**
   - 访问 [Terminal Blog GitHub](https://github.com/lengbone/terminal-blog)
   - 点击右上角 `Fork` 按钮，将仓库复制到你的账号

2. **注册 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

3. **导入项目**
   - 点击 `Add New...` → `Project`
   - 选择你 Fork 的 `terminal-blog` 仓库
   - 点击 `Import`

4. **配置项目**
   - Framework Preset: 自动检测为 `Next.js`
   - 其他保持默认即可
   - 点击 `Deploy`

5. **等待部署**
   - 首次部署约需 1-2 分钟
   - 部署成功后会获得一个 `.vercel.app` 域名

### 绑定自定义域名

1. 进入项目 → `Settings` → `Domains`
2. 输入你的域名，点击 `Add`
3. 按提示在域名服务商添加 DNS 记录：
   - 类型：`CNAME`
   - 名称：`@` 或 `www`
   - 值：`cname.vercel-dns.com`
4. 等待 DNS 生效（通常几分钟到几小时）

### 更新博客

每次推送代码到 GitHub，Vercel 会自动重新部署：

```bash
# 添加新文章后
git add .
git commit -m "Add new post"
git push
```

## 🎮 终端命令

在博客任意页面输入命令：

| 命令 | 功能 |
|------|------|
| `help` | 显示帮助 |
| `ls` | 列出文章 |
| `cd <path>` | 页面跳转 |
| `clear` | 清空终端 |
| `theme` | 切换主题 |

## 📝 写作指南

### 支持的 Markdown 语法

- 标题 (h1-h6)
- 粗体、斜体、删除线
- 有序/无序列表
- 代码块（支持语法高亮）
- 引用块
- 表格
- 链接、图片
- 分隔线

### 代码高亮支持的语言

JavaScript, TypeScript, Python, Go, Rust, Java, C, C++, C#, PHP, Ruby, Swift, Kotlin, Scala, SQL, Bash, Shell, YAML, JSON, XML, HTML, CSS, SCSS, Markdown, Vim, Dockerfile, Nginx 等。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

[MIT License](LICENSE)

---

Made with ❤️ by Terminal Blog
