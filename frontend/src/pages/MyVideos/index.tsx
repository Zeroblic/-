import { useEffect, useState, useRef } from "react";
import { getMyVideosAPI } from "../../api/video";
import { getUserId } from "../../components/GetUserInfo";
import type { VideoItem } from "../../components/VideoFeed";
import VideoFeed from "../../components/VideoFeed";
import "./style.css";
import axios from "axios";

const MyVideos = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null); // 当前选中的视频（侧边栏用）
    const [sidebarOpen, setSidebarOpen] = useState(false); // 控制侧边栏打开

    const [playerOpen, setPlayerOpen] = useState(false); // 全屏播放开关
    const [initialId, setInitialId] = useState<number | null>(null);
    let userId = getUserId();
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getMyVideosAPI(userId).then(res => {
            setVideos(res.data.data);
        });
    }, []);

    // 点击某个视频 → 打开侧边栏
    const handleCardClick = (video: VideoItem) => {
        setActiveVideo(video);
        setSidebarOpen(true);

        // 打开短视频播放模式
        setInitialId(video.id);
        setPlayerOpen(true);
    };

    // 删除视频
    const handleDelete = async () => {
        if (!activeVideo) return alert("无效的视频 ID");

        // 二次确认
        if (!confirm("确认删除这个视频吗？删除后不可恢复！")) return;

        try {
            const res = await axios.post("http://localhost:3001/video/delete", {
                video_id: activeVideo.id,
                user_id: userId,
            });

            alert(res.data.msg);

            // 刷新当前页面或重新渲染列表
            window.location.reload(); // 简单粗暴
            // 或者用 setVideos(v => v.filter(item => item.id !== videoId))
        } catch (error) {
            alert("删除失败，请稍后再试");
            console.error(error);
        }
    };


    // 修改视频
    const handleEdit = () => {
        if (!activeVideo) return;

        // TODO：跳转到编辑页面或弹窗
        alert("跳转到编辑功能（你可以再要求我写这个）");
    };

    return (
        <div className="my-videos-container">
            <h2 className="my-videos-title">我的作品</h2>

            {!playerOpen && (
                <div className="explore-grid">
                    {videos.map((v) => (
                        <div
                            key={v.id}
                            className="video-card"
                            onClick={() => handleCardClick(v)}
                        >
                            <div className="video-wrapper">
                                <video src={v.url} controls />
                            </div>
                            <p>{v.title}</p>
                        </div>
                    ))}
                </div>
            )}
            {/* 侧边栏 */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-title">
                    {activeVideo ? activeVideo.title : "视频工具"}
                </div>

                <button className="sidebar-btn btn-edit" onClick={handleEdit}>
                    ✏ 修改视频
                </button>

                <button className="sidebar-btn btn-delete" onClick={handleDelete}>
                    🗑 删除视频
                </button>
            </div>

            {playerOpen && (
                <div className="video-overlay" ref={overlayRef}>
                    <button className="overlay-close" onClick={() => setPlayerOpen(false)}>✖</button>
                    <VideoFeed
                        videos={videos}
                        initialVideoId={initialId ?? undefined}
                        scrollContainer={overlayRef as unknown as React.RefObject<HTMLDivElement>}       // 传给子组件
                        onSelect={setActiveVideo}          // 同步右侧工具
                    />
                </div>
            )}
        </div>
    );
};

export default MyVideos;
