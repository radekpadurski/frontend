'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from '../axios';
import Cookies from 'js-cookie';
import Modal from './Modal';
import ScatterChart from './Chart';
import Button from './Button';
import Table from './Table/Table';
import TableRow from './Table/TableRow';
import TableCell from './Table/TableCell';
import TableWrapper from './Table/TableWrapper';
import { styled } from 'styled-components';

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

interface TickerList {
  name: string;
  active: boolean;
  currency_name: string;
  locale: string;
  market: string;
  ticker: string;
}

function DataFromMyAPI() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const [data, setData] = useState<TickerList[]>([]);
  const [alarms, setAlarms] = useState([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<TickerDetails>();
  const [modalInputValue, setModalInputValue] = useState<string>();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalInputValue(undefined);
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
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/getTickersList', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
          console.log(response);
          setData(response.data.results);
        } catch (error) {
          console.error('Error while fetching data', error);
        }
      };

      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/alarms', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
          setAlarms(response.data);
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
        } catch (error) {
          console.error('Error while fetching data', error);
        }
      };

      fetchData();
    }
  };

  const handleSetAlarm = () => {
    if (modalInputValue && modalContent) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/set-alarm/symbol/${modalContent.ticker}/targetPrice/${modalInputValue}`, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
        } catch (error) {
          console.error('Error while fetching data', error);
        }
      };

      fetchData();
    }
  };

  const Wrapper = styled.div`
    background-color: #1f2739;
  `;

  return (
    <Wrapper>
      <TableWrapper>
        <Table
          headersText={['Name', 'IsActive', 'Currency', 'Locale', 'Type', 'Exchange symbol']}
          flexSize={[58, 8, 8, 8, 8, 10]}
        >
          {data.map((item, index) => (
            <TableRow key={index} index={index} onClick={() => handleGetTickerDetail(item.ticker)}>
              <TableCell text={item.name} flex="1 0 58%" />
              <TableCell text={'' + item.active} flex="1 0 8%" />
              <TableCell text={item.currency_name} flex="1 0 8%" />
              <TableCell text={item.locale} flex="1 0 8%" />
              <TableCell text={item.market} flex="1 0 8%" />
              <TableCell text={item.ticker} flex="1 0 10%" />
            </TableRow>
          ))}
        </Table>
      </TableWrapper>
      {data.map((item, index) => (
        <div key={index}>
          {/* @ts-ignore */}
          {/* <Button onClick={() => handleGetTickerDetail(item.ticker)}>{item.name}</Button> */}
        </div>
      ))}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ScatterChart
          dataContent={modalContent?.results.map((result) => ({
            x: new Date(result.t).getDate(),
            y: result.o
          }))}
        />
        <input value={modalInputValue} onChange={(event) => setModalInputValue(event.target.value)} type="number" />
        <Button onClick={() => handleSetAlarm()}>set alarm</Button>
      </Modal>
      {alarms.map((item, index) => (
        <div key={index}>
          {/* @ts-ignore */}
          <p>{item.symbol}</p>
          {/* @ts-ignore */}
          <p>{item.targetPrice}</p>
        </div>
      ))}
    </Wrapper>
  );
}

export default DataFromMyAPI;
