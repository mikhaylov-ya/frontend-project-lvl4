import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Container, TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import { signUpSchema } from '../schemas/index.js';

const SignUpForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            toast.error((t('errors.network')));
          } else {
            setSubmitting(false);
            throw e;
          }
        });
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Container>
      <h1>{t('nav.signup')}</h1>
      <FormikProvider value={f}>
        <Form>
          <Field
            sx={{ mx: 2 }}
            label={t('labels.username')}
            as={TextField}
            type="text"
            name="username"
            id="username"
            helperText={t(f.errors.username)}
            error={Boolean(f.errors.username)}
          />
          <Field
            sx={{ mx: 2 }}
            label={t('labels.password')}
            as={TextField}
            type="password"
            name="password"
            id="password"
            helperText={t(f.errors.password)}
            error={Boolean(f.errors.password)}
          />
          <Field
            sx={{ mx: 2 }}
            label={t('labels.confirm')}
            as={TextField}
            type="password"
            name="confirmation"
            id="confirmation"
            helperText={t(f.errors.confirmation)}
            error={Boolean(f.errors.confirmation)}
          />
          <Button
            type="submit"
            color="primary"
            disabled={f.isSubmitting || !f.dirty}
          >
            {t('buttons.signup')}
          </Button>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default SignUpForm;
