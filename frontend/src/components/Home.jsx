import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const [data, setData] = useState(null);
  const auth = useAuth();

  const fetchData = async () => {
    const res = await axios.get('/api/v1/data', { headers: auth.getAuthHeader });
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <h1>Welcome, my dudes!</h1>
      <p>{data}</p>
    </>
  );
};

export default Home;
