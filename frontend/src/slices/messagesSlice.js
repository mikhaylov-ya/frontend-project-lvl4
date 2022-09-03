/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload }) => { state.push(payload); },
    addMessages: (state, { payload }) => {
      state.concat(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        state = state.filter((msg) => msg.from !== payload.id);
      });
  },
});

export default messagesSlice.reducer;

export const { actions } = messagesSlice;
