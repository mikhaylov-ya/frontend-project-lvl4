import { useContext } from 'react';
import { SocketContext } from '../components/SocketProvider';

const useSocket = () => useContext(SocketContext);

export default useSocket;
