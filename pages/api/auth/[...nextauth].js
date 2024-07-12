import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
    async session(session, token) {
      session.accessToken = token;
      return session;
    }
  }
};

export default NextAuth(authOptions);
