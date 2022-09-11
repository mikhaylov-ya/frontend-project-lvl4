import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

export const NavButton = ({ text, link }) => (
  <button type="button" className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
    <Link to={link}>{text}</Link>
  </button>
);

const Navigation = () => {
  const { t } = useTranslation();

  const { logOut, currUser } = useAuth();
  const LoginBtn = <NavButton text={t('nav.login')} link="login" />;
  const LogoutBtn = (
    <button
      type="button"
      className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
      onClick={() => logOut()}
    >
      {t('nav.logout')}
    </button>
  );

  return (
    <nav className="flex sm:justify-center space-x-4">
      <NavButton text={t('nav.home')} link="/" />
      <NavButton text={t('nav.about')} link="about" />
      <NavButton text={t('nav.signup')} link="signup" />
      {currUser ? LogoutBtn : LoginBtn}
    </nav>
  );
};

export default Navigation;
