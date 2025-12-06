import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import './style.css';
import { FaHeart, FaCommentDots, FaShare, FaMusic } from 'react-icons/fa';
import { likeVideoAPI } from '../../api/video';
import { getUserId } from '../GetUserInfo';

// 定义视频数据接口
export interface VideoItem {
    id: number;
    url: string;
    title: string;
    author: string;
    description: string;
    likes: number;
    comments: number;
    muted?: boolean;
    thumbnailUrl: string;
    category: string;
}

interface Props {
    videos: VideoItem[];
    onSelect?: (video: VideoItem) => void;
    initialVideoId?: number;
    scrollContainer?: React.RefObject<HTMLDivElement>;
}

const VideoFeed: React.FC<Props> = ({ videos, onSelect, initialVideoId, scrollContainer }) => {
    // 用于管理当前正在播放哪个视频
    const [globalMuted, setGlobalMuted] = useState(true);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // 关键：布局完成后再滚动（避免还没挂好就滚导致从头开始）
    useLayoutEffect(() => {
        if (!initialVideoId) return;
        const idx = videos.findIndex(v => v.id === initialVideoId);
        if (idx < 0) return;

        const el = cardRefs.current[idx];
        const scroller = scrollContainer?.current;

        // 用下一帧保证元素尺寸已计算
        const id = requestAnimationFrame(() => {
            if (!el) return;
            if (scroller instanceof Window) {
                el.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
            } else {
                // 精准滚动到容器内的位置
                const top = el.offsetTop - 20;
                if (scroller)
                    scroller.scrollTo({ top, behavior: 'auto' });
            }
        });
        return () => cancelAnimationFrame(id);
    }, [initialVideoId, videos, scrollContainer]);
    return (
        <div className="video-feed-container">
            {videos.map((video) => (
                <VideoCard
                    key={video.id}
                    data={video}
                    muted={globalMuted}
                    onToggleMuted={() => setGlobalMuted(m => !m)}
                    onSelect={onSelect}
                />

            ))}
        </div>
    );
};

// 单个视频卡片组件
const VideoCard: React.FC<{ data: VideoItem; muted: boolean; onToggleMuted: () => void; onSelect?: (v: VideoItem) => void; }>
    = ({ data, muted, onToggleMuted, onSelect }) => {
        const videoRef = useRef<HTMLVideoElement | null>(null);
        const [isPlaying, setIsPlaying] = useState(false);

        const [likeCount, setLikeCount] = useState<number>(data.likes ?? 0);
        const [liked, setLiked] = useState<boolean>(false);
        const likePending = useRef(false);
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

        const handleLike = async (e: React.MouseEvent) => {
            e.stopPropagation();
            if (likePending.current) return;
            likePending.current = true;

            const uid = getUserId();
            const willLike = !liked;
            const delta = willLike ? 1 : -1;

            // 乐观更新
            setLiked(willLike);
            setLikeCount(c => c + delta);

            try {
                // 调接口（若没有后端，这里会失败并回滚）
                await likeVideoAPI(data.id, uid);
            } catch (err) {
                // 回滚
                setLiked(!willLike);
                setLikeCount(c => c - delta);
                console.error('like failed, rolled back', err);
            } finally {
                likePending.current = false;
            }
        };

        // 使用 IntersectionObserver 实现划走自动暂停 (性能优化关键)
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (videoRef.current) {
                                videoRef.current.play();
                                setIsPlaying(true);
                            }
                        } else {
                            if (videoRef.current) {
                                videoRef.current.pause();
                                setIsPlaying(false);
                            }
                        }
                    });
                },
                { threshold: 0.6 } // 当60%可见时触发
            );

            if (videoRef.current) {
                observer.observe(videoRef.current);
            }

            return () => {
                if (videoRef.current) observer.unobserve(videoRef.current);
            };
        }, []);

        return (
            <div className="video-card"
                onClick={() => onSelect?.(data)}
            >
                {/* 视频层 */}
                <video
                    ref={videoRef}
                    className="video-player"
                    src={data.url}
                    loop
                    playsInline
                    onClick={togglePlay}
                    muted={muted}
                />

                {/* 底部信息层 */}
                <div className="footer-info">
                    <div className="username">@{data.author}</div>
                    <div className="description">{data.description}</div>
                    <div className="music-note">
                        <FaMusic /> 原始声音 - {data.author}
                    </div>
                </div>

                {/* 右侧交互层 */}
                <div className="feed-sidebar">
                    <div className="icon-wrapper">
                        <div style={{ border: '2px solid white', borderRadius: '50%', width: 45, height: 45, background: '#eee', marginBottom: 10 }}>
                            {/* 这里放头像 img */}
                        </div>
                    </div>
                    <div className="icon-wrapper">
                        <button
                            className={`like-btn ${liked ? 'liked' : ''}`}
                            onClick={handleLike}
                            aria-label="like"
                        >
                            <FaHeart />
                        </button>
                        <span>{likeCount}</span>
                    </div>
                    <div className="icon-wrapper">
                        <FaCommentDots />
                        <span>{data.comments}</span>
                    </div>
                    <div className="icon-wrapper">
                        <FaShare />
                        <span>分享</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onToggleMuted(); }}>
                        {muted ? '🔇' : '🔊'}
                    </button>
                </div>
            </div>
        );
    };

export default VideoFeed;