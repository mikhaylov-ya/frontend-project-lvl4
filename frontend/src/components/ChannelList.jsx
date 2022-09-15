import { useTranslation } from 'react-i18next';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
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

  const showModal = (type, id) => {
    setModalInfo({ type, open: true, id });
  };
  const hideModal = () => setModalInfo({ type: null, open: false, id: null });
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const selectChannel = (id) => {
    dispatch(toggleChannel(id));
  };

  const { activeChannel, entities } = useSelector((state) => state.channels);
  const channels = Object.values(entities);
  const setBtnStyle = (id) => (activeChannel === id ? 'secondary' : 'primary');
  console.log({ channels, activeChannel });
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channelList')}</span>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => showModal('adding', null)}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav nav-pills nav-fill px-2">
        {Object.values(channels).map((ch) => (
          <li key={ch.id} className="nav-item w-100">
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
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Dropdown.Toggle split className="flex-grow-0" variant={setBtnStyle(ch.id)}>
                    <span className="visually-hidden">{t('labels.channels.menu')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => showModal('renaming', ch.id)}>{t('modals.rename')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => showModal('removing', ch.id)}>{t('modals.remove')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : null}
          </li>
        ))}
      </ul>
      {renderModal(modalInfo.type, { ...modalInfo, hideModal })}
    </>
  );
};

export default ChannelList;
