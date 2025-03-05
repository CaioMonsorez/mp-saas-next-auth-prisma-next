'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn('credentials', {
      redirect: false, // Evita redirecionamento automático
      email,
      password,
    });

    setLoading(false);

    if (!res || !res.ok) {
      setError("Seu Login está incorreto, tente novamente.");
      return;
    }

    window.location.href = "/dashboard"; // Redirecionamento após sucesso
  };

  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" required />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" name="password" placeholder="********" required />
        </div>
        <div>
          <Button className="w-full mt-6" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </Button>
        </div>
      </form>
    </>
  );
}
