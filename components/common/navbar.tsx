"use client";
import Link from "next/link";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import LogoutConfirmationModal from "@/components/common/logout-confirmation-modal";

import { cn } from "@/lib/utils";

import { LogOut, Menu, Phone, User, X } from "lucide-react";

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Book Appointment",
    href: "/appointment",
  },
];

function getInitials(name?: string | null, email?: string | null) {
  const value = name?.trim() || email?.trim() || "User";
  const parts = value.split(/\s+/);
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return value.slice(0, 2).toUpperCase();
}

function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const { data: session } = useSession();
  const dropdownRef = useRef HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const userName = session?.user?.fullName || session?.user?.name || "My Account";
  const userEmail = session?.user?.email;
  const profileImage = session?.user?.profileImage || session?.user?.image;

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    onNavigate?.();
    router.push("/profile");
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutOpen(true);
  };

  return (
    &lt;&gt;
      &lt;div ref={dropdownRef} className="relative"&gt;
        &lt;button
          type="button"
          aria-label="Open account menu"
          onClick={() => setIsDropdownOpen((current) => !current)}
          className="flex h-11 min-w-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-1.5 pr-3 text-white transition hover:border-[#D89A2A] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A2A]/70"
        &gt;
          &lt;span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BB7B1D] bg-cover bg-center text-xs font-semibold text-white"
            style={profileImage ? { backgroundImage: `url(${profileImage})` } : undefined}
          &gt;
            {!profileImage ? getInitials(userName, userEmail) : null}
          &lt;/span&gt;
          &lt;span className="hidden max-w-28 truncate text-sm font-medium sm:block"&gt;
            {userName}
          &lt;/span&gt;
        &lt;/button&gt;
        {isDropdownOpen ? (
          &lt;div className="absolute right-0 top-full z-[90] mt-2 min-w-52 rounded-lg border border-white/10 bg-[#151515] p-1.5 text-white shadow-2xl"&gt;
            &lt;div className="border-b border-white/10 px-3 py-2"&gt;
              &lt;p className="truncate text-sm font-medium"&gt;{userName}&lt;/p&gt;
              {userEmail ? (
                &lt;p className="truncate text-xs text-white/60"&gt;{userEmail}&lt;/p&gt;
              ) : null}
            &lt;/div&gt;
            &lt;button
              type="button"
              onClick={handleProfileClick}
              className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm outline-none transition hover:bg-white/10 focus:bg-white/10"
            &gt;
              &lt;User className="h-4 w-4 text-[#D89A2A]" /&gt;
              Profile
            &lt;/button&gt;
            &lt;button
              type="button"
              onClick={handleLogoutClick}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-200 outline-none transition hover:bg-red-500/10 focus:bg-red-500/10"
            &gt;
              &lt;LogOut className="h-4 w-4" /&gt;
              Logout
            &lt;/button&gt;
          &lt;/div&gt;
        ) : null}
      &lt;/div&gt;
      &lt;LogoutConfirmationModal
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
      /&gt;
    &lt;/&gt;
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const isActiveRoute = (href: string) =&gt;
    href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY &gt; 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    &lt;header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled || isMenuOpen
          ? " bg-black/85 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "bg-transparent"
      )}
    &gt;
      &lt;div className="container mx-auto flex h-20 items-center justify-between px-5 sm:h-24 sm:px-6"&gt;
        {/* Logo */}
        &lt;Link
          href="/"
          className="text-white"
          onClick={() =&gt; setIsMenuOpen(false)}
        &gt;
          &lt;Image src="/logo.png" alt="logo" width={1000} height={1000} className="h-12 w-[72px] object-contain sm:h-14 sm:w-20 md:h-[70px] md:w-[100px]" /&gt;
        &lt;/Link&gt;
        {/* Phone link - Desktop */}
        &lt;div className="hidden lg:flex items-center"&gt;
          &lt;Link
            href="tel:+12145786729"
            className="flex items-center gap-1.5 text-base font-light text-[#FFFFFF] transition hover:text-[#D89A2A]"
          &gt;
            &lt;Phone className="h-4 w-4" /&gt;
            (214) 578-6729
          &lt;/Link&gt;
        &lt;/div&gt;
        {/* Menu */}
        &lt;nav className="hidden lg:flex items-center gap-10"&gt;
          {menus.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              &lt;Link
                key={item.title}
                href={item.href}
                className={cn(
                  "text-base font-light transition hover:text-[#D89A2A]",
                  isActive ? "text-[#D89A2A]" : "text-[#FFFFFF]"
                )}
              &gt;
                {item.title}
              &lt;/Link&gt;
            );
          })}
        &lt;/nav&gt;
        {/* CTA */}
        &lt;div className="hidden items-center gap-2 lg:flex"&gt;
          {isLoggedIn ? (
            &lt;UserMenu /&gt;
          ) : (
            &lt;Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-base font-medium text-[#BB7B1D] transition hover:bg-white/80"
            &gt;
              Login
            &lt;/Link&gt;
          )}
          &lt;Link
            href="/request-quote"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#BB7B1D] px-6 text-base font-medium text-white transition hover:bg-[#BB7B1D]/80"
          &gt;
            Request a Quote
          &lt;/Link&gt;
        &lt;/div&gt;
        &lt;button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() =&gt; setIsMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:border-[#D89A2A] hover:text-[#D89A2A] lg:hidden"
        &gt;
          {isMenuOpen ? (
            &lt;X className="h-5 w-5" /&gt;
          ) : (
            &lt;Menu className="h-5 w-5" /&gt;
          )}
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;div
        className={cn(
          "grid overflow-hidden border-t border-white/10 bg-black/95 px-5 transition-[grid-template-rows] duration-300 lg:hidden",
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      &gt;
        &lt;div className="min-h-0"&gt;
          {/* Phone link - Mobile */}
          &lt;div className="flex items-center gap-1.5 py-3"&gt;
            &lt;Link
              href="tel:+12145786729"
              onClick={() =&gt; setIsMenuOpen(false)}
              className="flex items-center gap-1.5 rounded-md px-3 py-3 text-sm font-light text-white transition hover:bg-white/10 hover:text-[#D89A2A]"
            &gt;
              &lt;Phone className="h-4 w-4" /&gt;
              (214) 578-6729
            &lt;/Link&gt;
          &lt;/div&gt;
          &lt;nav className="flex flex-col gap-1 py-4"&gt;
            {menus.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                &lt;Link
                  key={item.title}
                  href={item.href}
                  onClick={() =&gt; setIsMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-light transition hover:bg-white/10 hover:text-[#D89A2A]",
                    isActive ? "text-[#D89A2A]" : "text-white"
                  )}
                &gt;
                  {item.title}
                &lt;/Link&gt;
              );
            })}
          &lt;/nav&gt;
          &lt;div className="grid gap-3 pb-5 sm:grid-cols-2"&gt;
            {isLoggedIn ? (
              &lt;div className="flex justify-center sm:justify-start"&gt;
                &lt;UserMenu onNavigate={() =&gt; setIsMenuOpen(false)} /&gt;
              &lt;/div&gt;
            ) : (
              &lt;Link
                href="/login"
                onClick={() =&gt; setIsMenuOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-[#BB7B1D] transition hover:bg-white/80"
              &gt;
                Login
              &lt;/Link&gt;
            )}
            &lt;Link
              href="/request-quote"
              onClick={() =&gt; setIsMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#BB7B1D] px-5 text-sm font-medium text-white transition hover:bg-[#BB7B1D]/80"
            &gt;
              Request a Quote
            &lt;/Link&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/header&gt;
  );
}
