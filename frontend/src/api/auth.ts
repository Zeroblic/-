import request from "./request";

export function loginAPI(data: { username: string; password: string }) {
    return request.post("/auth/login", data);
}

export function registerAPI(data: { username: string; password: string }) {
    return request.post("/auth/register", data);
}

