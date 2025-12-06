import path from "path";
import fs from "fs";
import { Video } from "../models/video.js";

export const publishVideo = async (req, res) => {
  try {
    const { title, category, user_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "视频文件缺失" });
    }

    const url = `http://localhost:3001/uploads/${file.filename}`;

    await Video.create({
      title,
      category,
      url,
      user_id,
    });

    res.json({ msg: "上传成功, user_id为: " + user_id, url });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "上传失败", err });
  }
};

export const getVideoList = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [["create_time", "DESC"]],
    });

    res.json(videos);

  } catch (err) {
    res.status(500).json({ msg: "获取列表失败" });
  }
};

export const getVideoListByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ msg: "category is required" });
    }

    const videos = await Video.findAll({
      where: { category },
      order: [["create_time", "DESC"]],
    });

    res.json(videos);
  } catch (err) {
    console.log("获取分类视频失败：", err);
    res.status(500).json({ msg: "获取失败" });
  }
};

export const getMyVideos = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ msg: "userId is required" });
    }

    const videos = await Video.findAll({
      where: { user_id: userId },
      order: [["create_time", "DESC"]],
    });

    res.json({
      msg: "success",
      data: videos,
    });

  } catch (err) {
    console.log("获取个人视频失败：", err);
    res.status(500).json({ msg: "DB error" });
  }
};


export const deleteVideo = async (req, res) => {
  try {
    const { video_id, user_id } = req.body;

    if (!video_id || !user_id) {
      return res.status(400).json({ msg: "video_id 和 user_id 必填" });
    }

    // ① 查询该视频
    const video = await Video.findByPk(video_id);

    if (!video) {
      return res.status(404).json({ msg: "视频不存在" });
    }

    // ② 权限验证
    if (video.user_id !== Number(user_id)) {
      return res.status(403).json({ msg: "无权限删除此视频" });
    }

    // ③ 删除本地文件
    const filePath = path.join("src/uploads", path.basename(video.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // ④ 删除数据库记录
    await video.destroy();

    res.json({
      msg: "删除成功",
      video_id,
    });

  } catch (err) {
    console.log("删除失败：", err);
    res.status(500).json({ msg: "删除失败" });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const { video_id, user_id } = req.body;
    if (!video_id || !user_id) {
      return res.status(400).json({ msg: "video_id 和 user_id 必填" });
    }

    // 1) 原子自增（避免并发丢失）
    const [affected] = await Video.increment('likes', {
      by: 1,
      where: { id: video_id },
    });

    // 2) 再查一次最新值返回给前端
    const updated = await Video.findByPk(video_id, {
      attributes: ['id', 'likes'],
    });
    if (!updated) {
      return res.status(404).json({ msg: "视频不存在" });
    }

    return res.json({ msg: "点赞成功", video_id, likes: updated.likes });

  } catch (err) {
    console.log("点赞失败：", err);
    return res.status(500).json({ msg: "点赞失败" });
  }
};

export const getVideoListPaged = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const { rows, count } = await Video.findAndCountAll({
      limit: pageSize,
      offset,
      order: [["create_time", "DESC"]],
    });

    res.json({
      list: rows,
      total: count,
      hasMore: page * pageSize < count
    });
  } catch (err) {
    console.error("分页视频获取失败：", err);
    res.status(500).json({ msg: "DB error" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { video_id, title, description, category, thumbnailUrl } = req.body;

    if (!video_id) {
      return res.status(400).json({ msg: "video_id is required" });
    }

    const video = await Video.findByPk(video_id);

    if (!video) {
      return res.status(404).json({ msg: "视频不存在" });
    }

    await video.update({
      title,
      description,
      category,
      thumbnailUrl,
    });

    res.json({ msg: "更新成功", video });
  } catch (err) {
    console.log("修改视频失败：", err);
    res.status(500).json({ msg: "修改失败" });
  }
};
