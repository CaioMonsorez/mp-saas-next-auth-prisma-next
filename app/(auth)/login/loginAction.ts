'use server';

import { signIn } from 'next-auth/react';

export default async function loginAction(_prevState: any, formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return { success: false, error: 'Preencha todos os campos.' };
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      return { success: false, error: res.error }; // Retorna o erro do NextAuth
    }

    return { success: true, error: null };
  } catch (e) {
    console.error('Erro de login:', e);
    return { success: false, error: 'Ops, erro interno. Entre em contato conosco.' };
  }
}