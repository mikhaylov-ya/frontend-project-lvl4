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
          console.dir(e.response.status);
          if (e.response.status === 409) {
            setErrors({ username: t('errors.signup.alreadyExists') });
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <h1>{t('nav.signup')}</h1>
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
            <Form.Group>
              <Form.Label>{t('labels.confirmation')}</Form.Label>
              <Field
                className="mb-2"
                as={Form.Control}
                type="password"
                name="confirmation"
                id="confirmation"
                autoFocus
                isInvalid={f.errors.confirmation && f.touched.confirmation}
              />
              <Form.Control.Feedback type="invalid">
                {t(f.errors.confirmation)}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              color="primary"
              disabled={f.isSubmitting || !f.dirty}
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
