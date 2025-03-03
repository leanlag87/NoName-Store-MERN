// Configuración global de Axios, incluyendo la URL base, las cabeceras por defecto,
// y los interceptores para añadir el token JWT a las peticiones y manejar el refresh token.

import axios from "axios";
//import { clearTokens, refreshAccessToken } from "./utils/auth";

// Configuración base
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para token
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, Promise.reject);

// Interceptor para token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // No sobrescribir Content-Type si es una solicitud FormData
  if (config.data instanceof FormData) {
    // Eliminar el Content-Type para que el navegador establezca el boundary correcto
    delete config.headers["Content-Type"];
  }

  return config;
}, Promise.reject);

//Interceptor para errores (un solo interceptor de respuesta)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo mostrar logs si NO es un error 401
    if (error.response?.status !== 401) {
      console.error("Error en la petición:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      // Debug de la respuesta del servidor
      if (error.response?.data) {
        console.log("Respuesta del servidor:", error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const accessToken = await refreshAccessToken();
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return instance(originalRequest); // Usa la instancia de axios
//       } catch (refreshError) {
//         clearTokens();
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
