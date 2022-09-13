import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.min.css';
import { io } from 'socket.io-client';
import init from './init';
import './index.css';

(async () => {
  const socket = io();
  const app = await init(socket);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(app);
})();
