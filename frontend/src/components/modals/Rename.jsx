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

const Rename = ({ hideModal, open, id }) => {
  console.log({ open });
  console.log('ch in modal', { id });
  const socket = useSocket();
  const inputRef = useRef();
  const { entities: channels } = useSelector((state) => state.channels);
  const channelNames = channels.map(({ name }) => name);
  const currChannel = channels.find((ch) => ch.id === id);

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
        Rename
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
              label="Rename"
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

export default Rename;
