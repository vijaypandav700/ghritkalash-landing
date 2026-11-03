"use client";

import Link from "next/link";
import { X, ShieldCheck, ShoppingBag, ArrowRight, ExternalLink } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

const NAV_LINKS = [
  { label: "Order Now", href: "#order" },
  { label: "Our Heritage", href: "#heritage" },
  { label: "The Bilona Process", href: "#process" },
  { label: "Nutritional Facts", href: "#nutrition" },
  { label: "Customer Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faq" },
];

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-[#072819] text-white flex flex-col shadow-2xl border-r border-[#155335]"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#13492e] bg-[#0b3823]">
          <BrandLogo variant="light" size="sm" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-white/10 text-[#d8ebdf] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="px-6 py-3.5 bg-[#0a311f] border-b border-[#144b2f] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#f8ecd2]">Traditional Bilona Ghee</p>
            <p className="text-[11px] text-[#a3cbb5]">Glass Jar 500 ml &amp; 1 Litre</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#d4af37]/20 text-[#ffd978] px-2 py-0.5 rounded-full border border-[#d4af37]/40">
            A2 Cow Ghee
          </span>
        </div>

        {/* Links */}
        <ul className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#d8ebd9] hover:bg-[#11492e] hover:text-[#ffd978] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Trust block */}
        <div className="p-4 mx-3 mb-3 rounded-2xl bg-[#0f3c26] border border-[#1d633f] text-xs text-[#cde2d5] space-y-1">
          <div className="flex items-center gap-1.5 text-[#ffd978] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Lab-Tested &amp; Certified Purity</span>
          </div>
          <p className="text-[11px] opacity-80">
            Traditional Bilona Method &bull; Single Ingredient &bull; Desi Cow Milk Fat
          </p>
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-[#13492e] bg-[#072417]">
          <a
            href="#order"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider btn-anveshan-gold text-[#0b2f1e]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Pure A2 Ghee</span>
          </a>
        </div>
      </nav>
    </>
  );
}
