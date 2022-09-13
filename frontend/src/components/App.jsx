import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import PageNotFound from './PageNotFound.jsx';
import useAuth from '../hooks/useAuth.jsx';
import Navigation from './Navigation.jsx';
import About from './About.jsx';
import SignUpForm from './SignUpForm.jsx';

const PrivateRoute = () => {
  const auth = useAuth();
  console.dir('current user', auth.currUser);
  return !auth.currUser ? <Navigate to="login" replace /> : <Outlet />;
};

const App = () => (
  <BrowserRouter>
    <div className="container mx-auto px-4 max-w-xl mt-4">
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
    </div>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
