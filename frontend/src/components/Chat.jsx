import { useEffect } from 'react';
import {
  Divider, List, ListItemButton, Paper, ListItemText, Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MessageForm from './MessageForm.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

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
      })
      .catch(console.error);
  }, [auth, dispatch]);

  const msgs = useSelector((state) => state.messages);
  const { activeChannel, entities: channels } = useSelector((state) => state.channels);
  const currMessages = msgs.filter(({ from }) => from === activeChannel);

  console.log('activeChannel: ', activeChannel);
  console.log('STORED chans', channels, 'STORED messages', msgs);
  return (
    <>
      <h1>Welcome, my dudes!</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs="4">
          <List subheader="Channels">
            {channels && Object.values(channels).map(({ id, name }) => (
              <>
                <ListItemButton
                  key={id}
                  onClick={dispatch(channelsActions.toggleChannel(id))}
                  selected={id === activeChannel}
                >
                  <ListItemText primary={`# ${name}`} />
                </ListItemButton>
                <Divider />
              </>
            ))}
          </List>
        </Grid>
        <Grid item xs="8">
          <Paper
            variant="outlined"
            elevation="4"
            square
            style={{ width: '80vh', height: '50vh' }}
          >
            {currMessages && currMessages.map((msg) => (
              <p key={msg.id}>
                <b>{msg[0].username}</b>
                {msg[0].text}
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs="10">
          <MessageForm channel={activeChannel} />
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
