import { FormEvent, useEffect, useState } from "react";
import { apiClient } from "./api/client";
import "./App.css";

type Video = {
  id: number;
  title: string;
  category: string;
  url: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [myVideos, setMyVideos] = useState<Video[]>([]);
  const [recommend, setRecommend] = useState<Video[]>([]);

  useEffect(() => {
    if (token) {
      fetchMyVideos();
    }
    fetchRecommend();
  }, [token]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/login", { username, password });
      const tk = res.data.token as string;
      localStorage.setItem("token", tk);
      setToken(tk);
      setStatus("Login success");
    } catch (err: any) {
      setStatus(err?.response?.data?.msg || "Login failed");
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus("Select a video file first");
      return;
    }
    try {
      const form = new FormData();
      form.append("video", file);
      form.append("title", title);
      form.append("category", category);
      await apiClient.post("/video/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("Upload success");
      setTitle("");
      setCategory("");
      setFile(null);
      fetchMyVideos();
    } catch (err: any) {
      setStatus(err?.response?.data?.msg || "Upload failed");
    }
  };

  const fetchMyVideos = async () => {
    try {
      const res = await apiClient.get<Video[]>("/video/my");
      setMyVideos(res.data);
    } catch (err: any) {
      setStatus(err?.response?.data?.msg || "Fetch my videos failed");
    }
  };

  const fetchRecommend = async () => {
    try {
      const res = await apiClient.get<Video[]>("/video/list");
      setRecommend(res.data);
    } catch (err: any) {
      setStatus(err?.response?.data?.msg || "Fetch recommend failed");
    }
  };

  return (
    <div className="App">
      <h1>Short Video Manager (Demo)</h1>

      <section>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {token && <p>Token saved</p>}
      </section>

      <section>
        <h2>Upload Video</h2>
        <form onSubmit={handleUpload}>
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
          <button type="submit" disabled={!token}>
            Upload (need login)
          </button>
        </form>
      </section>

      <section>
        <h2>My Videos</h2>
        {!token && <p>Login to see your videos</p>}
        <ul>
          {myVideos.map((v) => (
            <li key={v.id}>
              {v.title} - {v.category} -{" "}
              <a href={`http://localhost:3001${v.url}`} target="_blank" rel="noreferrer">
                play
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recommend</h2>
        <ul>
          {recommend.map((v) => (
            <li key={v.id}>
              {v.title} - {v.category} -{" "}
              <a href={`http://localhost:3001${v.url}`} target="_blank" rel="noreferrer">
                play
              </a>
            </li>
          ))}
        </ul>
      </section>

      {status && <p>{status}</p>}
    </div>
  );
}

export default App;
