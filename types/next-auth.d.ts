// ESTE ARQUIVO É UMA GAMBI PARA FUNCIONAR A SESSION E ENVIAR O TOKEN ACCESS PRO BACK

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string | null;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string | null;
  }
}
