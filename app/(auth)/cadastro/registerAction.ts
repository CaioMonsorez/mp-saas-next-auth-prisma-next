'use server';

import { hash } from 'bcryptjs';
import db from '@/lib/db';

export default async function registerAction(
    _prevState: any, 
    formData: FormData
) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as Record<string, string>;

    console.log('==== Server Action Register User ====');
    console.log(data);

    const name = data.name?.trim();
    const email = data.email?.trim();
    const password = data.password?.trim();

    if (!email || !name || !password) {
        return {
            message: 'Preencha todos os campos.',    
            success: false,
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            message: 'E-mail inválido.',
            success: false,
        };
    }

    if (password.length < 12) {
        return {
            message: 'A senha deve ter pelo menos 12 caracteres.',
            success: false,
        };
    }

    if (name.length < 3) {
        return {
            message: 'O nome deve ter pelo menos 3 caracteres.',
            success: false,
        };
    }

    // 🔍 Verifica se o e-mail já está cadastrado
    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return {
            message: 'Este e-mail já está em uso.',
            success: false,
        };
    }

    // 🔒 Hash da senha antes de salvar no banco
    const hashedPassword = await hash(password, 10);

    // 📌 Cadastrando usuário no banco de dados
    const newUser = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword, // Armazena a senha criptografada
        },
    });

    console.log('Usuário cadastrado com sucesso:', newUser);

    return {
        message: 'Usuário criado com sucesso.',
        success: true,
    };
}
