'use client';

import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

export default function SessionProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}
