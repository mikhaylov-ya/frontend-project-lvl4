import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import { useFormik, FormikProvider, Field } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import useApi from '../hooks/useApi.jsx';
import useAuth from '../hooks/useAuth.jsx';
import { messageSchema } from '../schemas/index.js';

const MessageBox = () => {
  const { activeChannel } = useSelector((state) => state.channels);
  const { t } = useTranslation();
  const { currUser } = useAuth();
  const socket = useApi();
  const messageListEl = useRef(null);

  const f = useFormik({
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
        f.resetForm();
      } catch (e) {
        t(e.key);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  const { entities: messages } = useSelector((state) => state.messages);
  const messageArr = Object.values(messages);
  const currMessages = messageArr.filter(({ from }) => from === activeChannel);

  useEffect(() => {
    messageListEl.current.scrollTo(0, 3500);
  }, [currMessages.length]);

  const messageList = currMessages.map(({ id, username, text }) => (
    <div className="text-break mb-2" key={id}>
      <b>{`${username}: `}</b>
      {text}
    </div>
  ));

  return (
    <div className="d-flex flex-column h-100">
      <div className="overflow-auto px-5 my-4" id="message-list" ref={messageListEl}>
        <div>{messageList}</div>
      </div>
      <div className="mt-auto px-7 py-3">
        <FormikProvider value={f}>
          <Form onSubmit={f.handleSubmit} onReset={f.handleReset} className="py-1 border rounded-2 my-1 mr-sm-2">
            <Field
              as={Form.Control}
              placeholder={t('labels.messages.input')}
              name="message"
              id="message"
              aria-label={t('labels.messages.new')}
              autoFocus
              className="border-0 p-0 ps-2"
            />
            <Button variant="group-vertical" type="submit" disabled={!f.isValid || !f.dirty}>
              <ArrowRightSquare size={18} />
              <span className="visually-hidden">{t('buttons.submit')}</span>
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default MessageBox;
