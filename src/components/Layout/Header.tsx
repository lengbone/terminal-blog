"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/Theme";

const navItems = [
  { href: "/", label: "~" },
  { href: "/posts", label: "posts" },
  { href: "/tags", label: "tags" },
  { href: "/search", label: "search" },
  { href: "/about", label: "about" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[var(--terminal-bg)]/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-4xl mx-auto px-2 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[var(--terminal-green)] hover:opacity-80 transition-colors font-medium">
            <span className="text-[var(--terminal-purple)]">~</span>/blog
          </Link>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href
                    ? "text-[var(--terminal-green)]"
                    : "text-[var(--terminal-gray)] hover:text-[var(--terminal-green)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile nav toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-wrap gap-4">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm transition-colors ${
                  pathname === item.href
                    ? "text-[var(--terminal-green)]"
                    : "text-[var(--terminal-gray)] hover:text-[var(--terminal-green)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
