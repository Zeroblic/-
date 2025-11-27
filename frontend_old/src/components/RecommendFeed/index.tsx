import React, { useState, useRef, useEffect, useCallback } from "react";
import RecommendCard from "./RecommendCard";
import "./style.css";
import { VideoItem } from "../../mock/videos";

interface Props {
    initialVideos: VideoItem[];
}

const RecommendFeed: React.FC<Props> = ({ initialVideos }) => {
    const [videos, setVideos] = useState(initialVideos);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const bottomRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        await new Promise(r => setTimeout(r, 800));

        const newItems = Array.from({ length: 10 }, (_, i) => ({
            id: page * 10 + i + 1,
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnailUrl: `https://picsum.photos/id/${page * 10 + i + 30}/400/500`,
            title: `创意灵感 #${page * 10 + i + 1}`,
            author: `作者_${page * 10 + i + 1}`,
            description: "自动加载视频",
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 200),
        }));

        setVideos(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setLoading(false);

        if (page > 3) setHasMore(false);
    }, [page, loading, hasMore]);

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
                {videos.map(video => (
                    <RecommendCard key={video.id} video={video} />
                ))}
            </div>

            <div ref={bottomRef} className="loading-more">
                {loading ? "加载中..." : hasMore ? "继续下滑加载更多" : "没有更多内容"}
            </div>
        </div>
    );
};

export default RecommendFeed;
