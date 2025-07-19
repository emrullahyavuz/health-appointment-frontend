import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = 'admin' | 'patient' | 'doctor';

interface RoleState {
  currentUserRole: UserRole | null;
  loading: boolean;
  error: string | null;
}

// Helper function to load role from localStorage
const loadRoleFromLocalStorage = (): UserRole | null => {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.role || null;
    }
  } catch (error) {
    console.error('Error loading role from localStorage:', error);
  }
  return null;
};

const initialState: RoleState = {
  currentUserRole: loadRoleFromLocalStorage(),
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.currentUserRole = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUserRole: (state) => {
      state.currentUserRole = null;
      state.loading = false;
      state.error = null;
    },
    setRoleLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRoleError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUserRole, clearUserRole, setRoleLoading, setRoleError } = roleSlice.actions;
export default roleSlice.reducer; 