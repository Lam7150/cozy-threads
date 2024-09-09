// 'use client';

// import { useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger
// } from '@/components/ui/sheet';

// import { Button, buttonVariants } from '@/components/ui/button';
// import { Menu } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

// interface RouteProps {
//   href: string;
//   label: string;
// }

// const routeList: RouteProps[] = [
//   {
//     href: '/cart',
//     label: 'Cart'
//   }
// ];

export const Navbar = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex justify-between px-6 w-screen h-14">
          <NavigationMenuItem className="flex font-bold">
            <Image
              src="/cozy_threads.png"
              alt={`cozy threads logo`}
              sizes="10vw"
              layout="fit"
              objectFit="cover"
              width={64}
              height={64}
            />
            <Link
              shallow
              rel="noreferrer noopener"
              href="/"
              className="flex self-center text-xl font-bold text-secondary"
            >
              Cozy Threads
            </Link>
          </NavigationMenuItem>

          {/* mobile
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2" asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-secondary">
                    Cozy Threads
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 justify-center items-center mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`${buttonVariants({ variant:'ghost'})} text-secondary`}
                    >
                      <span className="flex flex-row gap-1.5 items-center text-lg">
                        {label === 'Cart' ? <FaCartShopping /> : null}
                        {label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </span> */}

          {/* desktop */}
          <nav className="hidden gap-2 md:flex">
            {/* {routeList.map((route: RouteProps, i) => ( */}
            <Link
              rel="noreferrer noopener"
              href={'/cart'}
              shallow
              // key={i}
              className={`${buttonVariants({ variant: 'ghost' })} text-secondary`}
            >
              <span className="flex flex-row gap-1.5 items-center text-lg">
                <FaCartShopping />
                {'Cart'}
              </span>
            </Link>
            {/* ))} */}
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
