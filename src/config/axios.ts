import axios from "axios";
import { tokenService } from "../utils/tokenService";

export const axiosClient = axios;

const baseUrl = import.meta.env.VITE_API_URL;

axiosClient.defaults.baseURL = baseUrl;
axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use((config) => {
  const token = tokenService.getJwtToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      if (error.response.status === 401) {
        tokenService.removeJwtToken();

        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error.message);
  },
);
