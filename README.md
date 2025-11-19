# 🎬 短视频管理系统（Short Video Management System）

> 字节工程训练营项目 / 基于 React + Node.js + TypeScript 的短视频创作全流程管理平台  
> 包含：推荐模块、上传模块、管理模块、可视化模块等

---

## 📌 项目简介

短视频管理系统是一个支持短视频 **创作前、创作中、创作后** 全流程的管理平台。  
用户（即创作者）可以进行：

- 🌟 **创作前**：查看短视频推荐、热门趋势、灵感来源  
- 📤 **创作中**：上传视频、填写标题主题、预览、发布  
- 🗂 **创作后**：管理已发布视频，支持筛选、排序、编辑  
- 📊 **加分项**：瀑布流展示、数据可视化看板、AIGC 生成视频

系统基于前后端分离架构开发，前端使用 React + TypeScript，后端使用 Node.js + Express，数据使用 MySQL 存储。

---

## 🚀 技术栈

### **前端（Frontend）**
- React + TypeScript
- React Router
- Axios
- Ant Design（UI 框架）
- Zustand / Redux（状态管理，可选）
- ECharts（数据可视化，可选）

### **后端（Backend）**
- Node.js + Express
- MySQL（数据库）
- Multer（文件上传）
- JWT（用户鉴权）
- bcryptjs（密码加密）

### **工程化（Engineering）**
- ESLint + Prettier（代码规范）
- Husky + lint-staged（提交检查）
- Git（版本管理）

---

## 📂 项目结构（Monorepo）

```text
short-video-system/
│
├── frontend/       # React + TS 前端项目
│
├── backend/        # Node.js + Express 后端项目
│
└── docs/           # 文档
