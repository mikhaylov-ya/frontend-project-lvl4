import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Container, TextField,
} from '@mui/material';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import { loginSchema } from '../schemas/index.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const fieldStyles = {
    mx: 2,
  };

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      axios.post(routes.loginPath(), values)
        .then(({ data }) => {
          auth.logIn(data);
          navigate('/', { replace: true });
        })
        .catch((e) => {
          setSubmitting(false);
          if (e.response.status === 401) {
            setFieldError('username', 'errors.auth');
          } else toast.error(t('errors.network'));
        });
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Container className="bg-light border">
      <h1>{t('nav.login')}</h1>
      <FormikProvider value={f}>
        <Form>
          <Field
            label={t('labels.username')}
            as={TextField}
            type="text"
            name="username"
            id="username"
            sx={fieldStyles}
            helperText={t(f.errors.username)}
            error={Boolean(f.errors.username)}
          />
          <Field
            label={t('labels.password')}
            as={TextField}
            type="password"
            name="password"
            id="password"
            sx={fieldStyles}
            helperText={t(f.errors.password)}
            error={Boolean(f.errors.password)}
          />
          <Button
            type="submit"
            color="primary"
            disabled={f.isSubmitting || !f.dirty}
          >
            {t('buttons.login')}
          </Button>
        </Form>
      </FormikProvider>
      <Button component={Link} to="/signup">{t('nav.signup')}</Button>
    </Container>
  );
};

export default LoginForm;
