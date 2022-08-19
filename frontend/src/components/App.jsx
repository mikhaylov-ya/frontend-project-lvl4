import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthProvider from './AuthProvider.jsx';
import useAuth from '../hooks/useAuth.jsx';
import Navigation from './Navigation.jsx';

const PrivateRoute = ({ children }) => {
  const { currUser } = useAuth();
  const location = useLocation();
  console.dir(currUser);
  return currUser?.username ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
