import "./App.css";
import { Routes, Route } from "react-router-dom";

import RecommendFeed from "./components/RecommendFeed";
import VideoFeed from "./components/VideoFeed";
import { MOCK_VIDEOS } from "./mock/videos";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* 登录注册 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 首页 & 视频页 —— 需要登录才能访问 */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RecommendFeed initialVideos={MOCK_VIDEOS} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/video/:id"
        element={
          <ProtectedRoute>
            <VideoFeed videos={MOCK_VIDEOS} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
