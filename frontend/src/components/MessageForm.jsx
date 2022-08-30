import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  useFormik, FormikProvider, Form, Field,
} from 'formik';
import SendIcon from '@mui/icons-material/Send';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';
import useSocket from '../hooks/useSocket.jsx';
import useAuth from '../hooks/useAuth.jsx';

const MessageForm = () => {
  const { currUser } = useAuth();
  const inputRef = useRef();
  const socket = useSocket();
  const { activeChannel } = useSelector((state) => state.channels);

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
    onSubmit: ({ message }) => {
      const { username } = currUser;
      const msgObject = {
        from: activeChannel,
        text: message,
        username,
      };

      socket.newMessage(msgObject);
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
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Form>
    </FormikProvider>
  );
};

const MessageList = () => {
  const { activeChannel } = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  console.log('messages in store', messages);
  const currMessages = messages.filter(({ from }) => from === activeChannel);

  return currMessages.map(({ id, username, text }) => (
    <p key={id}>
      <b>{`${username}: `}</b>
      {text}
    </p>
  ));
};

export { MessageForm, MessageList };
