import express from "express";
import { uploadVideo, getMyVideos, getRecommendVideos, editVideo } from "../controllers/video.controller.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// 上传视频
router.post("/upload", verifyToken, upload.single("video"), uploadVideo);

// 我的作品
router.get("/my", verifyToken, getMyVideos);

// 推荐视频
router.get("/list", getRecommendVideos);

// 编辑视频
router.put("/:id", verifyToken, editVideo);

export default router;
