import { useRef } from 'react';
import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { getRenameSchema } from '../../schemas';

const Add = ({ hideModal, open }) => {
  const socket = useSocket();
  const inputRef = useRef();
  const { entities: channels } = useSelector((state) => state.channels);
  const channelNames = channels.map(({ name }) => name);

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getRenameSchema(channelNames),
    onSubmit: (name) => {
      try {
        socket.newChannel(name);
        hideModal();
      } catch (e) {
        inputRef.current.select();
        throw e;
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Dialog
      open={open}
      onClose={hideModal}
    >
      <DialogTitle>
        Add new channel
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
        <FormikProvider value={f}>
          <Form>
            <Field
              label="Channel name"
              as={TextField}
              type="text"
              name="name"
              id="name"
              helperText={f.errors.name}
              error={Boolean(f.errors.name)}
            />
          </Form>
        </FormikProvider>
        <DialogActions>
          <Button onClick={hideModal}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={f.isSubmitting}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Add;
