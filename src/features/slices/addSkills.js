import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const addSkillSlice = createSlice({
  name: 'Add Skill',
  initialState: {
    loading: false,
    error: null,
    message: null,
    addSkill: [],
  },
  reducers: {
    getAllSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.addSkill = [];
    },
    getAllSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.addSkill = action.payload;
    },
    getAllSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.addSkill = state.addSkill;
    },
    addSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetAllAddSkill(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.addSkill = state.addSkill;
    },
    clearAllError(state, action) {
      state.error = null;
    },
  },
});

// GET ALL SKILLS
export const getAllSkill = () => async dispatch => {
  dispatch(addSkillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/addSkill/getall',
      { withCredentials: true }
    );
    dispatch(addSkillSlice.actions.getAllSkillSuccess(data.allSkill));
  } catch (error) {
    dispatch(
      addSkillSlice.actions.getAllSkillFailed(error.response.data.message)
    );
  }
};
// CREATE A SKILL
export const addSkill = myData => async dispatch => {
  dispatch(addSkillSlice.actions.addSkillRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/addSkill/create',
      myData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(addSkillSlice.actions.addSkillSuccess(data.message));
  } catch (error) {
    dispatch(addSkillSlice.actions.addSkillFailed(error.response.data.message));
  }
};

//delete a skill
export const deleteATimeline = id => async dispatch => {
  dispatch(addSkillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/addSkill/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(addSkillSlice.actions.deleteSkillSuccess(data.message));
    dispatch(addSkillSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      addTimelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

//reset my skill
export const resetAllAddSkill = () => async dispatch => {
  dispatch(addSkillSlice.actions.resetAllAddSkill());
};
export const clearAllSkillSError = () => async dispatch => {
  dispatch(addSkillSlice.actions.clearAllError());
};

export default addSkillSlice.reducer;
