import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import { FaHeart, FaCommentDots, FaShare, FaMusic, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// 定义视频数据接口
export interface VideoItem {
    id: number;
    url: string;
    author: string;
    description: string;
    likes: string;
    comments: string;
}

interface Props {
    videos: VideoItem[];
}

const VideoFeed: React.FC<Props> = ({ videos }) => {
    // 用于管理当前正在播放哪个视频（可选优化）
    // const [currentIndex, setCurrentIndex] = useState(0);

    // 全局静音状态（可选，用于实现全局静音/取消静音功能）
    const [isGlobalMuted, setIsGlobalMuted] = useState(true);
    // 全局静音切换函数
    const toggleGlobalMute = () => {
        setIsGlobalMuted(prev => !prev);
    };

    return (
        <div className="video-feed-container">
            {videos.map((video, index) => (
            <VideoCard 
                key={video.id} 
                data={video}
                isMuted={isGlobalMuted} 
                toggleMute={toggleGlobalMute} 
            />
            ))}
        </div>
    );
};

interface VideoCardProps { // 建议改名，以区分父组件的 Props
    data: VideoItem;
    isMuted: boolean; 
    toggleMute: () => void; 
}

// 单个视频卡片组件
const VideoCard: React.FC<VideoCardProps> = ({ data, isMuted, toggleMute }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // 点击切换播放/暂停
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // 使用 IntersectionObserver 实现划走自动暂停 (性能优化关键)
    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                videoRef.current?.play();
                setIsPlaying(true);
            } else {
                videoRef.current?.pause();
                setIsPlaying(false);
            }
            });
        },
        { threshold: 0.6 }
        );

        // 先用一个变量把当前的 DOM 元素存下来
        const videoElement = videoRef.current;

        if (videoElement) {
        observer.observe(videoElement);
        }

        return () => {
        // 清理的时候，使用刚才存下来的变量，而不是 videoRef.current
        if (videoElement) observer.unobserve(videoElement);
        };
    }, []);
    return (
        <div className="video-card">
            {/* 视频层 */}
            <video
            ref={videoRef}
            className="video-player"
            src={data.url}
            loop
            playsInline
            // 添加 muted 属性, 否则部分浏览器禁止自动播放
            muted={isMuted}
            onClick={togglePlay}
            />

            {/* 底部信息层 */}
            <div className="footer-info">
                <div className="username">@{data.author}</div>
                <div className="description">{data.description}</div>
                <div className="music-note">
                    {/* @ts-ignore: 忽略 TS2786 类型定义冲突 */}
                    <FaMusic /> 原始声音 - {data.author}
                </div>
            </div>

            {/* 右侧交互层 */}
            <div className="sidebar">
                <div className="icon-wrapper">
                    <div style={{ border: '2px solid white', borderRadius: '50%', width: 45, height: 45, background: '#eee', marginBottom: 10 }}>
                        {/* 这里放头像 img */}
                    </div>
                </div>
                <div className="icon-wrapper" onClick={toggleMute}>
                    {/* @ts-ignore: 忽略 TS2786 类型定义冲突 */}
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    <span>{isMuted ? '静音' : '取消静音'}</span>
                </div>
                <div className="icon-wrapper">
                    {/* @ts-ignore: 忽略 TS2786 类型定义冲突 */}
                    <FaHeart />
                    <span>{data.likes}</span>
                </div>
                <div className="icon-wrapper">
                    {/* @ts-ignore: 忽略 TS2786 类型定义冲突 */}
                    <FaCommentDots />
                    <span>{data.comments}</span>
                </div>
                <div className="icon-wrapper">
                    {/* @ts-ignore: 忽略 TS2786 类型定义冲突 */}
                    <FaShare />
                    <span>分享</span>
                </div>
            </div>
        </div>
    );
};

export default VideoFeed;