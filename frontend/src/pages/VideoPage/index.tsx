import { useEffect, useState } from "react";
import VideoFeed from "../../components/VideoFeed";

const VideoPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch(`http://localhost:3001/video/list`);
                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error("获取视频失败:", err);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="video-page" style={{ position: "relative" }}>
            {/* 主播放组件 */}
            <VideoFeed
                videos={videos}
            />
        </div>
    );
};

export default VideoPage;
