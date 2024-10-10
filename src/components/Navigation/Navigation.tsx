'use client';
import React, { useState } from 'react';
import Container from '../brandUI/Container';
import Logo from '../brandUI/Logo';
import CustomButton from '../brandUI/buttons/CustomButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 w-full bg-white z-50">
        <Container>
          <div className="flex items-center justify-between py-4 lg:py-0">
            {/* Mobile Logo */}
            <div className="lg:hidden">
              <Logo />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1">
              <Navbar />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <MobileNavbar setIsOpen={setIsOpen} />
          </div>
        </Container>
      </div>
    </div>
  );
}

function Navbar() {
  const pathname = usePathname();

  return (
    <div className="mt-6 flex-1 flex justify-between items-center">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-4">
        <ul className="flex justify-center items-center font-medium gap-[40px] text-[18px]">
          <NavItems pathname={pathname} />
        </ul>
      </div>
      <div className="flex-1 flex justify-end">
        <CustomButton type="primary">
          <Link href={'/store'}>Order now</Link>
        </CustomButton>
      </div>
    </div>
  );
}

interface MobileNavbarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileNavbar({ setIsOpen }: MobileNavbarProps) {
  const pathname = usePathname();

  return (
    <div className="py-4">
      <ul className="flex flex-col space-y-4">
        <NavItems pathname={pathname} mobile setIsOpen={setIsOpen} />
      </ul>
      <div className="mt-4">
        <div className='flex justify-center'>
          <CustomButton type="primary" >
            <Link href={'/store'} onClick={() => setIsOpen(false)}>
              Order now
            </Link>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

interface NavItemsProps {
  pathname: string;
  mobile?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavItems({ pathname, mobile, setIsOpen }: NavItemsProps) {
  const navLinks = [
    { href: '/', label: 'Home', matchPath: '/home' },
    { href: '/store', label: 'Store' },
    { href: '#about', label: 'About us', isAnchor: true },
    { href: '/contact', label: 'Contact us' },
  ];

  return (
    <>
      {navLinks.map((link, index) => (
        <React.Fragment key={link.href}>
          <li
            className={cn(
              'cursor-pointer transition-all duration-300 hover:text-[#FF9900]',
              (pathname === link.matchPath || pathname === link.href) &&
                'text-[#FF9900]',
              mobile && 'text-center',
            )}
          >
            {link.isAnchor ? (
              <a href={link.href} onClick={() => mobile && setIsOpen?.(false)}>
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                onClick={() => mobile && setIsOpen?.(false)}
              >
                {link.label}
              </Link>
            )}
          </li>
          {!mobile && index < navLinks.length - 1 && (
            <li className="w-[11px] h-[11px] bg-[#FF9900] rounded-full" />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
