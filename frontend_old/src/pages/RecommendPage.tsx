import RecommendFeed from "../components/RecommendFeed";
import { MOCK_VIDEOS } from "../mock/videos";

const RecommendPage = () => {
    return <RecommendFeed initialVideos={MOCK_VIDEOS} />;
};

export default RecommendPage;
