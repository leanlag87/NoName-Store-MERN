// /**
//  * Configuración de headers para peticiones HTTP
//  * @param {string} token - Token JWT opcional
//  * @param {string} contentType - Tipo de contenido del header
//  * @returns {Object} Configuración de headers
//  */
// export const getAuthConfig = (token, contentType = "application/json") => ({
//   headers: {
//     "Content-Type": contentType,
//     ...(token && { Authorization: `Bearer ${token}` }),
//   },
//   withCredentials: true, // Importante para cookies
// });

// /**
//  * Configuración específica para FormData (subida de archivos)
//  * @param {string} token - Token JWT opcional
//  * @returns {Object} Configuración para multipart/form-data
//  */
// export const getMultipartConfig = (token) => ({
//   headers: {
//     ...(token && { Authorization: `Bearer ${token}` }),
//   },
//   withCredentials: true,
// });
