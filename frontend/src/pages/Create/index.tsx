import React, { useState } from "react";
import axios from "axios";

const Create = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!videoFile) return alert("请选择一个视频文件");

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

        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("title", title);
        formData.append("category", category);
        formData.append("user_id", String(userId));

        const res = await axios.post("http://localhost:3001/video/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.msg);
    };

    return (
        <div>
            <h2>发布视频</h2>

            <input
                type="text"
                placeholder="视频标题"
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="分类"
                onChange={(e) => setCategory(e.target.value)}
            />

            <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />

            <button onClick={handleUpload}>上传</button>
        </div>
    );
};

export default Create;
