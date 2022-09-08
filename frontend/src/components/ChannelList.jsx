import {
  Divider, List, ListItemButton, ListItemText, IconButton, ListItem, ListItemSecondaryAction,
  ListSubheader, Menu, MenuItem, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVertSharp';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChannel } from '../slices/channelsSlice.js';
import getModal from './modals/index.jsx';

const renderModal = (type, modalInfo) => {
  if (!type) return null;
  const Modal = getModal(type);
  return <Modal {...modalInfo} />;
};

const ChannelList = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, open: false, id: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const showModal = (type, id) => {
    setModalInfo({ type, open: true, id });
    setAnchorEl(null);
  };
  const hideModal = () => setModalInfo({ type: null, open: false, id: null });
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const selectChannel = (id) => {
    dispatch(toggleChannel(id));
  };

  const { activeChannel, entities } = useSelector((state) => state.channels);
  const channels = Object.values(entities);
  console.log({ channels, activeChannel });
  return (
    <List>
      <ListSubheader>
        {t('channelList')}
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
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem divider onClick={() => showModal('renaming', ch.id)}>
                      <Typography variant="button">{t('buttons.rename')}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => showModal('removing', ch.id)}>
                      <Typography variant="button">{t('buttons.remove')}</Typography>
                    </MenuItem>
                  </Menu>
                </div>
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
