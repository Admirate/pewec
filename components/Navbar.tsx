"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Mulish } from "next/font/google";
import { cn } from "@/lib/utils";
import { SheetTitle } from "@/components/ui/sheet";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["600"],
});

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Sister Institutions", href: "/sister-institutions" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full relative top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png"
            alt="logo"
            width={140}
            height={80}
            className="w-20 md:w-28 lg:w-36 h-auto object-contain"
            priority
          />
        </Link>

        {/*Desktop Nav*/}
        <nav className="hidden lg:flex bg-[#c44944] text-white rounded-full px-10 lg:px-16 py-6 items-center gap-8 lg:gap-12 shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                mulish.className,
                "relative text-[28px] leading-[100%] font-semibold text-white group",
              )}
            >
              {item.name}

              {/* smooth sliding underline */}
              <span
                className={cn(
                  "absolute left-0 -bottom-2 h-0.5 bg-white transition-all duration-300 ease-in-out",
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Screen */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8 text-black" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-white p-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {/* LOGO */}
              <div className="mb-10">
                <Image
                  src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png"
                  alt="logo"
                  width={120}
                  height={60}
                  className="w-28 h-auto"
                />
              </div>

              {/* MOBILE LINKS */}
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      mulish.className,
                      "text-lg font-semibold transition",
                      isActive(item.href)
                        ? "text-[#c44944]"
                        : "text-gray-700 hover:text-[#c44944]",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
