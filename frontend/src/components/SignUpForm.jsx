import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import { signUpSchema } from '../schemas/index.js';
import FormInput from './Inputs/FormInput.jsx';

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
    <div>
      <h1>{t('nav.signup')}</h1>
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
          <Field
            as={<FormInput type="password" key="labels.confirmation" />}
            name="confirmation"
            id="confirmation"
          />
          {f.errors.confirmation && <p className="mt-2 text-sm text-red-600">{t(f.errors.confirmation)}</p>}
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
            {t('buttons.signup')}
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default SignUpForm;
