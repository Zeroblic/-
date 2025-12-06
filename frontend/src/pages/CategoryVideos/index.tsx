import { useEffect, useState } from "react";
import RecommendFeed from "../../components/RecommendFeed";
import HeaderTopBar from "../../components/HeaderTopBar";

interface CategoryVideosProps {
    category: string;   
}

const CategoryVideos = ({ category }: CategoryVideosProps) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch(`http://localhost:3001/video/categorylist?category=${category}`);
                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error("获取视频失败:", err);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            <HeaderTopBar />
            <RecommendFeed initialVideos={videos} />
        </div>
    );
};

export default CategoryVideos;
