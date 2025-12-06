// scripts/importMockVideos.js
import { sequelize } from "../src/config/db.js";
import { Video } from "../src/models/video.js";

// 你的 MOCK 数据（可直接粘贴）
const mockVideos = [
    {
        url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
        thumbnailUrl: "https://picsum.photos/seed/video1_new/400/500",
        title: "兔子动画 (720P, 1MB)",
        author: "测试源",
        description: "高兼容性测试视频源，用于快速切换测试。",
        likes: 382,
        comments: 45,
        category: "动画",
        user_id: 1
    },
    {
        url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
        thumbnailUrl: "https://picsum.photos/seed/video2_new/400/500",
        title: "高清动画 (720P, 20MB)",
        author: "测试源",
        description: "高质量测试源，适合清晰度测试。",
        likes: 580,
        comments: 110,
        category: "电影剪辑",
        user_id: 1
    },
    {
        url: "https://media.w3.org/2010/05/bunny/trailer.mp4",
        thumbnailUrl: "https://picsum.photos/seed/video3_new/400/500",
        title: "短篇 CG 作品",
        author: "CG 团队",
        description: "精致的 CG 短片，用于渲染和渲染性能测试。",
        likes: 920,
        comments: 230,
        category: "CG",
        user_id: 1
    },
    {
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        thumbnailUrl: "https://picsum.photos/seed/video4_new/400/500",
        title: "自然花朵微距",
        author: "自然摄影",
        description: "真实花朵微距拍摄，用于色彩测试。",
        likes: 744,
        comments: 89,
        category: "自然",
        user_id: 1
    },
    {
        url: "https://media.w3.org/2010/05/bunny/movie.mp4",
        thumbnailUrl: "https://picsum.photos/seed/video5_new/400/500",
        title: "卡通短片片段",
        author: "动画制作",
        description: "用于卡通类内容展示。",
        likes: 311,
        comments: 26,
        category: "卡通",
        user_id: 1
    },
    {
        url: "https://media.w3.org/2010/05/bunny/movie.mp4",
        thumbnailUrl: "https://picsum.photos/seed/video6_new/400/500",
        title: "卡通短片片段2",
        author: "动画制作",
        description: "用于卡通类内容展示。",
        likes: 311,
        comments: 26,
        category: "卡通",
        user_id: 1
    }
];

(async () => {
    try {
        await sequelize.authenticate();
        console.log("数据库连接成功");

        await Video.bulkCreate(mockVideos);
        console.log("MOCK 视频数据导入完成!");

        process.exit();
    } catch (err) {
        console.error("导入失败：", err);
        process.exit(1);
    }
})();
