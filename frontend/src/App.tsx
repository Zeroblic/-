import "./App.css";
import { Routes, Route } from "react-router-dom";

import RecommendFeed from "./components/RecommendFeed";
import VideoFeed from "./components/VideoFeed";
import { MOCK_VIDEOS } from "./mock/videos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import MainLayout from "./layout/MainLayout";
import MyVideos from "./pages/MyVideos";

function App() {
  return (
    <Routes>

      {/* 公开页面（不显示侧边栏） */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 登录后页面（显示侧边栏） */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<RecommendFeed initialVideos={MOCK_VIDEOS} />} />
        <Route path="/video/:id" element={<VideoFeed videos={MOCK_VIDEOS} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/my" element={<MyVideos />} />
      </Route>
    </Routes>
  );
}

export default App;
