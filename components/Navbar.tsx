"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4 transition-shadow duration-300 lg:px-12 ${
        isScrolled ? "shadow-md shadow-neutral-200/50" : ""
      }`}
    >
      <Link
        href="/"
        className="text-xl font-bold tracking-tight text-ink transition-opacity hover:opacity-70"
      >
        {site.name}
      </Link>

      <nav
        aria-label="Navigasi utama"
        className="hidden items-center gap-8 lg:flex"
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-medium text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-600"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-neutral-100 lg:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 top-full flex flex-col gap-2 border-t border-neutral-100 bg-white px-6 pb-6 pt-4 transition-all duration-300 lg:hidden ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="rounded-md px-3 py-2 font-medium text-neutral-700 hover:bg-brand-50 hover:text-brand-600"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}