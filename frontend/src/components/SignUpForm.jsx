import {
  useFormik, Field, ErrorMessage, Form, FormikProvider,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Container, TextField,
} from '@mui/material';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import { loginSchema } from '../schemas/index.js';

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();

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
    loginSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      axios.post(routes.loginPath(), values)
        .then(({ data }) => {
          auth.logIn(data);
          navigate('/', { replace: true });
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
