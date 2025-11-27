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

export const MOCK_VIDEOS: VideoItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: `https://picsum.photos/id/${i + 10}/400/500`,
    title: `创意灵感 #${i + 1}`,
    author: `创作者_${i + 1}`,
    description: "灵感描述……",
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 200),
}));
