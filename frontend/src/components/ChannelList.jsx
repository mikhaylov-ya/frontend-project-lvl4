import { useTranslation } from 'react-i18next';
import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChannel } from '../slices/channelsSlice.js';
import getModal from './modals/index.jsx';
import DropdownMenu from './Dropdown.jsx';

const renderModal = (type, modalInfo) => {
  const { open, hideModal, id } = modalInfo;
  if (!type) return null;
  const Modal = getModal(type);
  return <Modal open={open} hideModal={hideModal} id={id} />;
};

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const ListItem = ({ active, text }) => {
  const activeStyle = 'rounded-t-lg bg-blue-600 text-white';
  const ordinaryStyle = 'hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-500';
  const selectStatus = active ? activeStyle : ordinaryStyle;
  const classes = `text-left px-6 py-2 border-b border-gray-200 w-full cursor-pointer ${selectStatus}`;

  return (
    <button
      aria-current="true"
      type="button"
      className={classNames(classes)}
    >
      {text}
    </button>
  );
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
  console.log({ channels, activeChannel });

  return (
    <div className="flex justify-center">
      <p className="inline">{t('channelList')}</p>
      <button type="button" onClick={() => showModal('adding', null)}>+</button>
      <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
        {Object.values(channels).map((ch) => (
          <div key={ch.id}>
            <ListItem
              onClick={() => selectChannel(ch.id)}
              active={ch.id === activeChannel}
              text={`# ${ch.name}`}
            />
            {ch.removable ? (
              <DropdownMenu items={[
                { showModal: () => showModal('renaming', ch.id), text: t('buttons.rename') },
                { showModal: () => showModal('removing', ch.id), text: t('buttons.remove') },
              ]}
              />
            ) : null}
          </div>
        ))}
      </ul>
      {renderModal(modalInfo.type, { ...modalInfo, hideModal })}
    </div>
  );
};

export default ChannelList;
