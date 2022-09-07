import { useTranslation } from 'react-i18next';
import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { getRenameSchema } from '../../schemas';

const Rename = ({ hideModal, open, id }) => {
  const socket = useSocket();
  const { t } = useTranslation();

  const { entities } = useSelector((state) => state.channels);
  const channels = Object.values(entities);
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
    <Dialog
      open={open}
      onClose={hideModal}
    >
      <DialogTitle>
        {t('modals.rename')}
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
              label={t('labels.channels.name')}
              as={TextField}
              type="text"
              name="name"
              id="name"
              helperText={t(f.errors.name)}
              error={Boolean(f.errors.name)}
            />
          </Form>
        </FormikProvider>
        <DialogActions>
          <Button onClick={hideModal}>
            {t('buttons.cancel')}
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={f.isSubmitting}
          >
            {t('buttons.submit')}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Rename;
