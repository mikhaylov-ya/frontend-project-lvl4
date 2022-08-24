import { useEffect } from 'react';
import {
  Divider, TextField, Typography, List, ListItem, Paper, ListItemText, Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const fetchData = async () => {
    const { data } = await axios.get('/api/v1/data', { headers: auth.getAuthHeader() });
    dispatch(channelsActions.add(...data.channels));
    dispatch(messagesActions.add(...data.messages));
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.error(e);
    }
  }, [auth]);

  const channels = useSelector((state) => state.channels.entities);
  const messages = useSelector((state) => state.messages.entities);

  console.log('store channels', channels);
  console.log('store msgs', messages);
  return (
    <>
      <h1>Welcome, my dudes!</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs="4">
          <List>
            {channels.map((ch) => (
              <>
                <ListItem button>
                  <ListItemText primary={ch.name} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Grid>
        <Grid item xs="8">
          <Paper variant="outlined" elevation="4" square style={{ width: '80vh', height: '50vh' }}>{messages.length === 0 ? 'Messages' : 'Error...'}</Paper>
        </Grid>
        <Grid item xs="10">
          <Typography variant="body1">Type smth</Typography>
          <TextField id="messageInput" variant="standard" fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
