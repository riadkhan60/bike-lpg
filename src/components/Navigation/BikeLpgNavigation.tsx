'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Container from '../LocalUi/container/Container';
import Image from 'next/image';
import { BIKE_LPG_MENU } from '@/constants/menuList';

export default function BikeLpgNavigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed top-0 w-full z-50">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="">
            <div className="flex h-16 items-center justify-between mx-auto">
              {/* Mobile Logo & Menu */}
              <div className="flex items-center justify-between w-full xl:hidden">
                <Link href="/bike-lpg" className="flex items-center">
                  <Image
                    src={'https://i.imgur.com/xWb3rAu.png'}
                    alt="Logo"
                    width={60}
                    height={60}
                    priority
                  />
                </Link>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="pr-0">
                    <div className="mt-12">
                      <MobileNav onNavigate={() => setIsOpen(false)} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex w-full items-center">
                {/* Left Logo */}
                <Link href="/bike-lpg" className="mr-8">
                  <Image
                    src={'https://i.imgur.com/xWb3rAu.png'}
                    alt="Logo"
                    width={70}
                    height={70}
                    priority
                  />
                </Link>

                {/* Center Menu Items */}
                <div className="flex flex-1 justify-end space-x-6">
                  <nav className="flex items-center space-x-6 text-base font-medium">
                    <DesktopNav items={BIKE_LPG_MENU} />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
}

function DesktopNav({ items }: { items: typeof BIKE_LPG_MENU }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className={cn(
            'transition-colors hover:text-[#FF9900] whitespace-nowrap',
            pathname === item.path ? 'text-[#FF9900]' : 'text-foreground/60',
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-4">
      <Link
        href="/"
        onClick={onNavigate}
        className={cn(
          'text-foreground uppercase font-semibold text-lg transition-colors hover:text-[#FF9900]',
          pathname === '/site' && 'text-[#FF9900]',
        )}
      >
        Home
      </Link>
      {BIKE_LPG_MENU.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          onClick={onNavigate}
          className={cn(
            'text-foreground uppercase font-semibold text-lg transition-colors hover:text-[#FF9900]',
            pathname === item.path && 'text-[#FF9900]',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
