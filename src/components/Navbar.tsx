"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { Button, Divider, Flex } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify/utils";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Book, Menu } from "lucide-react";

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
        case "signedOut":
          setAuthCheck(false);

          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
      }
    });

    return () => hubListenerCancel();
  }, [router]);

  const signOutSignIn = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push("/signin");
    }
  };
  const defaultRoutes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/add",
      label: "Add Entry",
      loggedIn: true,
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined
  );

  return (
    <>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="#">
              <Book className="h-6 w-6" />
              <span className="sr-only">Odyseey</span>
            </Link>
            <div className="grid gap-2 py-6">
              {routes.map((route, idx) => {
                return (
                  <Link
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    href={route.href}
                    key={route.href}
                  >
                    {route.label}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
        <Link className="mr-6 hidden lg:flex" href="#">
          <Book className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {routes.map((route, idx) => {
              return (
                <NavigationMenuLink key={route.href} asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    href={route.href}
                  >
                    {route.label}
                  </Link>
                </NavigationMenuLink>
              );
            })}
            <NavigationMenuLink>
              <Button  onClick={signOutSignIn} variant={"link"} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"> 
              {authCheck ? "Sign Out" : "Sign In"}  
              </Button>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </>
  );
}
