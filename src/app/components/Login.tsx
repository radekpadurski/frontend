'use client';

import { signOut, useSession, signIn, getProviders } from 'next-auth/react';
import DataFromMyAPI from './DataFromMyAPI';

// @ts-ignore
function Login() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (session) {
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
