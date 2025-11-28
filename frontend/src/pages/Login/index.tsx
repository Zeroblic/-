import { useState } from "react";
import "./style.css";
import { loginAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await loginAPI({ username, password });

            // 假设后端返回：{ token: "xxxxxx" }
            const token = res.data.token;
            localStorage.setItem("token", token);
            console.log("登录成功，token =", token);

            alert("登录成功");

            navigate("/");
        } catch (err) {
            alert("登录失败");
            console.error(err);
        }
    };
    return (
        <div className="login-container">
            <h2>登录</h2>

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

            <button onClick={handleLogin}>登录</button>

            <p>
                没有账号？ <a href="/register">去注册</a>
            </p>
        </div>
    );
}
