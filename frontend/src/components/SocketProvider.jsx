import { createContext, React } from 'react';
import { io } from 'socket.io-client';
import { toggleChannel } from '../slices/channelsSlice';
import store from '../slices/index.js';

const socket = io();

export const SocketContext = createContext(socket);

const SocketProvider = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const events = {
    newMessage: (...args) => socket.volatile.emit('newMessage', ...args),
    newChannel: (name) => {
      socket.emit('newChannel', name, (res) => {
        const { status, data: { id } } = res;
        if (status === 'ok') store.dispatch(toggleChannel(id));
      });
    },
    removeChannel: (...args) => socket.volatile.emit('removeChannel', ...args),
    renameChannel: (...args) => socket.volatile.emit('renameChannel', ...args),
  };

  return (
    <SocketContext.Provider value={events}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
