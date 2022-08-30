/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload }) => {
      const { message } = payload;
      state.push(message);
    },
    addMessages: (state, { payload }) => {
      state = payload;
    },
  },
});

export default messagesSlice.reducer;

export const { actions } = messagesSlice;
