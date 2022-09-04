import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Container, TextField,
} from '@mui/material';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import { signUpSchema } from '../schemas/index.js';

const SignUpForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmation: '',
    },
    validationSchema: signUpSchema,
    onSubmit: ({ username, password }, { setErrors, setSubmitting }) => {
      axios.post(routes.signupPath(), { username, password })
        .then(({ data }) => {
          auth.logIn(data);
          navigate('/', { replace: true });
        })
        .catch((e) => {
          console.dir(e.response.status);
          if (e.response.status === 409) {
            setErrors({ username: 'This user is already exists' });
          } else if (e.name === 'AxiosError') {
            setErrors({ username: e.response.status });
          }
          setSubmitting(false);
          throw e;
        });
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Container>
      <h1>Sign Up</h1>
      <FormikProvider value={f}>
        <Form>
          <Field
            sx={{ mx: 2 }}
            label="Username"
            as={TextField}
            type="text"
            name="username"
            id="username"
            helperText={f.errors.username}
            error={Boolean(f.errors.username)}
          />
          <Field
            sx={{ mx: 2 }}
            label="Password"
            as={TextField}
            type="password"
            name="password"
            id="password"
            helperText={f.errors.password}
            error={Boolean(f.errors.password)}
          />
          <Field
            sx={{ mx: 2 }}
            label="Confirm password"
            as={TextField}
            type="password"
            name="confirmation"
            id="confirmation"
            helperText={f.errors.confirmation}
            error={Boolean(f.errors.confirmation)}
          />
          <Button
            type="submit"
            color="primary"
            disabled={f.isSubmitting || !f.dirty}
          >
            Submit
          </Button>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default SignUpForm;
