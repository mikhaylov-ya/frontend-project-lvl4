import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { toggleChannel } from '../../slices/channelsSlice.js';

const Remove = ({ hideModal, open, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();

  const notify = () => toast.success(t('toasts.remove'));

  const removeChannel = () => {
    socket.removeChannel({ id });
    dispatch(toggleChannel(1)); // navigate to general channel
    hideModal();
    notify();
  };

  return (
    <Modal show={open} onHide={hideModal}>
      <Modal.Header closeButton closeLabel="Close">
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.removeBody')}
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
          variant="danger"
          onClick={removeChannel}
        >
          {t('buttons.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
