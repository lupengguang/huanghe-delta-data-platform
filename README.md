# huanghe-delta-data-platform

黄河三角洲资源环境科学数据平台

## 项目介绍

基于React 18 + Tailwind CSS + Vite开发的生态数据可视化前端系统，包含数据目录、生态指标展示、地图可视化等模块，适配多端响应式布局。

## 环境要求

- Node.js 版本：>= 18.x（推荐20.x LTS长期支持版，兼容性最好）
- 包管理器：npm（推荐，和项目锁文件完全匹配）/ yarn / pnpm
- 操作系统：Windows / Mac / Linux 均可

## 本地启动开发环境

### 1. 安装依赖

打开终端（CMD/PowerShell/终端），进入项目根目录，执行：

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:5173/ 启动。

### 3. 构建生产版本

```bash
npm run build
```

### 4. 部署到GitHub Pages

```bash
npm run deploy
```

## 项目特点

- 纯前端实现，无后端依赖
- 使用mockData.js本地模拟数据
- 蓝色科技风格UI设计
- 响应式布局，支持多端访问
