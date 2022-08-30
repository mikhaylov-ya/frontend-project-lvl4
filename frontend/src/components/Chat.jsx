import { useEffect, useState } from 'react';
import { Paper, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { MessageForm, MessageList } from './MessageForm.jsx';
import ChannelList from './ChannelList.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [isLoaded, setLoad] = useState(false);

  useEffect(() => {
    axios.get(
      '/api/v1/data',
      { headers: auth.getAuthHeader() },
    )
      .then((res) => {
        const { channels, messages, currentChannelId } = res.data;
        dispatch(channelsActions.toggleChannel(currentChannelId));
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        setLoad(true);
      })
      .catch(console.error);
  }, [auth, dispatch]);

  return !isLoaded
    ? <h1>No data, no view</h1>
    : (
      <>
        <h1>Welcome, my dudes!</h1>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs="4">
            <ChannelList />
          </Grid>
          <Grid item xs="8">
            <Paper
              variant="outlined"
              elevation="4"
              square
              style={{ width: '80vh', height: '50vh' }}
            >
              <MessageList />
            </Paper>
          </Grid>
          <Grid item xs="10">
            <MessageForm />
          </Grid>
        </Grid>
      </>
    );
};

export default Chat;
