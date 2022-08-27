import { createContext } from 'react';
import { io } from 'socket.io-client';

const socket = io();

export const SocketContext = createContext(socket);

const SocketProvider = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const events = {
    newMessage: (...args) => socket.volatile.emit('newMessage', ...args),
    newChannel: (...args) => socket.volatile.emit('newChannel', ...args),
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
