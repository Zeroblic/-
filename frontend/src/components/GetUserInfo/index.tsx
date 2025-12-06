import { jwtDecode } from "jwt-decode";

interface MyPayload {
    userId: number;
    username: string;
    iat: number;
    exp: number;
}

export function getUserId() {
    const token = localStorage.getItem("token");
    let userId = NaN;

    if (token) {
        try {
            const payload = jwtDecode<MyPayload>(token); // 解析 JWT
            userId = payload.userId; // 用户 id
        } catch (e) {
            console.error("Token decode error:", e);
        }
        return userId;
    }
    else {
        console.error("No token found");
        return NaN;
    }
}

export function getUserName() {
    const token = localStorage.getItem("token");
    let userName = null;

    if (token) {
        try {
            const payload = jwtDecode<MyPayload>(token); // 解析 JWT
            userName = payload.username; // 用户名
        } catch (e) {
            console.error("Token decode error:", e);
        }
        return userName;
    }
    else {
        console.error("No token found");
        return null;
    }
}