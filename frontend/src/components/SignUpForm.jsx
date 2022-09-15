import { useFormik, Field, FormikProvider } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
          setSubmitting(false);
          if (e.response.status === 409) {
            setErrors({ username: t('errors.signup.alreadyExists') });
          } else if (e.name === 'AxiosError') {
            setErrors({ username: t('errors.network') });
            toast.error((t('errors.network')));
          } else {
            console.error(e);
            throw e;
          }
        });
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <h1 className="text-center mb-4 py-2">{t('nav.signup')}</h1>
        <FormikProvider value={f}>
          <Form className="w-50" onSubmit={f.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">{t('labels.signupUsername')}</Form.Label>
              <Field
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
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">{t('labels.password')}</Form.Label>
              <Field
                as={Form.Control}
                type="password"
                name="password"
                id="password"
                isInvalid={f.errors.password && f.touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {t(f.errors.password)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="confirmation">{t('labels.confirmation')}</Form.Label>
              <Field
                as={Form.Control}
                type="password"
                name="confirmation"
                id="confirmation"
                isInvalid={f.errors.confirmation && f.touched.confirmation}
              />
              <Form.Control.Feedback type="invalid">
                {t(f.errors.confirmation)}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              color="primary"
              className="w-100"
            >
              {t('buttons.signup')}
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default SignUpForm;
