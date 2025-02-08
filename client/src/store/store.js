import { configureStore } from "@reduxjs/toolkit";
//import { thunk } from "redux-thunk";

// Importaremos los reducers
import userReducer from "./reducers/userSlice";
import cartReducer from "./reducers/cartSlice";
import productReducer from "./reducers/productSlice";
import orderReducer from "./reducers/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
    order: orderReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
