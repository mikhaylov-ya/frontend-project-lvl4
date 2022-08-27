/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, { payload }) => {
      const { message } = payload;
      state.messages.push(message);
    },
    addMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
});

export default messagesSlice.reducer;

export const { actions } = messagesSlice;
