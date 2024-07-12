import SessionProvider from './SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import MainPage from './mainPage';

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <MainPage />
    </SessionProvider>
  );
}
export default Home;
