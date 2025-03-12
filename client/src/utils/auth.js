// Funciones para gestionar los tokens de autenticación (guardar, eliminar, refrescar)
// y para interactuar con la API de autenticación.

//import axios from "../config";
//import axios from "axios";
//import { API_ENDPOINTS } from "../config/apiEndpoints";

// Gestión de tokens de autenticación
// Guardar tokens
export const setTokens = (accessToken) => {
  localStorage.setItem("token", accessToken);
  //localStorage.setItem("refreshToken", refreshToken);
};

// Eliminar tokens
export const clearToken = () => {
  localStorage.removeItem("token");
  // localStorage.removeItem("refreshToken");
};

// Refresh token
// export const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     const { data } = await axios.post(
//       //API_ENDPOINTS.AUTH.REFRESH,
//       `${process.env.REACT_APP_BACKEND_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
//       { refreshToken },
//       { withCredentials: true }
//     );
//     setTokens(data.accessToken, data.refreshToken);
//     return data.accessToken;
//   } catch (error) {
//     clearTokens();
//     throw error;
//   }
// };

// Interceptor para refresh automático
// export const setupAxiosInterceptors = (axiosInstance) => {
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const accessToken = await refreshAccessToken();
//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           clearTokens();
//           window.location.href = "/login";
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// Interceptor para manejar tokens expirados
export const setupAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token inválido o expirado
        clearToken();

        // Guardar la URL actual para redirigir después del login
        if (window.location.pathname !== "/login") {
          sessionStorage.setItem(
            "redirectAfterLogin",
            window.location.pathname
          );
        }

        // Redirigir al login
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};
