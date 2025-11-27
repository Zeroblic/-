import mysql from "mysql2";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "888999111Zxj!",
  database: process.env.DB_NAME || "video_system",
});
