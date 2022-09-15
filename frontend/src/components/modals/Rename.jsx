import { useTranslation } from 'react-i18next';
import {
  useFormik, Field, Form as FormikForm, FormikProvider,
} from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { getRenameSchema } from '../../schemas';

const Rename = ({ hideModal, open, id }) => {
  const socket = useSocket();
  const { t } = useTranslation();

  const { entities } = useSelector((state) => state.channels);
  const channels = Object.values(entities);
  const currChannel = channels.find((ch) => ch.id === id);
  const channelNames = channels.map(({ name }) => name).filter((name) => name !== currChannel.name);

  const f = useFormik({
    initialValues: {
      name: currChannel.name,
    },
    validationSchema: getRenameSchema(channelNames),
    onSubmit: ({ name }) => {
      const info = { name, id };
      try {
        socket.renameChannel(info);
        hideModal();
        toast.success(t('toasts.rename'));
      } catch (e) {
        toast.error((t('errors.network')));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Modal show={open} onHide={hideModal}>
      <Modal.Header closeButton closeLabel="Close">
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <FormikProvider value={f}>
        <FormikForm>
          <Modal.Body>
            <Form.Group>
              <Form.Label>{t('labels.channels.name')}</Form.Label>
              <Field
                className="mb-2"
                as={Form.Control}
                type="text"
                name="name"
                id="name"
                autoFocus
                isInvalid={f.errors.name && f.touched.name}
              />
              <Form.Control.Feedback type="invalid">
                {t(f.errors.name)}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              onClick={hideModal}
              variant="light"
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={f.isSubmitting}
            >
              {t('buttons.submit')}
            </Button>
          </Modal.Footer>
        </FormikForm>
      </FormikProvider>
    </Modal>
  );
};

export default Rename;
