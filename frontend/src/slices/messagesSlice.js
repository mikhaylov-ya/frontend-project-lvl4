/* eslint-disable no-param-reassign */
// eslint-disable-next-line object-curly-newline
import { createSlice, createEntityAdapter, createAction, current } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const addMessage = createAction('addMessage');
const addMessages = createAction('addMessages');

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(addMessage, messagesAdapter.addOne)
      .addCase(addMessages, messagesAdapter.setAll)
      .addCase(removeChannel, (state, { payload }) => {
        console.log('entities', current(state.entities));
        console.log('payload', payload);
        const filtered = Object.values(state.entities)
          .filter((msg) => msg.from !== payload.id);
        messagesAdapter.setAll(state, filtered);
      });
  },
});

export default messagesSlice.reducer;

export { addMessage, addMessages };
