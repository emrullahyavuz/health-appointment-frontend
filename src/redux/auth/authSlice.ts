import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  type AuthState,
  type LoginPayload,
  type RegisterPayload,
  type RegisterResponse,
  type PasswordUpdatePayload,
  type PasswordUpdateResponse,
  type User,
} from "./authTypes";
import { authAPI } from "../../lib/api";
import { toast } from "sonner";
import { setUserRole } from "../role/roleSlice";

// API Error type
interface APIError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Helper functions for localStorage
const loadFromLocalStorage = (): Partial<AuthState> | null => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken'); // Use accessToken instead of token
    
    if (user && token) {
      return {
        user: JSON.parse(user) as User,
        token,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }
  
  return null;
};

// Register User
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ name, email, password, telephone, role }, thunkAPI) => {
    try {
      const response = await authAPI.register({
        email,
        password,
        name,
        telephone,
        role,
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      const apiError = error as APIError;
      const message = apiError?.response?.data?.message || errorMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await authAPI.login({
      email,
      password,
    });
    toast.success(`Giriş Başarılı! Hoşgeldiniz "${response.user.name}"`);
    
    // Set user role in role slice
    thunkAPI.dispatch(setUserRole(response.user.role));
    
    return response.user;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    const apiError = error as APIError;
    const message = apiError?.response?.data?.message || errorMessage;
    return thunkAPI.rejectWithValue(message);
  }
});

// Password Update
export const passwordUpdate = createAsyncThunk<
  PasswordUpdateResponse,
  PasswordUpdatePayload,
  { rejectValue: string }
>(
  "auth/passwordUpdate",
  async ({ oldPassword, newPassword, confirmPassword }, thunkAPI) => {
    try {
      const response = await authAPI.updatePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Password update failed";
      const apiError = error as APIError;
      const message = apiError?.response?.data?.message || errorMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await authAPI.logout();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      const apiError = error as APIError;
      const message = apiError?.response?.data?.message || errorMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: AuthState = (() => {
  const savedAuth = loadFromLocalStorage();
  return {
    user: savedAuth?.user || null,
    token: savedAuth?.token || null,
    loading: false,
    error: null,
    isAuthenticated: savedAuth?.isAuthenticated || false,
  };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
          // Save user data to localStorage
          localStorage.setItem('user', JSON.stringify(action.payload));
          // Token is already saved in authAPI.login
          const token = localStorage.getItem('accessToken');
          if (token) {
            state.token = token;
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(
        registerUser.fulfilled,
        (state) => {
          state.loading = false;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(
        passwordUpdate.fulfilled,
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(passwordUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password update failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        // Clear localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
        // Even if logout fails, clear local data
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
