import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const projectsSlice = createSlice({
  name: 'PROJECTS',
  initialState: {
    loading: false,
    error: null,
    message: null,
    projects: [],
    singleProject: [],
  },
  reducers: {
    // GET ALL MY PROJECTS START
    getAllProjectsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.projects = [];
    },
    getAllProjectsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.projects = action.payload;
    },
    getAllProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.projects = state.projects;
    },
    // GET ALL MY PROJECTS END
    addPorjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addPorjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addPorjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deletePorjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletePorjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deletePorjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetAllProjects(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.projects = state.projects;
    },
    clearAllError(state, action) {
      state.error = null;
    },
  },
});

// GET ALL SKILLS
export const getAllProject = () => async dispatch => {
  dispatch(projectsSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/project/getall',
      { withCredentials: true }
    );
    dispatch(
      projectsSlice.actions.getAllProjectsSuccess(data.searchAllProject)
    );
  } catch (error) {
    dispatch(
      projectsSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};
// CREATE A SKILL
export const addNewProject = myData => async dispatch => {
  dispatch(projectsSlice.actions.addPorjectRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/project/create',
      myData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(projectsSlice.actions.addPorjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectsSlice.actions.addPorjectFailed(error.response.data.message)
    );
  }
};

//delete a skill
export const deleteProject = id => async dispatch => {
  dispatch(projectsSlice.actions.deletePorjectRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectsSlice.actions.deletePorjectSuccess(data.message));
    dispatch(projectsSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      projectsSlice.actions.deletePorjectFailed(error.response.data.message)
    );
  }
};

//reset my skill
export const resetAllProjects = () => dispatch => {
  dispatch(projectsSlice.actions.resetAllProjects());
};
export const clearAllProjectError = () => dispatch => {
  dispatch(projectsSlice.actions.clearAllError());
};

export default projectsSlice.reducer;
