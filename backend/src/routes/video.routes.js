import express from "express";
import multer from "multer";
import { publishVideo, getVideoList, getMyVideos, deleteVideo, likeVideo} from "../controllers/video.controller.js";

const router = express.Router();

// 配置 multer
const storage = multer.diskStorage({
    destination: "src/uploads",
    filename: (req, file, cb) => {
        const filename = Date.now() + "_" + file.originalname;
        cb(null, filename);
    },
});

const upload = multer({ storage });

// 上传视频 API
router.post("/upload", upload.single("video"), publishVideo);

// 获取视频列表（首页推荐）
router.get("/list", getVideoList);

//获取我的视频列表
router.get("/my", getMyVideos);

// 删除视频 API
router.post("/delete", deleteVideo);

// 点赞视频 API
router.post("/like", likeVideo);

// 分页获取视频列表
router.get("/list", getVideoListPaged);

export default router;
