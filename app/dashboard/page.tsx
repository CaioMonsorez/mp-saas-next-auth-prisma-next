'use client';

import { auth } from '@/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const session = await auth();
            setSession(session);
            setLoading(false);

            if (!session) {
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!session) {
        return null; // Ou redirecionar para a página de login
    }

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Bem-vindo ao seu dashboard, {session.user.name}!</p>
                    <Button onClick={() => signOut()}>Sair</Button>
                </CardContent>
            </Card>
        </div>
    );
}