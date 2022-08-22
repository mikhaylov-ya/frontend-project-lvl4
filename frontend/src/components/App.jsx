import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthProvider from './AuthProvider.jsx';
import useAuth from '../hooks/useAuth.jsx';
import Navigation from './Navigation.jsx';
import About from './About.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  console.dir('current user', auth.currUser);
  return auth.currUser?.username ? children : <Navigate to="login" state={{ from: location }} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
