import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// 公开上传目录（让前端能访问视频）
app.use("/uploads", express.static("src/uploads"));

// 挂载路由
app.use("/auth", authRoutes);
app.use("/video", videoRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
