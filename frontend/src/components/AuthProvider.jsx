import { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(`${localStorage.getItem('userData')}`);
  console.table('user data from storage:', userData);
  const username = userData?.username;
  const [currUser, setUser] = useState(username ? { username } : null);

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
    return (user?.token) ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const authService = useMemo(() => ({
    logIn, logOut, getAuthHeader, currUser,
  }), [currUser]);

  return (
    <AuthContext.Provider value={authService}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
