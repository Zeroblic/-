import { db } from "../config/db.js";

export const publishVideo = (req, res) => {
  const { title, category, user_id } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ msg: "视频文件缺失" });
  }

  const url = `/uploads/${file.filename}`;

  db.query(
    "INSERT INTO video (title, category, url, user_id) VALUES (?, ?, ?, ?)",
    [title, category, url, user_id],
    (err) => {
      if (err) return res.status(500).json({ msg: "上传失败", error: err });

      res.json({ msg: "上传成功, user_id为: " + user_id, url });
    }
  );
};

export const getVideoList = (req, res) => {
  db.query("SELECT * FROM video ORDER BY create_time DESC", (err, rows) => {
    if (err) return res.status(500).json({ msg: "获取列表失败" });
    res.json(rows);
  });
};

export const getMyVideos = (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ msg: "userId is required" });
  }

  db.query(
    "SELECT * FROM video WHERE user_id = ? ORDER BY create_time DESC",
    [userId],
    (err, rows) => {
      if (err) {
        console.log("获取个人视频失败：", err);
        return res.status(500).json({ msg: "DB error" });
      }

      res.json({
        msg: "success",
        data: rows,
      });
    }
  );
};