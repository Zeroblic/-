import axios from "axios";

export const getMyVideosAPI = (userId: number) => {
    return axios.get(`http://localhost:3001/video/my?userId=${userId}`);
};
