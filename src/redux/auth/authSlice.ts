import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type AuthState, type LoginPayload, type LoginResponse, type RegisterPayload, type RegisterResponse } from './authTypes';
import { authAPI } from '../../lib/api';

export const registerUser = createAsyncThunk<RegisterResponse, RegisterPayload, { rejectValue: string }>(
  'auth/registerUser',
  async ({  name, email, password, telephone, role }, thunkAPI) => {
    try {
      const response = await authAPI.register({
        email,
        password,
        name,
        telephone,
        role,
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Async thunk
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authAPI.login({
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.isAuthenticated = true;
       
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.loading = false;
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
