'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from '../axios';
import Cookies from 'js-cookie';
import Table from './Table/Table';
import TableRow from './Table/TableRow';
import TableCell from './Table/TableCell';
import TableWrapper from './Table/TableWrapper';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal, TickerDetails } from '../../../store/modalSlice';

interface TickerList {
  name: string;
  active: boolean;
  currency_name: string;
  locale: string;
  market: string;
  ticker: string;
}

const Wrapper = styled.div`
  display: flex;
  flex: 1 0 70%;
`;

function TableWithData() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const [data, setData] = useState<TickerList[]>([]);
  const [alarms, setAlarms] = useState([]);
  const dispatch = useDispatch();

  const handleOpenModal = (modalContent: TickerDetails) => {
    dispatch(openModal(modalContent));
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
          handleOpenModal(response.data);
        } catch (error) {
          console.error('Error while fetching data', error);
        }
      };

      fetchData();
    }
  };

  return (
    <Wrapper>
      <TableWrapper>
        <Table
          headersText={['Name', 'IsActive', 'Currency', 'Locale', 'Type', 'Exchange symbol']}
          flexsize={[58, 8, 8, 8, 8, 10]}
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
    </Wrapper>
  );
}

export default TableWithData;
