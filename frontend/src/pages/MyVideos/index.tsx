import { useEffect, useState } from "react";
import { getMyVideosAPI } from "../../api/video";
import type { VideoItem } from "../../components/VideoPlayer";

const MyVideos = () => {


    const [videos, setVideos] = useState<VideoItem[]>([]);

    // 用户id存 token 后解析出的 userId
    const token = localStorage.getItem("token");
    let userId = NaN;

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // 解析 JWT
            userId = payload.id; // 用户 id
        } catch (e) {
            console.error("Token decode error:", e);
        }
    }

    console.log("current userId =", userId);

    useEffect(() => {
        getMyVideosAPI(userId).then(res => {
            console.log("接口返回数据:", res.data);
            setVideos(res.data.data);
        });
    }, []);

    return (
        <div>
            <h2>我的作品</h2>
            <div className="explore-grid">
                {videos.map(v => (
                    <div key={v.id} className="video-card">
                        <video src={v.url} controls width="200"></video>
                        <p>{v.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyVideos;
