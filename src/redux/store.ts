import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import modalReducer from './modal/ModalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

// RootState ve AppDispatch tipleri
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
