'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from '../axios';
import Cookies from 'js-cookie';
import Modal from './Modal';
import ScatterChart from './Chart';

interface Results {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}
interface TickerDetails {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: Results[];
  status: string;
  request_id: string;
  count: number;
}

function DataFromMyAPI() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<TickerDetails>();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          const response = await axios.get('/api/getTickersList', {
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

  const handleGetTickerDetail = (indicesTicker: string) => {
    if (token && indicesTicker) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/getTickerDetails/${indicesTicker}`, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
          setModalContent(response.data);
          openModal();
          console.log(response.data.results);
        } catch (error) {
          console.error('Error while fetching data', error);
        }
      };

      fetchData();
    }
  };

  console.log('data from api', data);
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          {/* @ts-ignore */}
          <button onClick={() => handleGetTickerDetail(item.ticker)}>{item.name}</button>
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <ScatterChart
              dataContent={modalContent?.results.map((result) => ({
                x: new Date(result.t).getDate(),
                y: result.o
              }))}
            />
            <>{modalContent?.results.map((result) => result.c)}</>
          </Modal>
        </div>
      ))}
    </div>
  );
}

export default DataFromMyAPI;
