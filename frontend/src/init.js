import { Provider } from 'react-redux';
// import { io } from 'socket.io-client';
import AuthProvider from './components/AuthProvider';
import App from './components/App';
import store from './slices/index.js';

const init = () => (
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);

export default init;
