import { useEffect, useRef } from 'react';
import {
  useFormik, FormikProvider, Form, Field,
} from 'formik';
import SendIcon from '@mui/icons-material/Send';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';
import useSocket from '../hooks/useSocket.jsx';
import useAuth from '../hooks/useAuth.jsx';

const MessageForm = ({ channelId }) => {
  const { currUser } = useAuth();
  const inputRef = useRef();
  const socket = useSocket();

  const validationSchema = yup.object().shape({
    message: yup
      .string()
      .trim()
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: (text) => {
      const { username } = currUser;
      const message = {
        from: channelId,
        text,
        username,
      };
      socket.newMessage(message);
      formik.resetForm();
      inputRef.current.focus();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Field
          as={TextField}
          label="Enter your message"
          placeholder="A message to share"
          variant="standard"
          margin="normal"
          name="message"
          id="message"
          fullWidth
          inputRef={inputRef}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={SendIcon}
        >
          Send
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default MessageForm;
