/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
} from 'react-router-dom';
import { useState, useContext } from 'react';
import Login from './Login.jsx';
import Home from './Home.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthContext from '../contexts/auth.jsx';

const AuthProvider = ({ children }) => {
  const userData = localStorage.getItem('userData');
  const [currUser, setUser] = useState({ username: userData?.username ?? null });

  const logIn = (user) => {
    localStorage.setItem('userData', JSON.stringify(user));
    setUser({ username: user.username });
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    return (user && user.token) ? { Authorization: `Bearer ${user.token}` } : {};
  };

  return (
    <AuthContext.Provider value={{
      logIn, logOut, getAuthHeader, currUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);

  return auth.loggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  console.log(3);
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="login">Log In</Link>
          </nav>
          <Routes>
            <Route element={<PrivateRoute><Home /></PrivateRoute>} path="/" />
            <Route element={<Login />} path="login" />
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
