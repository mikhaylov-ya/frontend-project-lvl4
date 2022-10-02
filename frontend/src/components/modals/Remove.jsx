import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React from 'react';
import useApi from '../../hooks/useApi.jsx';

const Remove = ({ closeModal }) => {
  const { t } = useTranslation();
  const api = useApi();
  const { channelId: id } = useSelector((state) => state.modals);
  const notify = () => toast.success(t('toasts.remove'));

  const removeChannel = () => {
    api.removeChannel({ id });
    closeModal();
    notify();
  };

  return (
    <>
      <Modal.Header closeButton closeLabel="Close">
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.removeBody')}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={closeModal}
          variant="light"
        >
          {t('buttons.cancel')}
        </Button>
        <Button
          type="submit"
          variant="danger"
          onClick={removeChannel}
        >
          {t('buttons.remove')}
        </Button>
      </Modal.Footer>

    </>
  );
};

export default Remove;
