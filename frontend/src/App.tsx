import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import MainLayout from "./layout/MainLayout";
import MyVideos from "./pages/MyVideos";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";
import CartegoryVideos from "./pages/CategoryVideos";

function App() {
  return (
    <Routes>

      {/* 公开页面（不显示侧边栏） */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 登录后页面（显示侧边栏） */}
      <Route element={<MainLayout />}>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/video/:id" element={
          <ProtectedRoute>
            <VideoPage />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        } />
        <Route path="/my" element={
          <ProtectedRoute>
            <MyVideos />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/:category" element={
          <ProtectedRoute>
            <CartegoryVideos />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
