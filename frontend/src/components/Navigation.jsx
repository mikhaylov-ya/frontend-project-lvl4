import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const basicBtnStyles = {
    mx: 2,
    color: 'primary',
  };
  const { logOut, currUser } = useAuth();
  const LoginBtn = <Button variant="contained" sx={basicBtnStyles} component={Link} to="login">Log In</Button>;
  const LogoutBtn = <Button variant="contained" sx={basicBtnStyles} onClick={() => logOut()}>Log Out</Button>;

  return (
    <Container maxWidth="sm">
      <nav sx={{ borderBottom: 2, pb: 2 }}>
        <Button sx={basicBtnStyles} component={Link} to="/">Home</Button>
        <Button sx={basicBtnStyles} component={Link} to="about">About</Button>
        <Button sx={basicBtnStyles} component={Link} to="signup">Sign Up</Button>
        {currUser ? LogoutBtn : LoginBtn}
      </nav>
    </Container>
  );
};

export default Navigation;
