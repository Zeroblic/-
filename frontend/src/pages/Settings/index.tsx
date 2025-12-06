import { useState } from "react";
import "./style.css";
import { getUserName, getUserId } from "../../components/GetUserInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const [username, setUsername] = useState(getUserName());
    //const [password, setPassword] = useState(getUserPw());
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();

    const handleSave = () => {

        const userId = getUserId();  // 你之前写的 token 方法
        const newUsername = username;
        //const newPassword = password; // 如果需要更新密码，可以添加相应的输入框

        axios.post("http://localhost:3001/auth/update", {
            userId: userId,
            username: newUsername
        })
            .then(res => {
                alert(res.data.msg);

                // 如果后端返回了新的 token，更新它
                if (res.data.token && typeof res.data.token === "string") {
                    localStorage.setItem("token", res.data.token);
                }

                navigate("/");
            })
            .catch(err => {
                console.error(err);
                alert("保存失败，请稍后再试");
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="settings-container">
            <h2 className="settings-title">设置</h2>

            <div className="settings-section">
                <label>昵称</label>
                <input
                    className="settings-input"
                    value={username ?? ""}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={getUserName() ?? ""}
                />
            </div>

            <div className="settings-section">
                <label>主题</label>
                <select className="settings-input" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="light">浅色模式</option>
                    <option value="dark">深色模式</option>
                </select>
            </div>

            <button className="settings-save-btn" onClick={handleSave}>
                保存设置
            </button>

            <button className="settings-logout-btn" onClick={handleLogout}>
                退出登录
            </button>
        </div>
    );
};

export default Settings;
