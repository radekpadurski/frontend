'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession, signIn } from 'next-auth/react';
import axios from '../axios';
import Cookies from 'js-cookie';

function DataFromMyAPI() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      const value = Cookies.get('next-auth.session-idToken');
      if (value) {
        setToken(value);
      }
    }
  }, [status]);

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
          setData(response.data.results);
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
      {data.map((item, index) => (
        <div key={index}>
          {/* @ts-ignore */}
          <p>{item.name}</p>
        </div>
      ))}
      <p>data from api</p>
    </div>
  );
}

export default DataFromMyAPI;
