'use client';

import { signOut, useSession, signIn, getProviders } from 'next-auth/react';
import DataFromMyAPI from './DataFromMyAPI';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function Login() {
  const { data: session, status } = useSession();
  const [cookieValue, setCookieValue] = useState<string | undefined>();

  useEffect(() => {
    const value = Cookies.get('next-auth.session-idToken');
    setCookieValue(value);
  }, []);

  if (status === 'loading') return <p>Loading...</p>;

  if (session) {
    const value = Cookies.get('next-auth.session-idToken');
    if (!value) {
      // @ts-ignore
      if (session.token.token.account.id_token) {
        // @ts-ignore
        Cookies.set('next-auth.session-idToken', session.token.token.account.id_token, { expires: 7 });
      }
    }
    return (
      <div>
        <p>Session is active</p>
        <button onClick={() => signOut}>LogOut</button>
        <DataFromMyAPI />
      </div>
    );
  } else {
    return <button onClick={() => signIn('google')}>LogIn</button>;
  }
}

export default Login;
