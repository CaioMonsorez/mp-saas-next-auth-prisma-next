'use client'

import { useActionState } from 'react';
import registerAction from './registerAction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerAction, { success: false, message: "" });

    return (
        <>
            {/* 🔹 Exibe mensagem de erro ou sucesso */}
            {state?.message && (
                <div className={`p-2 mt-4 text-sm rounded ${state.success ? 'text-green-700 bg-green-200' : 'text-red-700 bg-red-200'}`}>
                    {state.message}
                </div>
            )}

            <form action={formAction} className="space-y-4">
                <div>
                    <Label>Nome</Label>
                    <Input type="text" name="name" placeholder="Digite seu nome" required />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="eu@exemplo.com" required />
                </div>
                <div>
                    <Label>Senha</Label>
                    <Input type="password" name="password" placeholder="********" required />
                </div>
                <div>
                    <Button className="w-full mt-4" type="submit" disabled={isPending}>
                        {isPending ? "Registrando..." : "Registrar"}
                    </Button>
                </div>
            </form>
        </>
    );
}
