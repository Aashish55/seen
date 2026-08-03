"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { navigation, siteConfig } from "@/lib/site-config";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setMobileNavOpen } from "@/lib/store/ui-slice";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-2.5"
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-background">
        <Image src="/logo.png" alt="SEEN Logo" width={26} height={26} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-heading text-sm font-semibold tracking-tight text-white md:text-base">
          {siteConfig.name}
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mobileNavOpen = useAppSelector((state) => state.ui.mobileNavOpen);

  const closeMobileNav = () => dispatch(setMobileNavOpen(false));

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top utility bar */}
      <div className="bg-navy text-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 lg:px-6">
          <Logo />
          <div className="hidden items-center gap-4 text-xs md:flex">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="size-3.5" aria-hidden />
              {siteConfig.email}
            </a>
            <Link href="/membership#apply" className="hover:text-white">
              Join
            </Link>
            <Link href="/studio" className="hover:text-white">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-end px-4 lg:justify-center lg:px-6">
        {/* Desktop navigation */}
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList>
            {navigation.map((item) =>
              item.children ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent",
                      pathname.startsWith(item.href) && "text-primary"
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-72 gap-1 p-2">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavigationMenuLink asChild>
                            <Link href={child.href} className="flex flex-col items-start !gap-0">
                              <span className="text-sm font-medium">{child.label}</span>
                              {child.description ? (
                                <span className="line-clamp-1 text-xs text-muted-foreground">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent",
                      pathname === item.href && "text-primary"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile navigation */}
        <Sheet
          open={mobileNavOpen}
          onOpenChange={(open) => dispatch(setMobileNavOpen(open))}
        >
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="size-5" aria-hidden />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left font-heading">
                {siteConfig.shortName} Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pb-8" aria-label="Mobile">
              <Accordion type="multiple" className="w-full">
                {navigation.map((item) =>
                  item.children ? (
                    <AccordionItem key={item.label} value={item.label}>
                      <AccordionTrigger className="py-3 text-sm font-medium">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-1 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={closeMobileNav}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div key={item.label} className="border-b">
                      <Link
                        href={item.href}
                        onClick={closeMobileNav}
                        className="block py-3 text-sm font-medium hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </div>
                  )
                )}
              </Accordion>
              <Button asChild className="mt-4" onClick={closeMobileNav}>
                <Link href="/membership#apply">Join Now</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
