// 'use client';
// import React, { useState } from 'react';
// import Container from '../brandUI/Container';
// import Logo from '../brandUI/Logo';
// import CustomButton from '../brandUI/buttons/CustomButton';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import { Menu, X } from 'lucide-react';

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       <div className="fixed top-0 left-0 right-0 w-full bg-white z-50">
//         <Container>
//           <div className="flex items-center justify-between py-4 lg:py-0">
//             {/* Mobile Logo */}
//             <div className="lg:hidden">
//               <Logo />
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="lg:hidden p-2"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex flex-1">
//               <Navbar />
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
//             <MobileNavbar setIsOpen={setIsOpen} />
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// }

// function Navbar() {
//   const pathname = usePathname();

//   return (
//     <div className="mt-6 flex-1 flex justify-between items-center">
//       <div className="flex-4">
//         <ul className="flex justify-center items-center font-medium gap-[40px] text-[18px]">
//           <NavItems pathname={pathname} />
//         </ul>
//       </div>
//       <div className="flex-1 justify-center flex items-center">
//         <Logo />
//       </div>
//       <div className="flex-1 flex justify-end">
//         <CustomButton type="primary">
//           <Link href={'/store'}>Order now</Link>
//         </CustomButton>
//       </div>
//     </div>
//   );
// }

// interface MobileNavbarProps {
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function MobileNavbar({ setIsOpen }: MobileNavbarProps) {
//   const pathname = usePathname();

//   return (
//     <div className="py-4">
//       <ul className="flex flex-col space-y-4">
//         <NavItems pathname={pathname} mobile setIsOpen={setIsOpen} />
//       </ul>
//       <div className="mt-4">
//         <div className="flex justify-center">
//           <CustomButton type="primary">
//             <Link href={'/store'} onClick={() => setIsOpen(false)}>
//               Order now
//             </Link>
//           </CustomButton>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface NavItemsProps {
//   pathname: string;
//   mobile?: boolean;
//   setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function NavItems({ pathname, mobile, setIsOpen }: NavItemsProps) {
//   const navLinks = [
//     { href: '/', label: 'Home', matchPath: '/home' },
//     { href: '/store', label: 'Store' },
//     { href: '#about', label: 'About us', isAnchor: true },
//     { href: '/contact', label: 'Contact us' },
//   ];

//   return (
//     <>
//       {navLinks.map((link, index) => (
//         <React.Fragment key={link.href}>
//           <li
//             className={cn(
//               'cursor-pointer transition-all duration-300 hover:text-[#FF9900]',
//               (pathname === link.matchPath || pathname === link.href) &&
//                 'text-[#FF9900]',
//               mobile && 'text-center',
//             )}
//           >
//             {link.isAnchor ? (
//               <a href={link.href} onClick={() => mobile && setIsOpen?.(false)}>
//                 {link.label}
//               </a>
//             ) : (
//               <Link
//                 href={link.href}
//                 onClick={() => mobile && setIsOpen?.(false)}
//               >
//                 {link.label}
//               </Link>
//             )}
//           </li>
//           {!mobile && index < navLinks.length - 1 && (
//             <li className="w-[11px] h-[11px] bg-[#FF9900] rounded-full" />
//           )}
//         </React.Fragment>
//       ))}
//     </>
//   );
// }
// 'use client';
// import React, { useState } from 'react';
// import Container from '../LocalUi/container/Container';

// import AlignJustify from '@geist-ui/icons/alignJustify';
// import X from '@geist-ui/icons/x';

// import { AnimatePresence, motion } from 'framer-motion';
// import Link from 'next/link';

// import {
//   DESKTOP_MENU_LIST_LEFT,
//   DESKTOP_MENU_LIST_RIGHT,
//   MENU_LIST,
// } from '@/constants';

// import { cn } from '@/lib/utils';
// import { usePathname } from 'next/navigation';

// export default function Navigation() {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div className="sticky top-0 left-0 w-full z-50 bg-white">
//       <Container>
//         <div className="flex max-lg:h-[60px] h-[79px] justify-between items-center">
//           <div className="logo lg:hidden">
//             <h2 className="text-2xl text-black">Logo</h2>
//           </div>
//           <NavMenu />
//           <div
//             onClick={handleOpen}
//             className="lg:hidden text-black cursor-pointer"
//           >
//             <AlignJustify />
//           </div>
//         </div>
//       </Container>
//       <SlideMenu handleClose={handleClose} open={open} />
//     </div>
//   );
// }

// function NavMenu() {
//   const pathname = usePathname();

//   return (
//     <div className=" relative  max-lg:hidden w-full h-full flex justify-between items-center">
//       <ul className="h-full flex flex-2 justify-center gap-[45px] items-center">
//         {DESKTOP_MENU_LIST_LEFT.map((menu) => (
//           <li
//             className={cn(
//               'flex justify-center items-center h-full hover-underline',
//               pathname == menu.path ? 'active' : '',
//             )}
//             key={menu.id}
//           >
//             <Link className="text-[#004c4c]" href={menu.path}>
//               {menu.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <div className="logo absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex justify-center items-center flex-1">
//         <h2 className="text-2xl text-black">Logo</h2>
//       </div>
//       <ul className=" flex-2 flex gap-[45px] justify-center items-center h-full">
//         {DESKTOP_MENU_LIST_RIGHT.map((menu) => (
//           <li
//             className={cn(
//               'flex justify-center items-center h-full hover-underline',
//               pathname == menu.path ? 'active' : '',
//             )}
//             key={menu.id}
//           >
//             <Link className="text-[#004c4c]" href={menu.path}>
//               {menu.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function SlideMenu({
//   open,
//   handleClose,
// }: {
//   open: boolean;
//   handleClose: () => void;
// }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="bg-black/80 absolute top-0 left-0 w-full h-dvh"
//           onClick={(e) => {
//             if (e.currentTarget === e.target) handleClose();
//           }} // Close on click outside
//         >
//           <motion.div
//             initial={{ opacity: 0, x: '100%' }}
//             animate={{ opacity: 1, x: '0%' }}
//             exit={{ opacity: 0, x: '100%' }}
//             transition={{ duration: 0.3 }}
//             className="w-[300px] ml-auto bg-orange-700 h-full"
//           >
//             <div
//               onClick={handleClose}
//               className="absolute top-5 right-5 text-white"
//             >
//               <X size={30} className="cursor-pointer " />
//             </div>
//             <SlideMenuList handleClose={handleClose} />
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// function SlideMenuList({ handleClose }: { handleClose: () => void }) {
//   const pathname = usePathname();

//   return (
//     <ul className="flex flex-col justify-center pt-40">
//       {MENU_LIST.map((item) => (
//         <li
//           key={item.id}
//           onClick={handleClose}
//           className={cn(
//             'text-white text-2xl  transition-all px-10 py-1 duration-300 hover:bg-orange-400 hover:text-black cursor-pointer',
//             pathname == item.path ? 'text-blue-200' : '',
//           )}
//         >
//           <Link href={item.path}>{item.name}</Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DESKTOP_MENU_LIST_LEFT as MENU_ITEMS_LEFT,
  DESKTOP_MENU_LIST_RIGHT as MENU_ITEMS_RIGHT,
} from '@/constants';
import Container from '../LocalUi/container/Container';

export default function Navigation() {
  return (
    <Container>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start lg:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">MS Jannat Inc</span>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 items-center">
            <nav className="flex items-center space-x-6 text-[16px] font-medium">
              <DesktopNav items={MENU_ITEMS_LEFT} />
            </nav>
          </div>

          <div className="flex items-center lg:hidden">
            <Sheet>
              <SheetContent side="right" className="pr-0">
                <div className="mt-12">
                  <MobileNav />
                </div>
              </SheetContent>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">MS Jannat</span>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-end">
            <nav className="flex items-center space-x-6 text-[16px] font-medium">
              <DesktopNav items={MENU_ITEMS_RIGHT} />
            </nav>
          </div>
        </div>
      </header>
    </Container>
  );
}

function DesktopNav({ items }: { items: typeof MENU_ITEMS_LEFT }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className={cn(
            'transition-colors hover:text-[#FF9900]',
            pathname === item.path ? 'text-[#FF9900]' : 'text-foreground/60',
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-3">
      {[...MENU_ITEMS_LEFT, ...MENU_ITEMS_RIGHT].map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className={cn(
            'text-[#000000] uppercase font-[600] text-[20px] transition-colors hover:[#222222ab]',
            pathname === item.path && 'text-foreground',
          )}
        >
          {item.name}
        </Link>
      ))}

      <ul>

      </ul>
    </div>
  );
}