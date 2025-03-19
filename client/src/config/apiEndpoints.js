//Configuracion para las rutas de la API
export const API_ENDPOINTS = {
  PRODUCTS: {
    BASE: "/products",
    REVIEWS: "/products",
  },
  CART: {
    BASE: "/cart",
    ADD: "/cart",
    ITEM: "/cart",
    SHIPPING: "/cart/shipping",
  },
  ORDERS: {
    BASE: "/order",
    NEW: "/order/new",
    ME: "/orders/me",
  },
  USER: {
    BASE: "/user",
    ME: "/user/me",
    PROFILE: "/profile",
  },
  AUTH: {
    LOGIN: "/authController/login",
    REGISTER: "/authController/registerUser",
    LOGOUT: "/userController/logout",
    FORGOT_PASSWORD: "/password/forgot",
    REFRESH: "/auth/refresh",
  },
  ADMIN: {
    USERS: "/admin/users",
    USER: "/admin/user",
    PRODUCTS: "/products",
    ORDERS: "/admin/orders",
  },
  PAYMENT: {
    BASE: "/payment",
    WEBHOOK: "/webhook",
    API_KEY: "/mercadopagoapikey",
  },
};
