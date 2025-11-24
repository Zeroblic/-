import { db } from "../config/db.js";

export const uploadVideo = (req, res) => {
  const { title, category } = req.body;
  const url = `/uploads/${req.file.filename}`;
  const userId = req.user.id;

  db.query(
    "INSERT INTO video (title, category, url, user_id) VALUES (?, ?, ?, ?)",
    [title, category, url, userId],
    () => res.json({ msg: "Upload success", url })
  );
};

export const getMyVideos = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM video WHERE user_id=? ORDER BY create_time DESC",
    [userId],
    (err, rows) => res.json(rows)
  );
};

export const getRecommendVideos = (req, res) => {
  const { category, sort } = req.query;

  let sql = "SELECT * FROM video WHERE 1=1";
  const params = [];

  if (category) {
    sql += " AND category=?";
    params.push(category);
  }

  // only allow known sortable fields to avoid SQL injection
  const sortWhitelist = {
    create_time: "create_time",
    views: "views",
    likes: "likes",
  };
  const sortField = sortWhitelist[sort] || "create_time";
  sql += ` ORDER BY ${sortField} DESC`;

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ msg: "DB error" });
    res.json(rows);
  });
};

export const editVideo = (req, res) => {
  const { title, category } = req.body;
  const videoId = req.params.id;

  db.query(
    "UPDATE video SET title=?, category=? WHERE id=?",
    [title, category, videoId],
    () => res.json({ msg: "Update success" })
  );
};
