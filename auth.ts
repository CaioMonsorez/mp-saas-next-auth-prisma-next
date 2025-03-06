import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapterCustom } from './prisma-adapter-custom';
import findUserByCredentials from "@/lib/user";
import  db  from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapterCustom(db), // Use o adaptador Prisma personalizado
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("Credenciais recebidas:", credentials); // Log para depuração

        if (!credentials?.email || !credentials?.password) {
          throw new Error("E-mail e senha são obrigatórios");
        }

        const user = await findUserByCredentials(credentials.email as string, credentials.password as string);

        if (!user) {
          throw new Error("Usuário ou senha inválidos");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
