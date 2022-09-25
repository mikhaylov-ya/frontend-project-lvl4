import { useContext } from 'react';
import { SocketContext } from '../components/SocketProvider';

const useApi = () => useContext(SocketContext);

export default useApi;
