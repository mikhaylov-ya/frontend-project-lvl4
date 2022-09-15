import { useEffect, useState, React } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { MessageForm, MessageList } from './MessageForm.jsx';
import ChannelList from './ChannelList.jsx';
import { toggleChannel, addChannels } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth';

const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="spinner-border animate-spin inline-block w-14 h-14 border-4 rounded-full text-purple-500" role="status" />
  </div>
);

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
  }, [auth, dispatch, t]);

  return !isLoaded
    ? <Loader />
    : (
      <div className="grid-cols-15 gap-2">
        <div className="col-span-3">
          <ChannelList />
        </div>
        <div className="col-span-6">
          <MessageList />
        </div>
        <div className="col-span-6">
          <MessageForm />
        </div>
      </div>
    );
};

export default Chat;
