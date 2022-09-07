import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'errors.required',
    oneOf: 'errors.confirm',
    notOneOf: 'errors.channels.alreadyExists',
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
    .min(4)
    .max(15)
    .notOneOf(channels),
});

const signUpSchema = yup.object().shape({
  username: yup.string()
    .required()
    .min(3)
    .max(20),
  password: yup.string()
    .required()
    .min(6, 'errors.password.min')
    .matches(/[a-zA-Z0-9]/),
  confirmation: yup.string()
    .required()
    .min(6, 'errors.password.min')
    .oneOf([yup.ref('password'), null]),
});

export {
  loginSchema, messageSchema, getRenameSchema, signUpSchema,
};
