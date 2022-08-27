import { useEffect, useState } from 'react';
import {
  Divider, TextField, List, ListItem, Paper, ListItemText, Grid, Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actions as channelsActions, selectors as chnlSelectors } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket.jsx';

const Chat = () => {
  const auth = useAuth();
  const socket = useSocket();
  const dispatch = useDispatch();
  const [input, handleInput] = useState('');

  const chnls = useSelector(chnlSelectors.selectEntities);
  const msgs = useSelector((state) => state.messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      console.log('input: ', input);
      socket.newMessage(input);
      handleInput('');
    }
  };

  useEffect(() => {
    axios.get(
      '/api/v1/data',
      { headers: auth.getAuthHeader() },
    )
      .then((res) => {
        const { channels, messages } = res.data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
      })
      .catch(console.error);
  }, [dispatch, auth]);

  console.log('STORED chans', chnls, 'STORED messages', msgs);
  return (
    <>
      <h1>Welcome, my dudes!</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs="4">
          <List subheader="Каналы">
            {Object.values(chnls).map((ch) => (
              <>
                <ListItem button>
                  <ListItemText primary={`# ${ch.name}`} />
                </ListItem>
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
            {Object.values(msgs).map(msg => msg.id)}
          </Paper>
        </Grid>
        <Grid item xs="10">
          <form onSubmit={handleSubmit}>
            <TextField
              id="messageInput"
              label="Enter your message"
              placeholder="A message to share"
              variant="standard"
              margin="normal"
              onChange={(e) => handleInput(e.target.value)}
              fullWidth
              value={input}
            />
            <Button
              type="submit"
              variant="contained"
            >
              Send
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
