import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { messages: [] },
  reducers: {
    addMessages: (state, { payload }) => { state.messages.concat(payload); },
    addMessage: (state, { payload }) => { state.messages.concat(payload); },
    removeMessage: (state, { payload }) => { state.messages.filter(({ id }) => id !== payload); },
  },
});

export default channelsSlice.reducer;

export const { actions } = channelsSlice;
