import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "nimda" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.username === "nimda" &&
          credentials?.password === "b1smill4h!"
        ) {
          return { id: "1", name: "Admin" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/kamar-belakang/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev_mode_only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
