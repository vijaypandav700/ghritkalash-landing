"use client";

import React from "react";
import Image from "next/image";

/**
 * BrandLogo
 * Displays the GHRITKALASH brand logo image with the brand name
 * and tagline typography.
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

  const logoSize = {
    sm: { className: "w-8 h-8", width: 32, height: 32 },
    md: { className: "w-9 h-9 sm:w-11 sm:h-11", width: 44, height: 44 },
    lg: { className: "w-14 h-14 sm:w-16 sm:h-16", width: 64, height: 64 },
  };

  const titleSize = {
    sm: "text-base tracking-[0.14em]",
    md: "text-lg sm:text-2xl tracking-[0.14em] sm:tracking-[0.18em]",
    lg: "text-2xl sm:text-3xl tracking-[0.18em] sm:tracking-[0.22em]",
  };

  const subtextSize = {
    sm: "text-[7.5px] tracking-[0.2em]",
    md: "text-[8px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.28em]",
    lg: "text-[10px] sm:text-[12px] tracking-[0.26em] sm:tracking-[0.32em]",
  };

  const currentLogoSize = logoSize[size] || logoSize.md;

  return (
    <div className={`flex items-center ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      {/* Logo Image */}
      <div className={`relative ${currentLogoSize.className} shrink-0 flex items-center justify-center`}>
        <Image
          src="/images/ghritkalash-logo.jpg"
          alt="Ghritkalash Logo"
          width={currentLogoSize.width}
          height={currentLogoSize.height}
          className="w-full h-full object-contain rounded-full"
          priority
        />
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
          <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
            <span
              className={`h-[1px] w-2 sm:w-3 ${
                isLight ? "bg-[#d4af37]/60" : "bg-[#c59a29]/60"
              }`}
            />
            <span
              className={`font-semibold uppercase whitespace-nowrap ${subtextSize[size] || subtextSize.md} ${
                isLight ? "text-[#f3d687]" : "text-[#9e761d]"
              }`}
            >
              Pure &bull; Traditional &bull; Trusted
            </span>
            <span
              className={`h-[1px] w-2 sm:w-3 ${
                isLight ? "bg-[#d4af37]/60" : "bg-[#c59a29]/60"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
