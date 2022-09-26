import { useTranslation } from 'react-i18next';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../slices/modalsSlice.js';
import { toggleChannel } from '../slices/channelsSlice.js';

const ChannelList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const selectChannel = (id) => {
    dispatch(toggleChannel(id));
  };

  const addChannel = () => {
    dispatch(openModal({ type: 'adding' }));
  };
  const removeChannel = (channelId) => () => {
    dispatch(openModal({ type: 'removing', channelId }));
  };
  const renameChannel = (channelId) => () => {
    dispatch(openModal({ type: 'renaming', channelId }));
  };

  const { activeChannel, entities } = useSelector((state) => state.channels);
  const channels = Object.values(entities);
  const setBtnStyle = (id) => (activeChannel === id ? 'primary' : 'secondary');
  console.log({ channels, activeChannel });
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channelList')}</span>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={addChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav nav-pills nav-fill px-2">
        {Object.values(channels).map((ch) => (
          <li key={ch.id} className="nav-item w-100">
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                type="button"
                key={ch.id}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => selectChannel(ch.id)}
                variant={setBtnStyle(ch.id)}
              >
                {`# ${ch.name}`}
              </Button>
              {ch.removable
                ? (
                  <>
                    <Dropdown.Toggle split className="flex-grow-0" variant={setBtnStyle(ch.id)}>
                      <span className="visually-hidden">{t('labels.channels.menu')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={renameChannel(ch.id)}>{t('modals.rename')}</Dropdown.Item>
                      <Dropdown.Item onClick={removeChannel(ch.id)}>{t('modals.remove')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </>
                ) : null}
            </Dropdown>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelList;
