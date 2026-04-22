"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Overview", href: "/items/overview" },
  { label: "Explore",  href: "/items/explore" },
  { label: "Insights", href: "/items/insights" },
  { label: "Contact",  href: "/items/contact" },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const router   = useRouter();
  const pathname = usePathname();
  const menuRef  = useRef<HTMLDivElement>(null);

  // Darken navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (Sync state during render to avoid cascading renders)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 md:bg-white/20 backdrop-blur-2xl border-b border-orange-400/10 shadow-sm shadow-orange-100/10"
          : "bg-orange-50/10 backdrop-blur-2xl md:backdrop-blur-xl border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl px-4 md:px-6 lg:px-8  mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <button
          onClick={() => router.push("/items/overview")}
          className="text-2xl font-semibold tracking-tight cursor-pointer bg-gradient-to-br from-[#FF6B2C] to-[#E85A1A] bg-clip-text text-transparent"
        >
          Evently
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`relative text-sm font-medium transition-colors duration-200 cursor-pointer group ${
                isActive(link.href)
                  ? "text-orange-600"
                  : "text-neutral-600 hover:text-orange-600"
              }`}
            >
              {link.label}
              {/* Active indicator */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-orange-500 transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA desktop */}
        <button
          onClick={() => router.push("/items/explore")}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 shadow-sm shadow-orange-300/40 cursor-pointer"
        >
          Find Events →
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-orange-50 transition cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/10 backdrop-blur-2xl border-t border-orange-400/10 py-4 px-6 flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition cursor-pointer ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600"
                    : "text-neutral-600 hover:bg-orange-50/60 hover:text-orange-600"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => router.push("/items/explore")}
              className="mt-2 w-full py-3 rounded-full text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition cursor-pointer"
            >
              Find Events →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
