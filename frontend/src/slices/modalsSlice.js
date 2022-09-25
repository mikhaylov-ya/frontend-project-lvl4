/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const closeModal = createAction('closeModal');
const openModal = createAction('openModal');

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpened: false,
    type: null,
    channelId: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(openModal, (state, { payload }) => {
        console.log({ payload });
        const { type, channelId } = payload;
        console.log(type);
        state.isOpened = true;
        state.type = type;
        state.channelId = channelId ?? null;
      })
      .addCase(closeModal, (state) => {
        state.isOpened = false;
        state.type = null;
        state.channelId = null;
      });
  },
});

export default modalsSlice.reducer;

export { closeModal, openModal };
