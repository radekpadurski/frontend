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

interface Alarm {
  symbol: string;
  targetPrice: number;
}

const Wrapper = styled.div`
  display: flex;
`;

const Alarms: React.FC = () => {
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const [alarms, setAlarms] = useState<Alarm[]>([]);

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

  return (
    <Wrapper>
      <TableWrapper>
        <Table headersText={['Symbol', 'Price']} flexsize={[50, 50]}>
          {alarms.map((item, index) => (
            <TableRow key={index} index={index}>
              <TableCell text={item.symbol} flex="1 0 50%" />
              <TableCell text={'' + item.targetPrice} flex="1 0 50%" />
            </TableRow>
          ))}
        </Table>
      </TableWrapper>
    </Wrapper>
  );
};

export default Alarms;
