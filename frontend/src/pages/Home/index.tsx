import { useEffect, useState } from "react";
import RecommendFeed from "../../components/RecommendFeed";
import BannerCarousel from "../../components/BannerCarousel";
import HomeRightRecommend from "../../components/HomeRightRecommend";
import HeaderTopBar from "../../components/HeaderTopBar";

import "../../index.css"; // 全局样式

const HomePage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch(`http://localhost:3001/video/list`);
                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error("获取视频失败:", err);
            }
        };

        fetchVideos();
    }, []);
    return (
        <>

            <HeaderTopBar />

            <div className="home-page">

                <div className="top-section">
                    {/* 左侧轮播 */}

                    <div className="banner-area">
                        <BannerCarousel />
                    </div>

                    {/* 右侧推荐区 */}
                    <div className="right-recommend-area">
                        <HomeRightRecommend videos={videos} />
                    </div>
                </div>

                {/* 推荐视频流*/}
                <RecommendFeed initialVideos={videos} />
            </div>
        </>
    );
};

export default HomePage;
