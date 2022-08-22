import {
  useFormik, Field, ErrorMessage, Form, FormikProvider,
} from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

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
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fieldStyles = {
    size: 'small',
    margin: 'none',
    variant: 'outlined',
    padding: 8,
    fontSize: '0.75rem',
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      axios.post(routes.loginPath(), values)
        .then(({ data }) => {
          auth.logIn(data);
          const { from } = location?.state ?? { pathname: '/' };
          navigate(from, { replace: true });
        })
        .catch((e) => {
          console.error(e);
          if (e.name === 'AxiosError') {
            setErrors({ username: '', password: e.response.status });
          }
          setErrors({ username: '', password: 'User doesn\'t exist' });
          setSubmitting(false);
          throw e;
        });
    },
  });

  return (
    <Container className="bg-light border">
      <h1>Log In</h1>
      <FormikProvider value={formik}>
        <Form>
          <Field
            label="Username"
            as={TextField}
            type="text"
            name="username"
            id="username"
            {...fieldStyles}
          />
          <ErrorMessage name="username" />
          <Field
            label="Password"
            as={TextField}
            type="password"
            name="password"
            id="password"
            {...fieldStyles}
          />
          <ErrorMessage name="password" />
          <Button
            type="submit"
            color="primary"
            disabled={formik.isSubmitting || !formik.dirty}
          >
            Submit
          </Button>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default LoginForm;
