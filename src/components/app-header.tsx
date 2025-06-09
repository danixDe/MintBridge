'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { FaEthereum } from 'react-icons/fa';
import { ClusterButton, WalletButton } from '@/components/solana/solana-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AppHeader({ links = [{ label: 'CreateToken', path: '/create' }] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path);
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <FaEthereum className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">MintBridge</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {links.map(({ label, path }) => (
              <Button
                key={path}
                variant="link"
                className={`${isActive(path) ? 'text-foreground' : 'text-foreground/80'} hover:text-foreground`}
              >
                <Link href={path}>{label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <WalletButton size="sm" />
          <ClusterButton size="sm" />
        </div>

        <div className="flex md:hidden items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {links.map(({ label, path }) => (
                <DropdownMenuItem key={path}>
                  <Link href={path} className="w-full">
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu (Fullscreen) */}
        {showMobileMenu && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t">
              <ul className="flex flex-col gap-4">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className={`block text-lg py-2 ${isActive(path) ? 'text-foreground' : 'text-foreground/80'}`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 pt-4">
                <WalletButton />
                <ClusterButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}