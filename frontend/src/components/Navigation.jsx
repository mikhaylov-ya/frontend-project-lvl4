import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React from 'react';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { t } = useTranslation();

  const { logOut, currUser } = useAuth();
  const LoginBtn = <Button as={Link} to="login">{t('nav.login')}</Button>;
  const LogoutBtn = <Button onClick={logOut}>{t('nav.logout')}</Button>;

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">{t('nav.home')}</Navbar.Brand>
        <Navbar.Brand as={Link} to="about">{t('nav.about')}</Navbar.Brand>
        <Navbar.Brand as={Link} to="signup">{t('nav.signup')}</Navbar.Brand>
        {currUser ? LogoutBtn : LoginBtn}
      </div>
    </Navbar>
  );
};

export default Navigation;
