import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import findUserByCredentials from "@/lib/user";
import { User } from "@auth/core/types";
import jwt from 'jsonwebtoken';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // console.log("Credenciais recebidas:", credentials);

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await findUserByCredentials(credentials.email as string, credentials.password as string);

                if (!user) {
                    return null;
                }

                const nextAuthUser: User = {
                    id: String(user.id),
                    name: user.name,
                    email: user.email,
                    image: null,
                };

                return nextAuthUser;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            if (user && user.email) {
                if (!process.env.NEXTAUTH_SECRET) {
                    throw new Error("NEXTAUTH_SECRET não está definido!");
                }

                try {
                    token.accessToken = jwt.sign(
                        { email: user.email },
                        process.env.NEXTAUTH_SECRET as string, // Forçando tipagem
                        { expiresIn: "1h" }
                    );
                    // console.log("JWT gerado:", token.accessToken);
                } catch (error) {
                    // console.error("Erro ao gerar token JWT:", error);
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token.accessToken) {
                session.accessToken = token.accessToken as string; // Garantindo que seja string
                // console.log("Sessão retornada:", session);
            }
            return session;
        },
    },
});
