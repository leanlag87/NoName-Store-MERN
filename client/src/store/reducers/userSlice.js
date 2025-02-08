import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config";
import { API_ENDPOINTS } from "../../config/apiEndpoints";
import { getAuthConfig, getMultipartConfig } from "../../utils/authHeaders";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  users: [], // Para lista de usuarios
  message: null, // Para mensajes de éxito
  success: false, // Flag para indicar éxito en operaciones
  isUpdated: false, // Flag para indicar si el perfil se actualizó
  isDeleted: false, // Flag para indicar si el usuario fue eliminado
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUpdate: (state) => {
      state.isUpdated = false; // Para resetear después de una actualización
    },
    resetDelete: (state) => {
      state.isDeleted = false; // Para resetear después de una eliminación
    },
    resetSuccess: (state) => {
      state.success = false; // Para resetear la bandera de éxito
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpia errores previos
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpia errores previos
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // Mensaje de éxito
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload; // Actualiza la info del usuario
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getUserAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.user = action.payload;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = true;
        state.message = action.payload; // Mensaje de confirmación
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Registrar usuario
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const config = getMultipartConfig();
      const { data } = await axios.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData,
        config
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Iniciar sesión
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password },
        { withCredentials: true } // Importante para cookies
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Cargar usuario
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Intentando cargar usuario...");
      const { data } = await axios.get(API_ENDPOINTS.USER.ME);
      console.log("Respuesta del servidor:", data);
      return data.user;
    } catch (error) {
      console.error("Error completo:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error al cargar usuario"
      );
    }
  }
);

// Cerrar sesión
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem("cartItems");
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Olvidó su contraseña
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      const { data } = await axios.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email },
        config
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Resetear contraseña
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      const { data } = await axios.put(
        `${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}/reset/${token}`,
        { password },
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Actualizar contraseña
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwords, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.USER}/password/update`,
        passwords,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Actualizar perfil
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getMultipartConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.USER}/profile/update`,
        userData,
        config
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Obtener un usuario (Admin)
export const getUserAdmin = createAsyncThunk(
  "user/getUserAdmin",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.get(
        `${API_ENDPOINTS.USER}/admin/user/${id}`,
        config
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Obtener todos los usuarios (Admin)
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.get(
        `${API_ENDPOINTS.USER}/admin/users`,
        config
      );
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Actualizar rol de usuario (Admin)
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({ id, role }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.USER}/admin/user/${id}/role`,
        { role },
        config
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Eliminar usuario (Admin)
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const config = getAuthConfig(user.token);
      const { data } = await axios.delete(
        `${API_ENDPOINTS.USER}/admin/user/${id}`,
        config
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { clearErrors, resetUpdate, resetDelete, resetSuccess } =
  userSlice.actions;

export default userSlice.reducer;
