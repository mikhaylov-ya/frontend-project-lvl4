import CloseIcon from '@mui/icons-material/Close';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const Remove = ({ hideModal, open, id }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const removeChannel = () => {
    socket.removeChannel({ id });
    dispatch(channelsActions.toggleChannel(1)); // navigate to general channel
    hideModal();
  };

  return (
    <Dialog
      open={open}
      onClose={hideModal}
    >
      <DialogTitle>
        Remove
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
            Delete
          </Button>
          <Button
            onClick={hideModal}
            type="submit"
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Remove;
