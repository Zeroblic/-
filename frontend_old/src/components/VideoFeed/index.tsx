import React, { useRef, useState, useEffect } from "react";
import { VideoItem } from "../../mock/videos";
import { useParams } from "react-router-dom";
import "./style.css";

interface Props {
    videos: VideoItem[];
    initialIndex?: number;
}

const VideoFeed: React.FC<Props> = ({ videos }) => {
    const { id } = useParams();
    const initialIndex = id ? videos.findIndex(v => v.id === Number(id)) : 0;
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const containerRef = useRef<HTMLDivElement>(null);

    // 上滑下一条
    const nextVideo = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1));
    };

    // 下滑上一条
    const prevVideo = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    // 处理滑动逻辑
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let startY = 0;
        let endY = 0;

        const touchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const touchEnd = (e: TouchEvent) => {
            endY = e.changedTouches[0].clientY;
            const deltaY = endY - startY;

            if (deltaY < -80) nextVideo();      // 上滑
            else if (deltaY > 80) prevVideo(); // 下滑
        };

        container.addEventListener("touchstart", touchStart);
        container.addEventListener("touchend", touchEnd);

        return () => {
            container.removeEventListener("touchstart", touchStart);
            container.removeEventListener("touchend", touchEnd);
        };
    }, []);

    return (
        <div className="video-feed-container" ref={containerRef}>
            {videos.map((video, i) => (
                <VideoPlayer
                    key={video.id}
                    data={video}
                    isActive={i === currentIndex}
                />
            ))}
        </div>
    );
};

export default VideoFeed;


// ----------------------------------------------------------------------
// 单个视频播放器
// ----------------------------------------------------------------------
const VideoPlayer = ({ data, isActive }: { data: VideoItem; isActive: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isActive) videoRef.current.play();
        else videoRef.current.pause();
    }, [isActive]);

    return (
        <div className="video-wrapper">
            <video
                ref={videoRef}
                src={data.url}
                className="video-player"
                muted
                loop
                playsInline
            />

            <div className="video-info">
                <h3>@{data.author}</h3>
                <p>{data.description}</p>
            </div>
        </div>
    );
};
