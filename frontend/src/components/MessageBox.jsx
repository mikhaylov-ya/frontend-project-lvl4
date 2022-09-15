import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { ArrowDownCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';
import {
  useFormik, FormikProvider, Field, Form,
} from 'formik';
import useSocket from '../hooks/useSocket.jsx';
import useAuth from '../hooks/useAuth.jsx';
import { messageSchema } from '../schemas/index.js';

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const { currUser } = useAuth();
  const socket = useSocket();

  const f = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: messageSchema,
    onSubmit: ({ message }) => {
      try {
        const { username } = currUser;
        const msgObject = {
          from: channel,
          text: filter.clean(message),
          username,
        };

        socket.newMessage(msgObject);
        f.resetForm();
      } catch (e) {
        t(e.key);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <FormikProvider value={f}>
      <Form onSubmit={f.handleSubmit} onReset={f.handleReset} className="py-1 border rounded-2">
        <Field
          as={Form.Control}
          placeholder={t('labels.messages.input')}
          name="message"
          id="message"
          aria-label={t('labels.messages.new')}
          autoFocus
          className="border-0 p-0 ps-2"
        />
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <button type="submit" disabled={!f.isValid || !f.dirty}>
            <ArrowDownCircleIcon className="h-5 w-5" />
            <span className="hidden">{t('buttons.submit')}</span>
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};

const MessageList = ({ channel }) => {
  const { entities: messages } = useSelector((state) => state.messages);
  const messageArr = Object.values(messages);
  console.log('selected msgs', messageArr);
  const currMessages = messageArr.filter(({ from }) => from === channel);

  const messageList = currMessages.map(({ id, username, text }) => (
    <div className="text-break mb-2" key={id}>
      <b>{`${username}: `}</b>
      {text}
    </div>
  ));
  return <div>{messageList}</div>;
};

const MessageBox = () => {
  const { activeChannel } = useSelector((state) => state.channels);
  return (
    <div className="d-flex flex-column h-100">
      <div className="overflow-auto px-5 h-100">
        <MessageList channel={activeChannel} />
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm channel={activeChannel} />
      </div>
    </div>
  );
};

export default MessageBox;
