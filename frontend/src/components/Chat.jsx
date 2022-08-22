import { useState, useEffect } from 'react';
import {
  Divider, TextField, Typography, List, ListItem, Paper, ListItemText, Grid, Box,
} from '@mui/material';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const [data, setData] = useState(null);
  const auth = useAuth();

  const fetchData = async () => {
    const res = await axios.get('/api/v1/data', { headers: auth.getAuthHeader() });
    console.log('chat data from server: ', res.data);
    setData(res.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.error(e);
    }
  }, [auth]);

  console.dir('data in state: ', data);

  return (
    <Box style={{ width: '70vh', margin: 'auto' }}>
      <h1>Welcome, my dudes!</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs="4">
          <List>
            {data?.channels.map((ch) => (
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
          <Paper variant="outlined" elevation="4" square style={{ width: '80vh', height: '50vh' }}>Wow message</Paper>
        </Grid>
        <Grid item xs="10">
          <Typography variant="body1">Type smth</Typography>
          <TextField id="messageInput" variant="standard" fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
