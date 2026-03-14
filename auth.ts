import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Path to your Prisma client
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // Required when using the Credentials provider
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Validate input
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Find the user in the database
        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        });

        // 3. If no user or no password (meaning they signed up with OAuth earlier), reject
        if (!user || !user.password) {
          return null;
        }

        // 4. Check if the password matches
        const isPasswordValid = await bcrypt.compare(
          String(credentials.password),
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        // 5. Return the user object if successful
        return user;
      },
    }),
  ],
  callbacks: {
    // Because we are using JWTs, we need to pass the user ID into the token...
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // ...and then pass that ID from the token into the session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;
