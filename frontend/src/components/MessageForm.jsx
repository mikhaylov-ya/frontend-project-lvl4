import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import {
  useFormik, FormikProvider, Form, Field,
} from 'formik';
import SendIcon from '@mui/icons-material/Send';
import { TextField, Button } from '@mui/material';
import useSocket from '../hooks/useSocket.jsx';
import useAuth from '../hooks/useAuth.jsx';
import { messageSchema } from '../schemas/index.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const { currUser } = useAuth();
  const inputRef = useRef();
  const socket = useSocket();
  const { activeChannel } = useSelector((state) => state.channels);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: messageSchema,
    onSubmit: ({ message }) => {
      try {
        const { username } = currUser;
        const msgObject = {
          from: activeChannel,
          text: filter.clean(message),
          username,
        };

        socket.newMessage(msgObject);
        formik.resetForm();
        inputRef.current.focus();
      } catch (e) {
        t(e.key);
      }
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
          label={t('labels.messages.input')}
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
          {t('buttons.submit')}
        </Button>
      </Form>
    </FormikProvider>
  );
};

const MessageList = () => {
  const { activeChannel } = useSelector((state) => state.channels);
  const { entities: messages } = useSelector((state) => state.messages);
  const messageArr = Object.values(messages);
  console.log('selected msgs', messageArr);
  const currMessages = messageArr.filter(({ from }) => from === activeChannel);

  const messageList = currMessages.map(({ id, username, text }) => (
    <p key={id}>
      <b>{`${username}: `}</b>
      {text}
    </p>
  ));
  return <div>{messageList}</div>;
};

export { MessageForm, MessageList };
