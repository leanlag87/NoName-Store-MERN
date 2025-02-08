export const API_ENDPOINTS = {
  PRODUCTS: {
    BASE: "/products",
    REVIEWS: "/products/reviews",
  },
  CART: {
    BASE: "/cart",
    ADD: "/cart/add",
    ITEM: "/cart/item",
    SHIPPING: "/cart/shipping",
  },
  ORDERS: {
    BASE: "/orders",
    NEW: "/orders/new",
    ME: "/orders/me",
  },
  USER: {
    BASE: "/user",
    ME: "/user/me",
    PROFILE: "/user/profile",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/registerUser",
    LOGOUT: "/userController/logout",
    FORGOT_PASSWORD: "/password/forgot",
    REFRESH: "/auth/refresh",
  },
  ADMIN: {
    USERS: "/admin/users",
    USER: "/admin/user",
    PRODUCTS: "/admin/products",
    ORDERS: "/admin/orders",
  },
  PAYMENT: {
    BASE: "/payment",
    WEBHOOK: "/webhook",
    API_KEY: "/mercadopagoapikey",
  },
};
