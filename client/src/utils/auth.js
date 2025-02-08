import axios from "../config";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// Gestión de tokens
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

// Refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const { data } = await axios.post(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken },
      { withCredentials: true }
    );
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch (error) {
    clearTokens();
    throw error;
  }
};

// Interceptor para refresh automático
export const setupAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const accessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};
