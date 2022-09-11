import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavButton } from './Navigation.jsx';
import FormInput from './Inputs/FormInput.jsx';
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
    <div className="bg-light bd-gray-500">
      <h1>{t('nav.login')}</h1>
      <FormikProvider value={f}>
        <Form>
          <Field
            as={<FormInput type="text" key="labels.username" />}
            name="username"
            id="username"
          />
          {f.errors.username && <p className="mt-2 text-sm text-red-600">{t(f.errors.username)}</p>}
          <Field
            as={<FormInput type="password" key="labels.password" />}
            name="password"
            id="password"
          />
          {f.errors.password && <p className="mt-2 text-sm text-red-600">{t(f.errors.password)}</p>}

          <button
            className="
              mt-3 w-full
              justify-center
              rounded-md
              border
              border-gray-300
              bg-white
              px-4
              py-2
              text-base
              font-medium
              text-gray-700
              shadow-sm
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:ring-offset-2
              sm:mt-0
              sm:ml-3
              sm:w-auto
              sm:text-sm"
            type="submit"
            disabled={f.isSubmitting || !f.dirty}
          >
            {t('buttons.login')}
          </button>
        </Form>
      </FormikProvider>
      <NavButton text={t('nav.signup')} link="signup" />
    </div>
  );
};

export default LoginForm;
