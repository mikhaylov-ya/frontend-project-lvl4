import {
  Switch,
  Route,
  BrowserRouter,
  Link,
} from 'react-router-dom';

import Login from './routes/Login.jsx';
import Home from './routes/Home.jsx';

const App = () => (
  <BrowserRouter>
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
      </nav>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route component={Login} path="/login" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
