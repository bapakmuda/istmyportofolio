import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
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
  secret: "firdyawan_super_secret_key_12345!",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
