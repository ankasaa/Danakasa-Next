"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "@/lib/site";

const emptySubscribe = () => () => {};

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-white/10"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink ring-1 ring-neutral-200 transition-colors duration-300 hover:bg-neutral-100 dark:text-white dark:ring-white/15 dark:hover:bg-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-flex"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

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
      className={`sticky top-0 z-50 flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4 transition-shadow duration-300 dark:border-neutral-800 dark:bg-neutral-900 lg:px-12 ${
        isScrolled ? "shadow-md shadow-neutral-200/50 dark:shadow-neutral-950/50" : ""
      }`}
    >
      <Link
        href="/"
        aria-label="DanaKasa — Beranda"
        className="-mr-8 flex shrink-0 items-center transition-opacity hover:opacity-80 md:-mr-12"
      >
        <Image
          src="/logo/danakasa-hitam.png"
          alt="DanaKasa"
          width={192}
          height={48}
          priority
          className="block h-10 w-auto object-contain transform scale-[2] origin-left md:h-12 md:scale-[2.5] dark:hidden"
        />
        <Image
          src="/logo/danakasa-putih.png"
          alt="DanaKasa"
          width={192}
          height={48}
          className="hidden h-10 w-auto object-contain transform scale-[2] origin-left md:h-12 md:scale-[2.5] dark:block"
        />
      </Link>

      <nav
        aria-label="Navigasi utama"
        className="hidden items-center gap-8 lg:flex"
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-medium text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-400"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-neutral-100 dark:text-white dark:hover:bg-white/10 lg:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 top-full flex flex-col gap-2 border-t border-neutral-100 bg-white px-6 pb-6 pt-4 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 lg:hidden ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="rounded-md px-3 py-2 font-medium text-neutral-700 hover:bg-brand-50 hover:text-brand-600 dark:text-neutral-400 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}