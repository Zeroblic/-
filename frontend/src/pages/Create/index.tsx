import { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../components/GetUserInfo";

const Create = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!videoFile) return alert("请选择一个视频文件");

        let userId = getUserId();

        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("title", title);
        formData.append("category", category);
        formData.append("user_id", String(userId));

        try {
            const res = await axios.post("http://localhost:3001/video/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(res.data.msg);

            navigate("/my");
        } catch (error) {
            alert("上传失败，请稍后再试");
            console.error(error);
        }
    };

    return (
        <div className="create-container">
            <h2>发布视频</h2>

            <input
                type="text"
                placeholder="视频标题"
                className="create-input"
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                className="create-input"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue=""
            >
                <option value="" disabled>选择分类</option>
                <option value="影视">影视</option>
                <option value="动画">动画</option>
                <option value="鬼畜">鬼畜</option>
                <option value="舞蹈">舞蹈</option>
                <option value="娱乐">娱乐</option>
                <option value="科技">科技</option>
                <option value="美食">美食</option>
                <option value="体育">体育</option>
                <option value="游戏">游戏</option>
                <option value="知识">知识</option>
            </select>
                <input
                    type="file"
                    accept="video/*"
                    className="create-input create-file-input"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                />
                <button className="create-btn" onClick={handleUpload}>上传</button>
        </div>
    );
};

export default Create;
