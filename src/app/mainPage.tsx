'use client';

import { Provider } from 'react-redux';
import { store } from '../../store';
import TableWithData from './components/TableWithData';
import { styled } from 'styled-components';
import ActiveUser from './components/ActiveUser';
import Cookies from 'js-cookie';
import Modal from './components/Modal';
import Alarms from './components/Alarms';
import Typography from './components/Typography';
import Button from './components/Button';
import { signOut, useSession, signIn, getProviders } from 'next-auth/react';

const Wrapper = styled.div`
  display: flex;
  background-color: #1f2739;
  height: 100vh;
  width: 100vw;
`;

const LoginWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const ActiveSessionWrapper = styled.div`
  width: 90%;
  margin: 0 5%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const RightColumnWrapper = styled.div`
  display: flex;
  flex: 1 0 15%;
  flex-direction: column;
  height: 100%;
`;
const MainPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (session) {
    const value = Cookies.get('next-auth.session-idToken');
    if (!value) {
      // @ts-ignore
      const sessionToken = session.token.token.account.id_token;
      if (sessionToken) {
        Cookies.set('next-auth.session-idToken', sessionToken, { expires: 7 });
      }
    }
  }

  return (
    <Provider store={store}>
      <Wrapper>
        {status === 'unauthenticated' && (
          <LoginWrapper>
            <Button onClick={() => signIn('google')}>Log In using Google</Button>;
          </LoginWrapper>
        )}

        {status === 'loading' && (
          <LoginWrapper>
            <Typography>Loading...</Typography>
          </LoginWrapper>
        )}

        {status === 'authenticated' && (
          <ActiveSessionWrapper>
            <TableWithData />
            <RightColumnWrapper>
              <ActiveUser />
              <Alarms />
            </RightColumnWrapper>
          </ActiveSessionWrapper>
        )}
      </Wrapper>
      <Modal />
    </Provider>
  );
};
export default MainPage;
