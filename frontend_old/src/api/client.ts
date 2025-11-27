import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_BASE || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) {
      config.headers = {} as any;
    }
    // avoid replacing the AxiosHeaders object shape — set the header on the existing headers object
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
