import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { io } from 'socket.io-client';
import init from './init';

const socket = io();

const app = init(socket);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
