import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config";
import { getAuthConfig } from "../../utils/authHeaders";
import { API_ENDPOINTS } from "../../config/apiEndpoints";

//Carrito en el Frontend (usando el backend)

//Estado inicial
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  success: false, //para actualizar o eliminar productos del carrito
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartErrors: (state) => {
      state.error = null;
    },
    resetCartSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpiar errores previos
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cartItems = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cartItems = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveShippingInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveShippingInfo.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveShippingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/pending");
      },
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
  },
});

// Agregar al carrito
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.post(
        API_ENDPOINTS.CART.ADD,
        { id, quantity },
        config
      );
      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al agregar al carrito"
      );
    }
  }
);

// Obtener carrito
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.get(API_ENDPOINTS.CART.BASE, config);
      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener el carrito"
      );
    }
  }
);

// Eliminar item del carrito
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.delete(
        `${API_ENDPOINTS.CART.ITEM}/${productId}`,
        config
      );
      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar del carrito"
      );
    }
  }
);

// Actualizar carrito
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cartItems, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        API_ENDPOINTS.CART.BASE,
        { cartItems },
        config
      );
      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al actualizar el carrito"
      );
    }
  }
);

// Guardar información de envío
export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (shippingInfo, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        API_ENDPOINTS.CART.SHIPPING,
        shippingInfo,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al guardar información de envío"
      );
    }
  }
);

//exportamos las acciones
export const { clearCartErrors, resetCartSuccess } = cartSlice.actions;

//Exportar el reducer
export default cartSlice.reducer;
