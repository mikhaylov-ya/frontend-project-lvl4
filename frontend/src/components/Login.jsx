import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavButton } from './Navigation.jsx';
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
          <label className="block" htmlFor="username">
            <span className="text-gray-700">
              {t('labels.username')}
            </span>
          </label>
          <Field
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            as="input"
            type="text"
            autoFocus
            name="username"
            id="username"
          />
          {f.errors.username && <p className="mt-2 text-sm text-red-600">{t(f.errors.username)}</p>}
          <label className="block" htmlFor="password">
            <span className="text-gray-700">
              {t('labels.password')}
            </span>
          </label>
          <Field
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            as="input"
            type="text"
            autoFocus
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
      <NavButton text={t('nav.signup')} link="/signup" />
    </div>
  );
};

export default LoginForm;
