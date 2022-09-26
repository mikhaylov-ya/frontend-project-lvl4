import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import PageNotFound from './PageNotFound.jsx';
import useAuth from '../hooks/useAuth.jsx';
import Navigation from './Navigation.jsx';
import About from './About.jsx';
import SignUpForm from './SignUpForm.jsx';
import routes from '../routes.js';

const PrivateRoute = () => {
  const auth = useAuth();
  console.dir('current user', auth.currUser);
  return !auth.currUser ? <Navigate to={routes.signup} replace /> : <Outlet />;
};

const App = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="" element={<Chat />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<SignUpForm />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
