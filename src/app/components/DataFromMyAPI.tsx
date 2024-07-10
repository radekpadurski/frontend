'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession, signIn } from 'next-auth/react';
import axios from '../axios';
// import { auth } from '../../config/firebase-config';

function DataFromMyAPI() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const [data, setData] = useState(null);
  console.log('session in data from my api', session);
  useEffect(() => {
    // @ts-ignore
    if (status === 'authenticated' && session.token.token.account.id_token)
      // @ts-ignore
      setToken(session.token.token.account.id_token);
    // @ts-ignore
  }, [session.token.token.account.id_token, status]);

  useEffect(() => {
    if (token) {
      console.log('token', token);
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/get', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
          setData(response.data);
        } catch (error) {
          console.error('Error while fetching data', error);
        }
      };

      fetchData();
    }
  }, [token]);
  console.log('data from api', data);
  return (
    <div>
      <p>data from api</p>
    </div>
  );
}

export default DataFromMyAPI;
