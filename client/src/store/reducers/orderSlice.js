import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config"; // Importamos la instancia de axios
//import { getAuthConfig } from "../../utils/authHeaders";
import { API_ENDPOINTS } from "../../config/apiEndpoints";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  success: false,
  isUpdated: false,
  isDeleted: false,
  message: null, // Para mensajes de éxito o error
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
    resetDelete: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.loading = false;
        state.isDeleted = true;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Crear nueva orden
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.post(
        `${API_ENDPOINTS.ORDERS.NEW}`,
        orderData
        //config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al crear la orden"
      );
    }
  }
);

// Obtener mis órdenes
export const myOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      //obtener el token del localstorage
      const token = localStorage.getItem("token");

      //verificar que el token exista
      if (!token) {
        return rejectWithValue("No se encontró el token de acceso");
      }

      //const config = getAuthConfig(token);
      const { data } = await axios.get(API_ENDPOINTS.ORDERS.ME);
      return data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener las órdenes"
      );
    }
  }
);

// Obtener detalles de una orden
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.get(
        `${API_ENDPOINTS.ORDERS.BASE}/${id}`
        //config
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener detalles de la orden"
      );
    }
  }
);

// Obtener todas las órdenes (Admin)
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.get(API_ENDPOINTS.ADMIN.ORDERS);
      return data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener todas las órdenes"
      );
    }
  }
);

// Actualizar orden (Admin)
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, orderData }, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.ADMIN.ORDERS}/${id}`,
        orderData
        //config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al actualizar la orden"
      );
    }
  }
);

// Eliminar orden (Admin)
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.delete(
        `${API_ENDPOINTS.ADMIN.ORDERS}/${id}`
        //config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar la orden"
      );
    }
  }
);

export const { clearErrors, resetSuccess, resetUpdate, resetDelete } =
  orderSlice.actions;

export default orderSlice.reducer;
