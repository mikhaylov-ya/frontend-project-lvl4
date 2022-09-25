import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import useApi from '../../hooks/useApi.jsx';
import { toggleChannel } from '../../slices/channelsSlice.js';

const Remove = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useApi();
  const { channelId: id } = useSelector((state) => state.modals);
  const notify = () => toast.success(t('toasts.remove'));

  const removeChannel = () => {
    socket.removeChannel({ id });
    dispatch(toggleChannel(1)); // navigate to general channel
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
