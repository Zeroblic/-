import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
// 创建 Sequelize 实例（替代 mysql.createPool）
export const sequelize = new Sequelize(
  process.env.DB_NAME || "video_system",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // 可选：关闭日志输出
    pool: {
      max: 10,
      min: 0, 
      acquire: 30000,
      idle: 10000,
    },
  }
);

// 连接测试
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize connected to MySQL successfully.");
  } catch (error) {
    console.error("Sequelize connection failed:", error);
  }
};


