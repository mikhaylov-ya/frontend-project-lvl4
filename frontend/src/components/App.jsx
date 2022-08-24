import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthProvider from './AuthProvider.jsx';
import useAuth from '../hooks/useAuth.jsx';
import Navigation from './Navigation.jsx';
import About from './About.jsx';

const PrivateRoute = () => {
  const auth = useAuth();
  console.dir('current user', auth.currUser);
  return !auth.currUser ? <Navigate to="login" replace /> : <Outlet />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Box style={{ width: '75vh', margin: 'auto' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="" element={<Chat />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
