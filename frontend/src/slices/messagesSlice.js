/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload }) => { state.push(payload); },
    addMessages: (state, { payload }) => {
      state.concat(payload);
    },
  },
});

export default messagesSlice.reducer;

export const { actions } = messagesSlice;
