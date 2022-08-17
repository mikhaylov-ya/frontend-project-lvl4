import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { Button, TextField, Container } from '@mui/material';
import { useContext } from 'react';
import routes from '../routes.js';
import AuthContext from '../contexts/auth.jsx';

const schema = yup.object().shape({
  username: yup.string()
    .required('Make sure to provide a username, please')
    .min(5, 'Too Short!'),
  password: yup.string()
    .required('No password provided')
    .min(5, 'Password is too short - should be 5 chars minimum')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
});

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location?.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      try {
        const { data } = await axios.post(routes.loginPath(), { headers: auth.getAuthHeader() });
        auth.logIn(data);
        const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
        navigate(from);
      } catch (e) {
        if (e.response.status === 401) {
          return;
        }
        throw e;
      }
    },
  });

  const isValid = (field) => ((formik.touched[field] && Boolean(formik.errors[field])));

  return (
    <Container className="bg-light border">
      <h1>{fromPage}</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          color="primary"
          fullWidth
          type="text"
          name="username"
          label="Username"
          required="true"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={isValid('username')}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          color="primary"
          fullWidth
          type="password"
          name="password"
          required="true"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={isValid('password')}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" color="primary">Submit</Button>
      </form>
    </Container>
  );
};

export default LoginForm;
