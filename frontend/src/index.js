import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { io } from 'socket.io-client';
import init from './init';

(async () => {
  const socket = io();
  const app = await init(socket);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(app);
})();
