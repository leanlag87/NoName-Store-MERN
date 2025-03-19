import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config"; //instancia de axios
import { API_ENDPOINTS } from "../../config/apiEndpoints";
import { clearToken } from "../../utils/auth";
import { getCart } from "./cartSlice";

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
  authInitialized: false, // Flag para indicar si la autenticación está inicializada
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
    resetDelete: (state) => {
      state.isDeleted = false;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    setAuthInitialized: (state) => {
      state.authInitialized = true;
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
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Usa la información del usuario del payload
        state.success = true;
        if (action.payload.access) {
          localStorage.setItem("token", action.payload.access);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.authInitialized = true; // Marca la inicialización como completa
        if (action.payload) {
          // Solo actualizar si hay payload
          state.user = { ...action.payload }; // Actualiza la info del usuario
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.authInitialized = true; // Marca la inicialización como completa, incluso si falla
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
      //const config = getMultipartConfig();
      const { data } = await axios.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
        //config
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.LOGIN, userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (!data.access) {
        throw new Error("No se recibió token de acceso");
      }

      // Guardar token
      localStorage.setItem("token", data.access);

      //Cargar el carrito despues del login
      dispatch(getCart());

      return {
        access: data.access, // devuelve el token
        user: data.user, // devuelve la info del usuario
      };
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.msg || error.message || "Error al iniciar sesión"
      );
    }
  }
);

// Cargar usuario
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.USER.ME);
      return data.user;
    } catch (error) {
      // Si es error 401, retornamos silenciosamente null
      if (error.response?.status === 401) {
        // Si loadUser falla con 401, desloguea al usuario
        dispatch(logoutUser());
        return null;
      }
      // Para otros errores, sí lanzamos el error
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
      localStorage.removeItem("token");
      localStorage.removeItem("cartItems");
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      clearToken(); // Elimina los tokens del localStorage
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Olvidó su contraseña
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      //const config = getAuthConfig();
      const { data } = await axios.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
        //config
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
      //const config = getAuthConfig();
      const { data } = await axios.put(
        `${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}/reset/${token}`,
        { password }
        //config
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
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.USER}/password/update`, //Esta es la ruta para cambiar "/api/v1/password/update" verificar si esta bien la ruta actual
        passwords
        //config
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
  async (userData, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getMultipartConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.USER.PROFILE}/update`,
        userData
        //config
      );
      // return data.user;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Actualizar usuario completo (Admin)
export const updateUserAdmin = createAsyncThunk(
  "user/updateUserAdmin",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_ENDPOINTS.ADMIN}/user/${id}`,
        userData
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
  async (id, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.get(
        `${API_ENDPOINTS.ADMIN}/get/${id}`
        //config
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Obtener todos los usuarios (Admin) por el momento no es solo para el admin
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.get(`${API_ENDPOINTS.ADMIN.USERS}`);
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Actualizar rol de usuario (Admin)
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.put(
        `${API_ENDPOINTS.USER}/admin/users/${id}/role`,
        { role }
        //config
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
  async (id, { rejectWithValue }) => {
    try {
      // const { user } = getState().user;
      // const config = getAuthConfig(user.token);
      const { data } = await axios.delete(
        `${API_ENDPOINTS.USER}/admin/user/${id}`
        //config
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const {
  clearErrors,
  resetUpdate,
  resetDelete,
  resetSuccess,
  setAuthInitialized,
} = userSlice.actions;

export default userSlice.reducer;
