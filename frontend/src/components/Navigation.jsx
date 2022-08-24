import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const basicBtnStyles = {
    variant: 'outlined',
    color: 'primary',
  };
  const auth = useAuth();

  return (
    <Container maxWidth="xl" sx={{ mx: 'auto' }}>
      <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
        <Button {...basicBtnStyles} component={Link} to="/">Home</Button>
        <Button {...basicBtnStyles} component={Link} to="login">Log In</Button>
        <Button {...basicBtnStyles} component={Link} to="about">About</Button>
        <Button variant="contained" onClick={() => auth.logOut()}>Log Out</Button>
      </nav>
    </Container>
  );
};

export default Navigation;
