"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import MobileMenu from "@/components/layout/MobileMenu";
import BrandLogo from "@/components/ui/BrandLogo";

const ANNOUNCEMENTS = [
  "Pure A2 Desi Cow Milk · Traditional Bilona Method · Handcrafted",
  "60+ Parameters Tested for Purity & Quality",
  "Premium Glass Jar · Zero Plastic Contact · Rich Danedar Texture",
  "Free Delivery on Orders Above ₹499 · Across India",
];

const NAV_LINKS = [
  { label: "Order", href: "#order" },
  { label: "Our Heritage", href: "#heritage" },
  { label: "The Process", href: "#process" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ onOrderClick }) {
  const { totalQty, setIsOpen: setCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Top Announcement Ticker ──────────────────────────────────────── */}
      <div className="bg-[#0b3b24] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <span className="text-[12px] font-medium tracking-wide text-[#d4eadc] text-center">
            {ANNOUNCEMENTS[announcementIndex]}
          </span>
        </div>
      </div>

      {/* ── Main Sticky Header ───────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 bg-[#fdfaf4]/97 backdrop-blur-md border-b border-[#e8d9bb] transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* Hamburger – Mobile */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 text-[#0b3b24] hover:bg-[#e8d9bb]/50 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="shrink-0" aria-label="GHRITKALASH Home">
            <BrandLogo variant="dark" size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#3a3028]" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#0b3b24] transition-colors py-1 border-b-2 border-transparent hover:border-[#c09320]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="p-2 text-[#3a3028] hover:text-[#0b3b24] hover:bg-[#e8d9bb]/50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Cart (${totalQty} items)`}
              className="relative p-2 text-[#0b3b24] hover:bg-[#e8d9bb]/50 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0b3b24] text-[#ffd978] text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center border-2 border-[#fdfaf4]">
                  {totalQty > 99 ? "99+" : totalQty}
                </span>
              )}
            </button>

            {/* Order CTA */}
            <a
              href="#order"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase btn-anveshan-primary"
            >
              <span>Order Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[#e8d9bb] bg-[#fdfaf4] px-4 sm:px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8f7956] shrink-0" />
              <input
                type="search"
                placeholder="Search GHRITKALASH A2 Cow Ghee, 500ml, 1 Litre..."
                autoFocus
                className="flex-1 bg-transparent text-sm text-[#1e1810] placeholder:text-[#ab9d85] focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 text-[#8f7956] hover:text-[#1e1810]">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
