import { Outlet, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const auth = useAuth();
  return (
    <>
      <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="login">Log In</Link>
        <Button variant="contained" onClick={auth.logOut}>Log Out</Button>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
