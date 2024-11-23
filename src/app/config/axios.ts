import axios from "axios";
import { getTokens } from "../utils/local-storage";

axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.request.use(
  (config) => {
    const token = getTokens();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
