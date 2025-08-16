import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import passForgotResetReducer from './slices/passForgotResetSlice';
import messageReducer from './slices/messageSlice';
import addTimelineReducer from './slices/addTimelineSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    passwordForgotReset: passForgotResetReducer,
    message: messageReducer,
    timeline: addTimelineReducer,
  },
});
