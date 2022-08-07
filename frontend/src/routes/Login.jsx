import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Container } from '@mui/material';

const schema = yup.object().shape({
  username: yup.string()
    .required('Make sure to provide a username, please')
    .min(6, 'Too Short!'),
  password: yup.string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <Container className="bg-light border">
      <h1>Log In</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          type="text"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" color="primary">Submit</Button>
      </form>
    </Container>
  );
};

export default LoginForm;
