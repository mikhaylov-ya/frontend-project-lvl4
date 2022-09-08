import { useEffect, useState } from 'react';
import { Paper, Grid, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { MessageForm, MessageList } from './MessageForm.jsx';
import ChannelList from './ChannelList.jsx';
import { toggleChannel, addChannels } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoaded, setLoad] = useState(false);

  useEffect(() => {
    axios.get(
      '/api/v1/data',
      { headers: auth.getAuthHeader() },
    )
      .then((res) => {
        const { channels, messages, currentChannelId } = res.data;
        console.log('msgs after reload', messages);
        dispatch(toggleChannel(currentChannelId));
        console.log({ channels });
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        setLoad(true);
      })
      .catch((er) => {
        if (er === AxiosError) toast.error(t('errors.network'));
      });
  }, [auth, dispatch]);

  return !isLoaded
    ? <LinearProgress sx={{ mt: 10 }} />
    : (
      <Grid
        sx={{ mt: 7 }}
        container
        justifyContent="center"
      >
        <Grid item xs={3} style={{ maxHeight: '50vh', overflow: 'auto' }}>
          <ChannelList />
        </Grid>
        <Grid item xs={7}>
          <Paper
            square
            elevation={5}
            style={{ height: '50vh', maxHeight: '100%', overflow: 'auto' }}
            sx={{ px: 3 }}
          >
            <MessageList />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <MessageForm />
        </Grid>
      </Grid>
    );
};

export default Chat;
