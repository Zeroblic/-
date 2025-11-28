export interface VideoItem {
    id: number;
    url: string;
    thumbnailUrl: string;
    title: string;
    author: string;
    description: string;
    likes: number;
    comments: number;
}

export const MOCK_VIDEOS: VideoItem[] = [
    {
        id: 1,
        url: "https://cdn.videvo.net/videvo_files/video/premium/video0037/large_watermarked/644_644-0263_preview.mp4",
        thumbnailUrl: "https://picsum.photos/id/1011/400/500",
        title: "城市延时摄影",
        author: "创作者_A",
        description: "傍晚城市的延时光流。",
        likes: 382,
        comments: 45,
    },
    {
        id: 2,
        url: "https://cdn.videvo.net/videvo_files/video/free/2013-08/large_watermarked/Night_Traffic_Lapse_preview.mp4",
        thumbnailUrl: "https://picsum.photos/id/1021/400/500",
        title: "夜间车流",
        author: "创作者_B",
        description: "快速闪动的车轨，超炫。",
        likes: 580,
        comments: 110,
    },
    {
        id: 3,
        url: "https://cdn.videvo.net/videvo_files/video/free/2014-04/large_watermarked/big_buck_bunny_1080p_h264_preview.mp4",
        thumbnailUrl: "https://picsum.photos/id/1031/400/500",
        title: "测试视频 · 兔子动画",
        author: "创作者_C",
        description: "非常流畅的 mp4，适合播放器调试。",
        likes: 723,
        comments: 90,
    },
    {
        id: 4,
        url: "https://cdn.videvo.net/videvo_files/video/premium/video0038/large_watermarked/643_643-0125_preview.mp4",
        thumbnailUrl: "https://picsum.photos/id/1041/400/500",
        title: "森林航拍",
        author: "创作者_D",
        description: "航拍森林，画面唯美。",
        likes: 951,
        comments: 210,
    },
];
