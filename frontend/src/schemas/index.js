import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string()
    .required('Make sure to provide a username, please')
    .min(5, 'Too Short!'),
  password: yup.string()
    .required('No password provided')
    .min(5, 'Password is too short - should be 5 chars minimum')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
});

const messageSchema = yup.object().shape({
  message: yup
    .string()
    .trim()
    .required('Required'),
});

const getRenameSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Make sure to provide a name, please')
    .min(4, 'Too Short!')
    .max(15, 'Too Long!')
    .notOneOf(channels, 'This name is already taken'),
});

export { loginSchema, messageSchema, getRenameSchema };
