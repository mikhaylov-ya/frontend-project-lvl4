import { Outlet, Link } from 'react-router-dom';

const Navigation = () => (
  <>
    <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
      <Link to="/">Home</Link>
      <Link to="login">Log In</Link>
    </nav>
    <Outlet />
  </>
);

export default Navigation;
