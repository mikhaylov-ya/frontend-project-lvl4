import {
  Divider, List, ListItemButton, ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const ChannelList = () => {
  const dispatch = useDispatch();
  const selectChannel = (id) => {
    dispatch(channelsActions.toggleChannel(id));
  };

  const { activeChannel, entities: channels } = useSelector((state) => state.channels);

  return (
    <List subheader="Channels">
      {Object.values(channels).map(({ id, name }) => (
        <>
          <ListItemButton
            key={id}
            onClick={() => selectChannel(id)}
            selected={id === activeChannel}
          >
            <ListItemText primary={`# ${name}`} />
          </ListItemButton>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default ChannelList;
