import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const Remove = ({ hideModal, open, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();

  const notify = () => toast.success(t('toasts.remove'));

  const removeChannel = () => {
    socket.removeChannel({ id });
    dispatch(channelsActions.toggleChannel(1)); // navigate to general channel
    hideModal();
    notify();
  };

  return (
    <Dialog
      open={open}
      onClose={hideModal}
    >
      <DialogTitle>
        {t('modals.remove')}
        <IconButton
          onClick={hideModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>

        <DialogActions>
          <Button
            onClick={removeChannel}
            color="warning"
            variant="contained"
          >
            {t('buttons.delete')}
          </Button>
          <Button
            onClick={hideModal}
            type="submit"
            color="primary"
          >
            {t('buttons.cancel')}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Remove;
