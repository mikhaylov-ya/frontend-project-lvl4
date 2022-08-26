import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import init from './init';

const app = init();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
