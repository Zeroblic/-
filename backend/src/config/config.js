// JWT secret should come from environment; fallback is for local dev only
export const JWT_SECRET = process.env.JWT_SECRET || "bytedance-short-video-secret";
