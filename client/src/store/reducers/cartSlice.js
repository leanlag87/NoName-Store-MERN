import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config"; // Importamos la instancia de axios
//import { getAuthConfig } from "../../utils/authHeaders";
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
        if (action.payload && action.payload.cart) {
          if (Array.isArray(action.payload.cart.cartItems)) {
            //state.cartItems = action.payload.cart.cartItems;
            // Crea una nueva copia del array cartItems
            console.log(
              "Datos recibidos del servidor:",
              JSON.stringify(action.payload.cart.cartItems, null, 2)
            );
            state.cartItems = [...action.payload.cart.cartItems];
          } else {
            console.error(
              "Error: Datos de carrito inválidos recibidos",
              action.payload
            );
            state.error = "Error al agregar al carrito: Datos inválidos";
          }
        } else {
          console.error(
            "Error: Datos de carrito inválidos recibidos",
            action.payload
          );
          state.error = "Error al agregar al carrito: Datos inválidos";
        }
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
        if (action.payload && action.payload.cart) {
          if (Array.isArray(action.payload.cart.cartItems)) {
            //state.cartItems = action.payload.cart.cartItems;
            state.cartItems = [...action.payload.cart.cartItems];
          } else {
            console.error(
              "Error: Datos de carrito inválidos recibidos",
              action.payload
            );
            state.error = "Error al cargar el carrito: Datos inválidos";
          }
        } else {
          console.error(
            "Error: Datos de carrito inválidos recibidos",
            action.payload
          );
          state.error = "Error al cargar el carrito: Datos inválidos";
        }
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
        if (
          action.payload &&
          action.payload.cart &&
          Array.isArray(action.payload.cart.cartItems)
        ) {
          //state.cartItems = action.payload.cart.cartItems;
          state.cartItems = [...action.payload.cart.cartItems];
        } else {
          console.error(
            "Error: Datos de carrito inválidos recibidos",
            action.payload
          );
          state.error = "Error al cargar el carrito: Datos inválidos";
        }
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
        if (action.payload && action.payload.cart) {
          if (Array.isArray(action.payload.cart.cartItems)) {
            //state.cartItems = action.payload.cart.cartItems;
            state.cartItems = [...action.payload.cart.cartItems];
          } else {
            console.error(
              "Error: Datos de carrito inválidos recibidos",
              action.payload
            );
            state.error = "Error al actualizar el carrito: Datos inválidos";
          }
        } else {
          console.error(
            "Error: Datos de carrito inválidos recibidos",
            action.payload
          );
          state.error = "Error al actualizar el carrito: Datos inválidos";
        }
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
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      console.log("Añadiendo al carrito:", { id, quantity });

      // Verificar si el token existe en localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue(
          "Debes iniciar sesión para agregar productos al carrito"
        );
      }

      // Asegurarse que el ID sea una cadena válida
      const productId = typeof id === "string" ? id : String(id);

      const { data } = await axios.post(
        API_ENDPOINTS.CART.ADD,
        //{ productId: id, quantity } //Como esta en el controlador
        { productId, quantity }
      );
      return data;
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
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.CART.BASE);
      return data;
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
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_ENDPOINTS.CART.ITEM}/${productId}`
      );
      return data;
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
  async (cartItems, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(API_ENDPOINTS.CART.BASE, { cartItems });
      return data;
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
  async (shippingInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        API_ENDPOINTS.CART.SHIPPING,
        shippingInfo
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
