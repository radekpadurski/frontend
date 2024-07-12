'use client';

import { signOut, useSession, signIn, getProviders } from 'next-auth/react';
import Cookies from 'js-cookie';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  align-self: end;
`;

function ActiveUser() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
    Cookies.remove('next-auth.session-idToken');
  };

  if (session) {
    return (
      <Wrapper>
        <button onClick={handleSignOut}>LogOut</button>
      </Wrapper>
    );
  }
}

export default ActiveUser;
