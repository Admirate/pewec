"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Mulish } from "next/font/google";
import { LayoutDashboard, GraduationCap, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Course Enquiries",
    href: "/admin/course-enquiries",
    icon: GraduationCap,
  },
  {
    name: "Contact Enquiries",
    href: "/admin/contact-enquiries",
    icon: MessageSquare,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication on mount
  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    // TODO: Backend Engineer - Replace with proper auth check
    // Option 1: Check Supabase Auth session
    // Option 2: Verify JWT token with API
    // Option 3: Use NextAuth.js session
    //
    // Example:
    // const checkAuth = async () => {
    //   const res = await fetch("/api/admin/verify");
    //   const data = await res.json();
    //   if (!data.authenticated) {
    //     router.push("/admin/login");
    //   } else {
    //     setIsAuthenticated(true);
    //   }
    // };
    // checkAuth();

    // Temporary: Simple localStorage check (NOT SECURE - just for demo)
    const auth = localStorage.getItem("admin_authenticated");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    // TODO: Backend Engineer - Implement proper logout
    // Clear session/token, call logout API, etc.
    localStorage.removeItem("admin_authenticated");
    router.push("/admin/login");
  };

  // Show nothing while checking auth (prevents flash)
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Login page gets minimal layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className={`${mulish.className} min-h-screen bg-gray-100`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#c44944] text-white z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png"
                alt="PEWEC Logo"
                width={50}
                height={50}
                className="w-10 h-10 object-contain bg-white rounded-full p-1"
              />
              <span className="font-bold text-lg">PEWEC Admin</span>
            </Link>
            <button
              className="lg:hidden p-1 hover:bg-white/10 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active ? "bg-white text-[#c44944] font-semibold" : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all mb-2"
          >
            <LogOut size={20} />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden sm:block">Welcome, Admin</span>
              <div className="w-8 h-8 bg-[#c44944] rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
