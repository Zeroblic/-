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

    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        category: "",
        thumbnailUrl: "",
    });


    useEffect(() => {
        getMyVideosAPI(userId).then(res => {
            setVideos(res.data.data);
        });
    }, [userId]);

    const handleSelect = (video: VideoItem) => {
        setActiveVideo(video);
        setSidebarOpen(true);
    };

    const handleOpenPlayer = (video: VideoItem) => {
        setActiveVideo(video);
        setInitialId(video.id);
        setPlayerOpen(true);

        // 全屏打开时暂停所有小窗视频
        document.querySelectorAll("video").forEach((v) => v.pause());
    };


    // 全屏播放时，暂停所有小窗视频播放
    const handleClosePlayer = () => {
        // 关闭窗口
        setPlayerOpen(false);
        // 强制暂停所有页面上的 <video> 元素
        document.querySelectorAll("video").forEach((v) => v.pause());
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

        setEditForm({
            title: activeVideo.title,
            description: activeVideo.description ?? "",
            category: activeVideo.category ?? "",
            thumbnailUrl: activeVideo.thumbnailUrl ?? "",
        });

        setEditOpen(true);
    };

    const handleSaveEdit = async () => {
        if (!activeVideo) return;

        try {
            const res = await axios.post("http://localhost:3001/video/update", {
                video_id: activeVideo.id,
                ...editForm,
            });

            alert("修改成功！");

            // 更新前端列表
            setVideos(v =>
                v.map(item =>
                    item.id === activeVideo.id
                        ? { ...item, ...editForm }
                        : item
                )
            );

            setEditOpen(false);
        } catch (error) {
            console.error(error);
            alert("修改失败，请稍后再试");
        }
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
                            onClick={() => handleSelect(v)}          // 单击：选中
                            onDoubleClick={() => handleOpenPlayer(v)} // 双击：全屏播放
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
                    <button className="overlay-close" onClick={() => handleClosePlayer()}>✖</button>
                    <VideoFeed
                        videos={videos}
                        initialVideoId={initialId ?? undefined}
                        scrollContainer={overlayRef as unknown as React.RefObject<HTMLDivElement>}       // 传给子组件
                        onSelect={setActiveVideo}          // 同步右侧工具
                    />
                </div>
            )}
            {editOpen && (
                <div className="edit-modal">
                    <div className="edit-box">
                        <h3>编辑视频</h3>

                        <label>标题</label>
                        <input
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />

                        <label>分类</label>
                        <input
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        />

                        <label>简介</label>
                        <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        />

                        <label>封面 URL(可选)</label>
                        <input
                            value={editForm.thumbnailUrl}
                            onChange={(e) => setEditForm({ ...editForm, thumbnailUrl: e.target.value })}
                        />

                        <div className="edit-btns">
                            <button onClick={() => setEditOpen(false)}>取消</button>
                            <button onClick={handleSaveEdit}>保存</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyVideos;
