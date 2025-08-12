import { createSlice } from '@reduxjs/toolkit';
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
    },
    //logged in user data get
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
    },
    //logout in user data get
    logoutRequest(state, action) {
      (state.loading = true),
        (state.message = null),
        (state.error = null);
    },
    logoutSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload),
        (state.user = {}),
        (state.isAuthenticated = false),
        (state.error = null);
    },
    logoutFailed(state, action) {
      (state.loading = false),
        (state.message = null),
        (state.isAuthenticated = false),
        (state.error = action.payload);
    },
    // manage skill
    manageSkillRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = null);
      state.message = null;
    },
    manageSkillSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.error = null);
      state.message = action.payload;
    },
    manageSkillFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.error = action.payload);
      state.message = null;
    },
    //manage time line
    manageTimelineRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = null);
      state.message = null;
    },
    manageTimelineSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.error = null);
      state.message = action.payload;
    },
    manageTimelineFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.error = action.payload);
      state.message = null;
    },
    //manage projects
    manageProjectsRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = null);
      state.message = null;
    },
    manageProjectsSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.error = null);
      state.message = action.payload;
    },
    manageProjectsFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.error = action.payload);
      state.message = null;
    },
    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
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
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
    console.log('success', data.user);
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message;
    dispatch(userSlice.actions.loginFailed(errorMessage));
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
    dispatch(
      userSlice.actions.getUserFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from login slice', error);
  }
};
//log out route
export const logoutUser = () => async dispatch => {
  dispatch(userSlice.actions.logoutRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/user/logout',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.logoutFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from logout slice', error);
  }
};
export const manageSkill = () => async dispatch => {
  dispatch(userSlice.actions.manageSkillRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/addSkill/create',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.manageSkillSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.manageSkillFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from manage skill', error);
  }
};
export const manageTimeline = () => async dispatch => {
  dispatch(userSlice.actions.manageTimelineRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/timeline/create',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.manageTimelineSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.manageTimelineFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from manage skill', error);
  }
};
export const manageProject = () => async dispatch => {
  dispatch(userSlice.actions.manageProjectsRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/project/create',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.manageProjectsSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.manageProjectsFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from manage skill', error);
  }
};
export const clearallErrors = () => async dispatch => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
