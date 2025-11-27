import axios from "axios";

// 你的后端地址
const BASE_URL = "http://localhost:3001"; // 后端端口

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

// 请求拦截器：自动带上 token
request.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default request;
