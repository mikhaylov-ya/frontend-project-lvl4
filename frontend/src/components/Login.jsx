import { useFormik, Field, FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import { loginSchema } from '../schemas/index.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <h1>{t('nav.login')}</h1>
        <FormikProvider value={f}>
          <Form onSubmit={f.handleSubmit}>
            <Form.Group>
              <Form.Label>{t('labels.username')}</Form.Label>
              <Field
                className="mb-2"
                as={Form.Control}
                type="text"
                name="username"
                id="username"
                autoFocus
                isInvalid={f.errors.username && f.touched.username}
              />
              <Form.Control.Feedback type="invalid">
                {t(f.errors.username)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{t('labels.password')}</Form.Label>
              <Field
                className="mb-2"
                as={Form.Control}
                type="password"
                name="password"
                id="password"
                autoFocus
                isInvalid={f.errors.password && f.touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {t(f.errors.password)}
              </Form.Control.Feedback>
            </Form.Group>
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
      </div>
    </div>
  );
};

export default LoginForm;
