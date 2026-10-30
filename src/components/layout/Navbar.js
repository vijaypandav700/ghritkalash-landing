"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import MobileMenu from "@/components/layout/MobileMenu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "#why-a2" },
  { label: "Why A2", href: "#why-a2" },
  { label: "Bilona Process", href: "#bilona-process" },
  { label: "Benefits", href: "#benefits" },
  { label: "Reviews", href: "#reviews" },
  { label: "Shop", href: "#shop" },
];

/**
 * Navbar
 *
 * Sticky top navigation with logo, desktop links, search, cart icon and
 * a hamburger that opens the MobileMenu drawer.
 */
export default function Navbar() {
  const { totalQty, setIsOpen: setCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#ece3d2]/80 shadow-[0_2px_12px_rgba(40,30,20,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center shrink-0 group" aria-label="GHRITKALASH home">
            <div className="flex items-center gap-1 text-[#1b432e] group-hover:text-[#b87b14] transition-colors mb-0.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.5 8c-.3 0-.6.1-.8.2L16 6.5V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v1.5L9.3 8.2c-.2-.1-.5-.2-.8-.2C7.1 8 6 9.1 6 10.5V14c0 1.9 1.3 3.5 3 3.9V20c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-2h2v2c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-2.1c1.7-.4 3-2 3-3.9v-3.5c0-1.4-1.1-2.5-2.5-2.5zm-8.5 7c-.8 0-1.5-.7-1.5-1.5S10.2 12 11 12s1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm5 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
              </svg>
            </div>
            <span className="font-serif text-xl font-bold tracking-[0.15em] text-[#1c2e22] uppercase group-hover:text-[#b87b14] transition-colors leading-none">
              GHRITKALASH
            </span>
            <span className="text-[9px] tracking-[0.28em] font-semibold text-[#8b7654] uppercase">
              Pure A2 Cow Ghee
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#3d3429]" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#133c27] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#b87b14] after:transition-all hover:after:w-full pb-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Toggle search"
              className="p-2.5 text-[#463b2f] hover:text-[#133c27] hover:bg-[#ebdcc4]/40 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart (${totalQty} items)`}
              className="relative p-2.5 text-[#463b2f] hover:text-[#133c27] hover:bg-[#ebdcc4]/40 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQty > 0 && (
                <span className="absolute top-1 right-1 bg-[#133c27] text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                  {totalQty > 99 ? "99+" : totalQty}
                </span>
              )}
            </button>

            {/* Shop CTA – desktop */}
            <a
              href="#shop"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase btn-amazon-primary"
            >
              Shop Now
            </a>

            {/* Hamburger – mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2.5 text-[#463b2f] hover:bg-[#ebdcc4]/40 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#ece3d2] bg-[#fbf9f4] px-4 sm:px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8b7654] shrink-0" />
              <input
                type="search"
                placeholder="Search for A2 ghee, Bilona process…"
                autoFocus
                className="flex-1 bg-transparent text-sm text-[#2c221a] placeholder:text-[#b9a98c] focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="w-4 h-4 text-[#8b7654] hover:text-[#2c221a] transition-colors" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
