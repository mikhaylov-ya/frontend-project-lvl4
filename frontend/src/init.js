import { Provider } from 'react-redux';
import AuthProvider from './components/AuthProvider';
import SocketProvider from './components/SocketProvider';
import App from './components/App';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice';

const init = (socket) => {
  socket.on('newMessage', (payload) => {
    console.log('input passed to socket: ', payload);
    store.dispatch(messagesActions.addMessage({ message: payload }));
  });

  socket.on('newChannel', (chnl) => {
    store.dispatch(channelsActions.addChannel(chnl));
  });

  return (
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
