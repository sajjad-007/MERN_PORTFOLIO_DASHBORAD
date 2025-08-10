import { createSlice, Tuple } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdate: false,
  },
  reducers: {
    loginRequest(state, action) {
      (state.loading = true),
        (state.user = {}),
        (state.isAuthenticated = false),
        (state.error = null);
    },
    loginSuccess(state, action) {
      (state.loading = false),
        (state.user = action.payload),
        (state.isAuthenticated = true),
        (state.error = null);
    },
    loginFailed(state, action) {
      (state.loading = false),
        (state.user = {}),
        (state.isAuthenticated = false),
        (state.error = action.payload);
        (state.message = action.payload);
    },
    getUserRequest(state, action) {
      (state.loading = true),
        (state.user = {}),
        (state.isAuthenticated = false),
        (state.error = null);
    },
    getUserSuccess(state, action) {
      (state.loading = false),
        (state.user = action.payload),
        (state.isAuthenticated = true),
        (state.error = null);
    },
    getUserFailed(state, action) {
      (state.loading = false),
        (state.user = {}),
        (state.isAuthenticated = false),
        (state.error = action.payload);
        state.message = action.payload;
    },
    //clear all errors
    clearAllErrors(state, action) {
      (state.error = null), (state = state.user);
    },
  },
});

export const login = (email, password) => async dispatch => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/user/login',
      { email, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch(userSlice.actions.loginSuccess(data?.user));
    dispatch(userSlice.actions.clearAllErrors());
    console.log('success', data.user);
  } catch (error) {
    dispatch(userSlice.actions.getUserFailed(error.response.statusText));
    console.error('error from login slice', error);
  }
};
export const getLoginUser = () => async dispatch => {
  dispatch(userSlice.actions.getUserRequest());
  try {
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/user/getuser',
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.getUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error('error from login slice', error);
  }
};
export const clearallErrors = () => async dispatch => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
