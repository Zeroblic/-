import React, { useState, useRef, useEffect, useCallback } from "react";
import RecommendCard from "./RecommendCard";
import "./style.css";
import type { VideoItem } from "../VideoFeed";

interface Props {
    initialVideos: VideoItem[];
}

const PAGE_SIZE = 10;

const RecommendFeed: React.FC<Props> = ({ initialVideos }) => {
    const [videos, setVideos] = useState<VideoItem[]>(initialVideos || []);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const bottomRef = useRef<HTMLDivElement>(null);

    // 🔥 从后端加载下一页
    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        const nextPage = page + 1;

        try {
            const res = await fetch(
                `http://localhost:3001/video/listpaged?page=${nextPage}&pageSize=${PAGE_SIZE}`
            );
            const data = await res.json();

            setVideos(prev => [...prev, ...data.list]);
            setHasMore(data.hasMore);
            setPage(nextPage);
        } catch (err) {
            console.error("分页加载失败:", err);
        }

        setLoading(false);
    }, [page, loading, hasMore]);

    // 🔥 监听滚动到底部
    useEffect(() => {
        if (!bottomRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) loadMore();
            },
            { rootMargin: "200px" }
        );

        observer.observe(bottomRef.current);

        return () => {
            if (bottomRef.current) observer.unobserve(bottomRef.current);
        };
    }, [loadMore]);

    return (
        <div className="explore-container">
            <div className="explore-grid">
                {videos.map((video, index) => (
                    <RecommendCard key={`${video.id}-${index}`} video={video} />
                ))}
            </div>

            <div ref={bottomRef} className="loading-more">
                {loading ? "加载中..." : hasMore ? "继续下滑加载更多" : "没有更多内容"}
            </div>
        </div>
    );
};

export default RecommendFeed;
