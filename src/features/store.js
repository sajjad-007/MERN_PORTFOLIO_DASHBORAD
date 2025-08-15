import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import passForgotResetReducer from './slices/passForgotResetSlice';
import messageReducer from './slices/messageSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    passwordForgotReset: passForgotResetReducer,
    message: messageReducer,
    // message: messageSlice,
  },
});
