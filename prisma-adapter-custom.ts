// prisma-adapter-custom.ts
import { PrismaClient, user } from '@prisma/client';
import { Adapter, AdapterUser, AdapterAccount, AdapterSession } from 'next-auth/adapters';

export function PrismaAdapterCustom(prisma: PrismaClient): Adapter {
  return {
    getUser: async (id) => {
      const userFound = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!userFound) return null;
      return {
        id: userFound.id.toString(),
        name: userFound.name,
        email: userFound.email || '',
        emailVerified: userFound.emailVerified,
        image: userFound.image,
      };
    },
    getUserByEmail: async (email) => {
      const userFound = await prisma.user.findUnique({
        where: { email },
      });
      if (!userFound) return null;
      return {
        id: userFound.id.toString(),
        name: userFound.name,
        email: userFound.email || '',
        emailVerified: userFound.emailVerified,
        image: userFound.image,
      };
    },
    getUserByAccount: async ({ providerAccountId, provider }) => {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
      });
      if (!account) return null;
      const userFound = await prisma.user.findUnique({
        where: { id: account.userId },
      });
      if (!userFound) return null;
      return {
        id: userFound.id.toString(),
        name: userFound.name,
        email: userFound.email || '',
        emailVerified: userFound.emailVerified,
        image: userFound.image,
      };
    },
    updateUser: async ({ id, ...data }) => {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data,
      });
      return {
        id: updatedUser.id.toString(),
        name: updatedUser.name,
        email: updatedUser.email || '',
        emailVerified: updatedUser.emailVerified,
        image: updatedUser.image,
      };
    },
    deleteUser: async (id) => {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      return {
        id: deletedUser.id.toString(),
        name: deletedUser.name,
        email: deletedUser.email || '',
        emailVerified: deletedUser.emailVerified,
        image: deletedUser.image,
      };
    },
  };
}