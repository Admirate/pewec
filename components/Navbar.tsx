"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Mulish } from "next/font/google";
import { cn } from "@/lib/utils";
import PillNav from "@/components/PillNav";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["600"],
});

const navItems = [
  { name: "Home", href: "/", label: "Home" },
  { name: "About Us", href: "/about", label: "About Us" },
  { name: "Courses", href: "/courses", label: "Courses" },
  { name: "Sister Institutions", href: "/sister-institutions", label: "Sister Institutions" },
  { name: "Contact Us", href: "/contact", label: "Contact Us" },
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png"
            alt="PEWEC Logo"
            width={140}
            height={80}
            className="w-16 sm:w-20 md:w-24 lg:w-32 xl:w-36 h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop: PillNav */}
        <div className="hidden lg:block">
          <PillNav
            items={navItems}
            baseColor="#c44944"
            pillColor="#c44944"
            pillTextColor="#ffffff"
            hoveredPillTextColor="#c44944"
            initialLoadAnimation={false}
          />
        </div>

        {/* Tablet & Mobile: Sheet Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12">
                <Menu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 sm:w-72 bg-white p-4 sm:p-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {/* LOGO */}
              <div className="mb-8 sm:mb-10">
                <Image
                  src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png"
                  alt="logo"
                  width={120}
                  height={60}
                  className="w-20 sm:w-28 h-auto"
                />
              </div>

              {/* MOBILE LINKS */}
              <nav className="flex flex-col gap-4 sm:gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      mulish.className,
                      "text-base sm:text-lg font-semibold transition",
                      isActive(item.href) ? "text-[#c44944]" : "text-gray-700 hover:text-[#c44944]",
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
