import db from './db';
import { compareSync } from 'bcryptjs';
import { user as PrismaUser } from "@prisma/client";

type User = {
    id: number;
    email: string;
    name: string;
    password?: string;};

export async function findUserByCredentials(
    email: string,
    password: string
): Promise<User | null> {

    const user = await db.user.findFirst({
        where: {
            email: email,
        },
    }) as PrismaUser | null; // Tipagem explícita

    if (!user || !user.password) {
        return null;
    }

    const passwordMatch = compareSync(password, user.password);

    if (passwordMatch) {
        return {
            id: user.id,
            email: user.email || '',
            name: user.name || '',
        };
    }

    return null;
}

export default findUserByCredentials;