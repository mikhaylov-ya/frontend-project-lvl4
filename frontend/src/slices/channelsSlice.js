/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { entities: [], activeChannel: null },
  reducers: {
    addChannel: (state, { payload }) => { state.entities.push(payload); },
    addChannels: (state, { payload }) => { state.entities = payload; },
    removeChannel: (state, { payload }) => {
      state.entities = state.entities.filter((ch) => ch.id !== payload.id);
    },
    toggleChannel: (state, { payload }) => { state.activeChannel = payload; },
    renameChannel: (state, { payload }) => {
      const target = state.entities.find((ch) => ch.id === payload.id);
      target.name = payload.name;
    },
  },
});

export default channelsSlice.reducer;

export const { actions } = channelsSlice;
