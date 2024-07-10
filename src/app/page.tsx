import SessionProvider from './SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Login from './components/Login';
import DataFromMyAPI from './components/DataFromMyAPI';
import { useSession } from 'next-auth/react';

async function Home() {
  const session = await getServerSession(authOptions);

  return <SessionProvider session={session}>{<Login />}</SessionProvider>;
}
export default Home;
