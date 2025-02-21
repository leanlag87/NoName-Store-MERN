import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config"; // Importamos la instancia de axios
import { getAuthConfig, getMultipartConfig } from "../../utils/authHeaders";
import { API_ENDPOINTS } from "../../config/apiEndpoints";

const initialState = {
  product: null,
  products: [],
  loading: false,
  error: null,
  success: false,
  isUpdated: false,
  isDeleted: false,
  reviews: [],
};

// Obtener todos los productos
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.PRODUCTS.BASE);
      console.log("Data recibida de la API:", data); // Inspecciono la respuesta
      return data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener productos"
      );
    }
  }
);

// Obtener detalles de un producto
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Error al obtener detalles del producto"
      );
    }
  }
);

// Crear nuevo producto (Admin) No es solo para el admin por el momento
export const newProduct = createAsyncThunk(
  "product/newProduct",
  async (productData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getMultipartConfig(user.token);
      const { data } = await axios.post(
        API_ENDPOINTS.ADMIN.PRODUCTS,
        productData,
        config
      );
      return data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al crear producto"
      );
    }
  }
);

// Actualizar producto (Admin) No es solo para el admin por el momento
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getMultipartConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.ADMIN.PRODUCTS}/${id}`,
        productData,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al actualizar producto"
      );
    }
  }
);

// Eliminar producto (Admin) No es solo para el admin por el momento
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.delete(
        `${API_ENDPOINTS.ADMIN.PRODUCTS}/${id}`,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar producto"
      );
    }
  }
);

// Crear/Actualizar review
export const newReview = createAsyncThunk(
  "product/newReview",
  async (id, reviewData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.PRODUCTS.REVIEWS}/${id}/reviews`,
        reviewData,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al crear/actualizar review"
      );
    }
  }
);

// Obtener todas las reviews de un producto
export const getProductReviews = createAsyncThunk(
  "product/getProductReviews",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.get(
        `${API_ENDPOINTS.PRODUCTS.BASE}/${id}/reviews`,
        config
      );
      return data.reviews;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener reviews"
      );
    }
  }
);

// Eliminar review
export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async ({ productId, reviewId }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.delete(
        `${API_ENDPOINTS.PRODUCTS.BASE}/${productId}/reviews/${reviewId}`,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar review"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
    resetNewProduct: (state) => {
      state.success = false;
    },
    resetUpdateProduct: (state) => {
      state.isUpdated = false;
    },
    resetDeleteProduct: (state) => {
      state.isDeleted = false;
    },
    resetNewReview: (state) => {
      state.success = false;
    },
    resetDeleteReview: (state) => {
      state.isDeleted = false;
    },
    resetProductDetails: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Product Details
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // New Product
      .addCase(newProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(newProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.isDeleted = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // New Review
      .addCase(newReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(newReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Reviews
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
        state.isDeleted = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearErrors,
  resetNewProduct,
  resetUpdateProduct,
  resetDeleteProduct,
  resetNewReview,
  resetDeleteReview,
  resetProductDetails,
} = productSlice.actions;

export default productSlice.reducer;
