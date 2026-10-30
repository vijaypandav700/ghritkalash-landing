"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "#why-a2" },
  { label: "Bilona Process", href: "#bilona-process" },
  { label: "Our Products", href: "#shop" },
  { label: "Benefits", href: "#benefits" },
  { label: "Reviews", href: "#reviews" },
];

const HELP_LINKS = [
  { label: "FAQ", action: "faq" },
  { label: "Shipping & Returns", action: "shipping" },
  { label: "Contact Us", action: "contact" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <polygon points="10 15 15 12 10 9 10 15" />
      </svg>
    ),
  },
];

/**
 * Footer
 *
 * Static footer component — no cart/toast dependencies.
 *
 * @param {{ onHelpClick?: (action: string) => void }} props
 */
export default function Footer({ onHelpClick }) {
  return (
    <footer className="bg-[#091f14] text-[#d3e2d8] pt-14 pb-10 border-t border-[#1d402e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1b3d2c]">

          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.18em] text-[#f7ecd0] uppercase block">
                GHRITKALASH
              </span>
              <span className="text-[10px] tracking-[0.28em] font-semibold text-[#e4a938] uppercase">
                Pure A2 Cow Ghee
              </span>
            </div>
            <p className="text-xs text-[#a2bbaa] leading-relaxed">
              Crafted in small batches through Vedic Bilona churning of curd from
              grass-fed indigenous Indian cows.
            </p>
            <div className="flex items-center gap-1.5 text-[#e4a938] text-xs">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Made with love in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f8e7b9] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-xs text-[#a5bfb0] hover:text-[#e4a938] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f8e7b9] uppercase tracking-wider">Help</h4>
            <ul className="space-y-2">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => onHelpClick?.(l.action)}
                    className="text-xs text-[#a5bfb0] hover:text-[#e4a938] transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#f8e7b9] uppercase tracking-wider">
              Stay Connected
            </h4>
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#23503a] flex items-center justify-center text-[#a5bfb0] hover:text-[#e4a938] hover:border-[#e4a938] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-[11px] text-[#6d8f7c]">
              Secure payments powered by Razorpay
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#789684]">
          <p>&copy; 2026 GHRITKALASH. All Rights Reserved.</p>
          <p>Authentic Vedic A2 Desi Cow Ghee &bull; Pure Tradition. Healthier Tomorrow.</p>
        </div>
      </div>
    </footer>
  );
}
