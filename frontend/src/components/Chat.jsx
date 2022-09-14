import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import MessageBox from './MessageBox.jsx';
import ChannelList from './ChannelList.jsx';
import { toggleChannel, addChannels } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoaded, setLoad] = useState(false);

  useEffect(() => {
    axios.get(
      '/api/v1/data',
      { headers: auth.getAuthHeader() },
    )
      .then((res) => {
        const { channels, messages, currentChannelId } = res.data;
        console.log('msgs after reload', messages);
        dispatch(toggleChannel(currentChannelId));
        console.log({ channels });
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        setLoad(true);
      })
      .catch((er) => {
        if (er === AxiosError) toast.error(t('errors.network'));
      });
  }, [auth, dispatch]);

  return !isLoaded
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    )
    : (
      <div className="container h-100 my-4 rounded shadow">
        <div className="row h-100 bg-white flex-md-row overflow-auto">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <ChannelList />
          </div>
          <div className="col p-0 h-100">
            <MessageBox />
          </div>
        </div>
      </div>
    );
};

export default Chat;
