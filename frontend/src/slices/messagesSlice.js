// eslint-disable-next-line object-curly-newline
import { createSlice, createEntityAdapter, createAction } from '@reduxjs/toolkit';
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
        const filtered = Object.values(state.entities)
          .filter((msg) => msg.from !== payload);
        messagesAdapter.setAll(state, filtered);
      });
  },
});

export default messagesSlice.reducer;

export { addMessage, addMessages };
