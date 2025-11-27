import React from "react";
import { useNavigate } from "react-router-dom";
import { VideoItem } from "../../mock/videos";

interface Props {
    video: VideoItem;
}

const RecommendCard: React.FC<Props> = ({ video }) => {
    const navigate = useNavigate();

    return (
        <div
            className="explore-card"
            onClick={() => navigate(`/video/${video.id}`)}
        >
            <img src={video.thumbnailUrl} alt={video.title} />
            <div className="card-info">
                <p className="title">{video.title}</p>
                <p className="author">@{video.author}</p>
            </div>
        </div>
    );
};

export default RecommendCard;
