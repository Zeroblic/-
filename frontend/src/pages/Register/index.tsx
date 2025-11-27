import { useState } from "react";
import { registerAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await registerAPI({ username, password });
            alert("注册成功");
            navigate("/login");
        } catch (err: any) {
            alert("注册失败：" + (err.response?.data?.message || "未知错误"));
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <h2>注册</h2>

            <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>注册</button>

            <p>
                已有账号？ <a href="/login">去登录</a>
            </p>
        </div>
    );
}
