import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import passForgotResetReducer from './slices/passForgotResetSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    passwordForgotReset: passForgotResetReducer,
  },
});
