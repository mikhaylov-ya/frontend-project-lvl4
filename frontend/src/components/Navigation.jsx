import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import useAuth from '../hooks/useAuth';

export const NavButton = ({ text, link }) => (
  <div className="inline-flex shadow">
    <button type="button" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-3 text-base font-medium text-white hover:bg-indigo-700">
      <Link to={link}>{text}</Link>
    </button>
  </div>
);

const Navigation = () => {
  const { t } = useTranslation();

  const { logOut, currUser } = useAuth();
  const LoginBtn = <NavButton text={t('nav.login')} link="login" />;
  const LogoutBtn = (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md border border-transparent font-medium text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
      onClick={() => logOut()}
    >
      {t('nav.logout')}
    </button>
  );

  return (
    <div className="flex lg:mt-0 lg:flex-shrink-0 gap-6 justify-center">
      <NavButton text={t('nav.home')} link="/" />
      <NavButton text={t('nav.about')} link="about" />
      <NavButton text={t('nav.signup')} link="signup" />
      {currUser ? LogoutBtn : LoginBtn}
    </div>
  );
};

export default Navigation;
