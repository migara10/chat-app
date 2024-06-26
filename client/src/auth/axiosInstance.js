import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5700",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
