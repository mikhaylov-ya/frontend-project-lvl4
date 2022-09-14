import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'errors.required',
  },
  string: {
    min: 'errors.username.min',
    max: 'errors.username.max',
    matches: 'errors.password.match',
  },
});

const loginSchema = yup.object().shape({
  username: yup.string()
    .required(),
  password: yup.string()
    .required(),
});

const messageSchema = yup.object().shape({
  message: yup
    .string()
    .trim()
    .required(),
});

const getRenameSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20)
    .notOneOf(channels, 'errors.channels.alreadyExists'),
});

const signUpSchema = yup.object().shape({
  username: yup.string()
    .required()
    .trim()
    .min(3)
    .max(20),
  password: yup.string()
    .required()
    .trim()
    .min(6, 'errors.password.min'),
  confirmation: yup.string()
    .required()
    .trim()
    .min(6, 'errors.password.min')
    .oneOf([yup.ref('password'), null], 'errors.confirm'),
});

export {
  loginSchema, messageSchema, getRenameSchema, signUpSchema,
};
