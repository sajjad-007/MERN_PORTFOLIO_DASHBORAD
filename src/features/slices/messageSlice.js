import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.messages = [];
    },
    getAllMessageSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
      state.error = null;
    },
    getAllMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.messages = state.messages;
    },
    resetAllMessage(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = state.messages;
      state.message = null;
    },
    clearMessageAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessage = () => async dispatch => {
  dispatch(messageSlice.actions.getAllMessageRequest());
  try {
    const { data } = await axios.get('http://localhost:4000/api/v1/send', {
      withCredentials: true,
    });
    console.log(data);
    dispatch(messageSlice.actions.getAllMessageSuccess(data.myMessages));
    
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessageFailed(error.response.data.message)
    );
    console.log(error);
  }
};
export const resetAllMessage = () => dispatch => {
  dispatch(resetAllMessage());
};
export const clearAllMessages = () => dispatch => {
  dispatch(clearAllMessages());
};

export default messageSlice.reducer;
