"use client";

import React from "react";

/**
 * BrandLogo
 * Accurate vector recreation of the GHRITKALASH brand identity
 * Features the sacred Kalash, glowing golden ghee droplet, Ayurvedic leaves,
 * and regal typography.
 */
export default function BrandLogo({
  variant = "dark", // "dark" (for light backgrounds) or "light" (for dark backgrounds)
  size = "md",      // "sm", "md", "lg"
  showSubtext = true,
  className = "",
}) {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-3",
  };

  const kalashSize = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
  };

  const titleSize = {
    sm: "text-base tracking-[0.14em]",
    md: "text-xl sm:text-2xl tracking-[0.18em]",
    lg: "text-2xl sm:text-3xl tracking-[0.22em]",
  };

  const subtextSize = {
    sm: "text-[7.5px] tracking-[0.22em]",
    md: "text-[9px] sm:text-[10px] tracking-[0.28em]",
    lg: "text-[11px] sm:text-[12px] tracking-[0.32em]",
  };

  return (
    <div className={`flex items-center ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      {/* Kalash Emblem */}
      <div className={`relative ${kalashSize[size] || kalashSize.md} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle border gold */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            opacity="0.85"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="url(#goldGrad)"
            strokeWidth="1.2"
          />

          {/* Left Leaf (Ayurvedic/Tulsi leaf) */}
          <path
            d="M 60 76 C 45 76 28 66 24 50 C 34 50 50 57 58 68 Z"
            fill="url(#leafGradLeft)"
            stroke="#d4af37"
            strokeWidth="1.2"
          />
          {/* Leaf vein left */}
          <path
            d="M 28 52 C 40 58 52 64 58 70"
            stroke="#ffd978"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Right Leaf */}
          <path
            d="M 60 76 C 75 76 92 66 96 50 C 86 50 70 57 62 68 Z"
            fill="url(#leafGradRight)"
            stroke="#d4af37"
            strokeWidth="1.2"
          />
          {/* Leaf vein right */}
          <path
            d="M 92 52 C 80 58 68 64 62 70"
            stroke="#ffd978"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Sacred Kalash Body */}
          {/* Lid / Top Finial */}
          <path
            d="M 54 26 L 66 26 L 63 32 L 57 32 Z"
            fill="url(#goldGrad)"
          />
          <circle cx="60" cy="24" r="3" fill="#ffdf7e" />
          <path
            d="M 50 32 C 55 35 65 35 70 32 L 72 36 C 65 38 55 38 48 36 Z"
            fill="url(#goldGrad)"
            stroke="#b3821a"
            strokeWidth="0.8"
          />

          {/* Kalash Neck & Shoulders */}
          <path
            d="M 52 36 C 52 42 42 46 40 55 C 38 66 45 78 60 78 C 75 78 82 66 80 55 C 78 46 68 42 68 36 Z"
            fill="url(#kalashBodyGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />

          {/* Golden Ghee Droplet Inside Kalash */}
          <path
            d="M 60 48 C 60 48 53 58 53 64 C 53 68 56 71 60 71 C 64 71 67 68 67 64 C 67 58 60 48 60 48 Z"
            fill="url(#gheeDropGrad)"
            filter="drop-shadow(0 2px 4px rgba(220,150,20,0.6))"
          />
          {/* Ghee droplet highlight shine */}
          <ellipse
            cx="58"
            cy="62"
            rx="2"
            ry="4"
            transform="rotate(-25 58 62)"
            fill="#ffffff"
            opacity="0.75"
          />

          {/* Kalash Base Pedestal */}
          <path
            d="M 50 78 L 70 78 L 72 82 L 48 82 Z"
            fill="url(#goldGrad)"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fdf0b0" />
              <stop offset="35%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#aa7c11" />
              <stop offset="100%" stopColor="#f9e28e" />
            </linearGradient>
            <linearGradient id="leafGradLeft" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0a3c26" />
              <stop offset="50%" stopColor="#1e5e3d" />
              <stop offset="100%" stopColor="#3d915d" />
            </linearGradient>
            <linearGradient id="leafGradRight" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0a3c26" />
              <stop offset="50%" stopColor="#1e5e3d" />
              <stop offset="100%" stopColor="#3d915d" />
            </linearGradient>
            <linearGradient id="kalashBodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e3f2b" />
              <stop offset="100%" stopColor="#08281a" />
            </linearGradient>
            <linearGradient id="gheeDropGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3b0" />
              <stop offset="40%" stopColor="#f5b324" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif font-black ${titleSize[size] || titleSize.md} leading-none ${
              isLight
                ? "text-[#faf5e8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                : "text-[#0d3422]"
            }`}
          >
            GHRITKALASH
          </span>
        </div>

        {showSubtext && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`h-[1px] w-3 ${
                isLight ? "bg-[#d4af37]/60" : "bg-[#c59a29]/60"
              }`}
            />
            <span
              className={`font-semibold uppercase ${subtextSize[size] || subtextSize.md} ${
                isLight ? "text-[#f3d687]" : "text-[#9e761d]"
              }`}
            >
              Pure &bull; Traditional &bull; Trusted
            </span>
            <span
              className={`h-[1px] w-3 ${
                isLight ? "bg-[#d4af37]/60" : "bg-[#c59a29]/60"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
