import React, { useState, useEffect } from "react";
import "./style.css";
import type { VideoItem } from "../VideoFeed";
import { useNavigate } from "react-router-dom";

interface Props {
    videos: VideoItem[];
}

const HomeRightRecommend: React.FC<Props> = ({ videos }) => {
    const [list, setList] = useState<VideoItem[]>(getRandomSix(videos));

    const navigate = useNavigate();

    function refresh() {
        setList(getRandomSix(videos));
    }

    useEffect(() => {
        if (videos.length > 0) {
            setList(getRandomSix(videos));
        }
    }, [videos]);

    return (
        <div className="home-right-recommend">
            <div className="top-bar">
                热门推荐
                <button onClick={refresh}>换一换</button>
            </div>

            <div className="recommend-list">
                {list.map(video => (
                    <div key={video.id} className="recommend-card" onClick={() => navigate(`/video/${video.id}`)}>
                        <img src={video.thumbnailUrl} alt={video.title} />
                        <div className="info">
                            <div className="title">{video.title}</div>
                            <div className="author">@{video.author}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

function getRandomSix(videos: VideoItem[]) {
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
}

export default HomeRightRecommend;
