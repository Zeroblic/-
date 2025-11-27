import React from "react";
import { useParams } from "react-router-dom";
import VideoFeed from "../components/VideoFeed";
import { MOCK_VIDEOS } from "../mock/videos";

// 播放页：根据点击的视频 ID，从该视频开始播放
const VideoPage = () => {
    const { id } = useParams();              // 从 URL 里获取视频 ID
    const videoId = Number(id);

    // 找到该视频在数组中的下标
    const startIndex = MOCK_VIDEOS.findIndex(v => v.id === videoId);

    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <VideoFeed videos={MOCK_VIDEOS} initialIndex={startIndex} />
        </div>
    );
};

export default VideoPage;
