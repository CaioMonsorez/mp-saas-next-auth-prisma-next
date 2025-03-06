import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Navbar from './navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  // Verificar se session.user e session.user.name existem
  const userName = session?.user?.name || 'Usuário'; // Usar 'Usuário' como fallback

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={userName} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}