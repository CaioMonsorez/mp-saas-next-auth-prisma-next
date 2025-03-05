'use server';

import { signIn } from 'next-auth/react';

export default async function loginAction(_prevState: any, formData: FormData) {
  try {
    const res = await signIn('credentials', {
      redirect: false, // Evita redirecionamento automático
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!res?.ok) {
      return { success: false, error: 'Seu Login está incorreto, tente novamente' };
    }

    return { success: true, error: null };
  } catch (e) {
    console.error("Erro de login:", e);

    return { success: false, error: 'Ops, erro interno. Entre em contato conosco' };
  }
}
