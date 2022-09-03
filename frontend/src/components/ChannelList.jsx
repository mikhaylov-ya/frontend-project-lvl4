import {
  Divider, List, ListItemButton, ListItemText, IconButton, ListItem, ListItemSecondaryAction,
  ListSubheader,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ControlPointSharpIcon from '@mui/icons-material/ControlPointSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import getModal from './modals/index.jsx';

// const addChannel = () => {
//   const socket = useSocket();
//   socket.newChannel()
// }

const renderModal = (type, modalInfo) => {
  if (!type) return null;
  const Modal = getModal(type);
  return <Modal {...modalInfo} />;
};

const ChannelList = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, open: false, id: null });

  const showModal = (type, id) => setModalInfo({ type, open: true, id });
  const hideModal = () => setModalInfo({ type: null, open: false, id: null });

  const dispatch = useDispatch();
  const selectChannel = (id) => {
    dispatch(channelsActions.toggleChannel(id));
  };

  const { activeChannel, entities: channels } = useSelector((state) => state.channels);
  console.log('channels in store', channels);
  return (
    <List>
      <ListSubheader>
        Channels
        <IconButton onClick={() => showModal('adding', null)}>
          <AddIcon color="primary" />
        </IconButton>
      </ListSubheader>
      {Object.values(channels).map((ch) => (
        <div key={ch.id}>
          <ListItem>
            <ListItemButton
              onClick={() => selectChannel(ch.id)}
              selected={ch.id === activeChannel}
            >
              <ListItemText primary={`# ${ch.name}`} />
            </ListItemButton>
            {ch.removable ? (
              <ListItemSecondaryAction>
                <IconButton onClick={() => showModal('renaming', ch.id)}>
                  <ControlPointSharpIcon />
                </IconButton>
                <IconButton onClick={() => showModal('removing', ch.id)}>
                  <DeleteForeverIcon />
                </IconButton>

              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
          {renderModal(modalInfo.type, { ...modalInfo, hideModal })}
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default ChannelList;
