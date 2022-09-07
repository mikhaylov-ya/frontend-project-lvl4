import { Link } from 'react-router-dom';
import {
  Button, AppBar, Toolbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { t } = useTranslation();
  const basicBtnStyles = {
    mx: 2,
  };
  const { logOut, currUser } = useAuth();
  const LoginBtn = <Button variant="contained" sx={basicBtnStyles} component={Link} to="login">{t('nav.login')}</Button>;
  const LogoutBtn = <Button variant="contained" sx={basicBtnStyles} onClick={() => logOut()}>{t('nav.logout')}</Button>;

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Button color="info" sx={basicBtnStyles} variant="contained" component={Link} to="/">{t('nav.home')}</Button>
        <Button color="info" sx={basicBtnStyles} variant="contained" component={Link} to="about">{t('nav.about')}</Button>
        <Button color="info" sx={basicBtnStyles} variant="contained" component={Link} to="signup">{t('nav.signup')}</Button>
        {currUser ? LogoutBtn : LoginBtn}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
