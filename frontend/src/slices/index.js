import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice.js';
import messages from './messagesSlice.js';
import modals from './modalsSlice.js';

export default configureStore({
  reducer: {
    channels,
    messages,
    modals,
  },
});
