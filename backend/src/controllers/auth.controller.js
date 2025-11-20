import bcrypt from "bcryptjs"; //加密密码
import jwt from "jsonwebtoken"; //用于生成登录 token，让用户保持登录状态。
import { db } from "../config/db.js"; 
import { JWT_SECRET } from "../config/config.js"; //JWT 密钥，所有 token 都要用这个钥匙来签名。

export const register = (req, res) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO user (username, password) VALUES (?, ?)",
    [username, hash],
    (err) => {
      if (err) return res.status(500).json({ msg: "User exists" });

      res.json({ msg: "Register success" });
    }
  );
};

export const login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE username=?",
    [username],
    (err, rows) => {
      if (rows.length === 0) return res.status(400).json({ msg: "User not found" });

      const user = rows[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ msg: "Wrong password" });
      }

      //密码正确 → 生成 JWT 登录 token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ msg: "Login success", token });
    }
  );
};
