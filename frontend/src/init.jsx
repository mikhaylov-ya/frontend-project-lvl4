import { Provider } from 'react-redux';
import React from 'react';
import { Provider as Rollbar, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import * as filter from 'leo-profanity';
import { initReactI18next } from 'react-i18next';
import AuthProvider from './components/AuthProvider';
import SocketProvider from './components/SocketProvider';
import App from './components/App';
import store from './slices/index.js';
import resources from './locales/index.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice';

const init = async (socket) => {
  const i18nInst = i18n.createInstance();
  await i18nInst
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    environment: 'production',
  };

  filter.loadDictionary('ru');
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
  });

  return (
    <Rollbar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </Rollbar>
  );
};

export default init;
