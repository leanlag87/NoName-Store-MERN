import axios from "axios";

// Configuración base
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

// Interceptor para errores (un solo interceptor de respuesta)
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

// Interceptor para debugging
// instance.interceptors.request.use(
//   (config) => {
//     console.log("Request:", {
//       url: config.url,
//       method: config.method,
//       data: config.data,
//       headers: config.headers,
//     });
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Interceptor para errores
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Solo mostrar logs si NO es un error 401
//     if (error.response?.status !== 401) {
//       console.error("Error en la petición:", {
//         url: error.config?.url,
//         method: error.config?.method,
//         status: error.response?.status,
//         data: error.response?.data,
//         headers: error.response?.headers,
//       });
//       if (error.response) {
//         console.log("Respuesta del servidor:", error.response.data);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Interceptor para token
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Interceptor para errores
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("Error en la petición:", {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       data: error.response?.data,
//     });
//     if (error.response) {
//       console.log("Respuesta del servidor:", error.response.data);
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
