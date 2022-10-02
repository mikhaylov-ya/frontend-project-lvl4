/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAction } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const addChannel = createAction('addChannel');
const addChannels = createAction('addChannels');
const removeChannel = createAction('removeChannel');
const toggleChannel = createAction('toggleChannel');
const renameChannel = createAction('renameChannel');

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    activeChannel: null,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addChannel, channelsAdapter.addOne)
      .addCase(addChannels, channelsAdapter.setAll)
      .addCase(removeChannel, (state, action) => {
        channelsAdapter.removeOne(state, action);
        if (state.activeChannel === action.payload) state.activeChannel = 1;
      })
      .addCase(toggleChannel, (state, { payload }) => { state.activeChannel = payload; })
      .addCase(renameChannel, (state, { payload }) => {
        const target = Object.values(state.entities).find((ch) => ch.id === payload.id);
        target.name = payload.name;
      });
  },
});

export default channelsSlice.reducer;

export {
  addChannel, addChannels, removeChannel, toggleChannel, renameChannel,
};
