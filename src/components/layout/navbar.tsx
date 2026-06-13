"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    const ckUrl = process.env.NEXT_PUBLIC_CAMPUSKARTT_URL ?? "https://www.campuskartt.in";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const callbackUrl = `${ckUrl}/app/login.html?action=logout&redirect_to=${encodeURIComponent(appUrl)}`;
    signOut({ callbackUrl });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = session
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
        { href: "/repairs", label: "Repairs", icon: Wrench },
        { href: "/profile", label: "Profile", icon: User },
      ]
    : [
        { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
        { href: "#how-it-works", label: "How It Works", icon: null },
      ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#080808]/90 backdrop-blur-xl border-b border-[#1f1f1f]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Logo height={28} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-zinc-400 hover:text-zinc-100 hover:bg-white/4 transition-all"
              >
                {link.icon && <link.icon className="w-3.5 h-3.5" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                {(session.user as { isAdmin?: boolean }).isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-violet-400 hover:bg-violet-400/8 transition-all"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-zinc-400 hover:text-zinc-100 hover:bg-white/4 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-[13px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all"
                >
                  Dashboard
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-3 py-1.5 rounded-lg text-[13px] text-zinc-400 hover:text-zinc-100 hover:bg-white/4 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-[13px] font-medium bg-white text-black hover:bg-zinc-100 transition-all"
                >
                  Get Started
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed left-0 right-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-[#0f0f0f]/98 border-b border-[#1f1f1f] px-4 py-4 space-y-1 shadow-2xl shadow-black/40">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center gap-2 px-3 py-2.5 rounded-lg text-[14px] text-zinc-400 hover:text-zinc-100 hover:bg-white/4 transition-all"
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {session ? (
              <button
                onClick={handleSignOut}
                className="flex min-h-11 items-center gap-2 px-3 py-2.5 rounded-lg text-[14px] text-red-400 hover:bg-red-400/8 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-center justify-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
