import db from './db';
import { compareSync } from 'bcryptjs';

type User = {
    email: string,
    name: string,
    password?: string;
};

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {

  const user = await db.user.findFirst({
    where: {
      email: email,
    }
  });

  if (!user || !user.password) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return { email: user.email || '', name: user.name || '' }; // Garante que email e name são strings
  }

  return null;
}

export default findUserByCredentials;