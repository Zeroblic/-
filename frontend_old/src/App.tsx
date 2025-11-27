import React from 'react';
import './App.css';
import VideoFeed, { VideoItem } from './components/VideoPlayer';

// 模拟数据 - 后续从你的 api/client.ts 获取
const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 1,
    // 这里的 url 可以换成你 backend/uploads 里的本地服务地址，或者网络地址
    url: "https://media.w3.org/2010/05/bunny/trailer.mp4", 
    author: "ByteDance_Camp",
    description: "第一条测试视频，React + TypeScript 实现抖音效果！🔥 #青训营",
    likes: "12.5w",
    comments: "3021"
  },
  {
    id: 2,
    url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    author: "Zeroblic",
    description: "这是第二条视频，测试上下滑动是否流畅。🎥",
    likes: "8.9w",
    comments: "1022"
  }
];

function App() {
  return (
    <div className="App">
      {/* 直接渲染 Feed 组件 */}
      <VideoFeed videos={MOCK_VIDEOS} />
    </div>
  );
}

export default App;