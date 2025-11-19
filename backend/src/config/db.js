import mysql from "mysql2";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "你的数据库密码",
  database: "video_system",
});
