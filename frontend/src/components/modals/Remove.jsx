import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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
      <Modal.Header closeButton>
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
              variant="primary"
              disabled={f.isSubmitting}
            >
              {t('buttons.submit')}
            </Button>
          </Modal.Footer>
    </Modal>
  );
};
  // return (
  //   <Dialog
  //     open={open}
  //     onClose={hideModal}
  //   >
  //     <DialogTitle>
  //       {t('modals.remove')}
  //       <IconButton
  //         onClick={hideModal}
  //         sx={{
  //           position: 'absolute',
  //           right: 8,
  //           top: 8,
  //         }}
  //       >
  //         <CloseIcon />
  //       </IconButton>
  //     </DialogTitle>
  //     <DialogContent>

  //       <DialogActions>
  //         <Button
  //           onClick={removeChannel}
  //           color="warning"
  //           variant="contained"
  //         >
  //           {t('buttons.delete')}
  //         </Button>
  //         <Button
  //           onClick={hideModal}
  //           type="submit"
  //           color="primary"
  //         >
  //           {t('buttons.cancel')}
  //         </Button>
  //       </DialogActions>
  //     </DialogContent>
  //   </Dialog>
  // );
};

export default Remove;
