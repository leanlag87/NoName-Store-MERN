export const getAuthConfig = (token, contentType = "application/json") => {
  const config = {
    headers: {
      "Content-Type": contentType,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  return config;
};

export const getMultipartConfig = (token) =>
  getAuthConfig(token, "multipart/form-data");
