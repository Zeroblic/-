import axios from "axios";

export const getMyVideosAPI = (userId: number) => {
    return axios.get(`http://localhost:3001/video/my?userId=${userId}`);
};

export const likeVideoAPI = (video_id: number, user_id: number) => {
    return axios.post("http://localhost:3001/video/like", { video_id, user_id });
};     
