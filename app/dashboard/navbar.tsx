'use client';

// import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Navbar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' }); // Redireciona para signout"
  };

  const handleMinhaAssinatura = () => {
    router.push('/dashboard/minha-assinatura'); // Redireciona para a página "Minha Assinatura"
  };





  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            {/* <Logo /> */}
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          {/* Links e outros itens do Navbar... */}

          <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <button className="text-gray-700 hover:text-gray-900">
            <User size={24} />
        </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel className="font-light uppercase text-xs">
            {userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Button variant="ghost" onClick={() => router.push('/perfil')}>
                Meu Perfil
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Button variant="ghost" onClick={() => router.push('/configuracoes')}>
                Configurações
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Button variant="ghost" onClick={() => router.push('/dashboard/minha-assinatura')}>
                Minha Assinatura
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Button variant="ghost" onClick={handleLogout}>
                Sair
            </Button>
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
        </nav>
      </div>
    </header>
  );
}