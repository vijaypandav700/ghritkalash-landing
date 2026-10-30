"use client";

import Link from "next/link";
import { X } from "lucide-react";

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
 * MobileMenu
 *
 * Full-screen slide-in navigation drawer for mobile viewports.
 *
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className="fixed left-0 top-0 z-50 h-full w-72 bg-[#0f2c1f] text-white flex flex-col shadow-2xl"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1d4c36]">
          <div>
            <p className="font-serif text-lg font-bold tracking-wider text-[#f7ecd0] uppercase">
              GHRITKALASH
            </p>
            <p className="text-[10px] text-[#e4a938] tracking-widest uppercase">
              Pure A2 Cow Ghee
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-white/10 text-[#d1dfd6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[#c8ddd2] hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-[#1d4c36]">
          <a
            href="#shop"
            onClick={onClose}
            className="block w-full text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#e4a938] text-[#122b1c] hover:bg-[#f6c867] transition-colors"
          >
            Shop Now
          </a>
          <p className="text-[11px] text-[#6d8f7c] text-center mt-4">
            Secure payments via Razorpay
          </p>
        </div>
      </nav>
    </>
  );
}
