"use client";

import React from "react";

/**
 * Custom, high-end bespoke SVG icons for GHRITKALASH
 * Designed specifically for Vedic A2 Cow Ghee, Bilona process, and pure Ayurvedic traditions.
 */

export function DesiCowIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Indian Desi Cow with distinctive hump and elegant horns */}
      <path
        d="M8 32 C9 26 12 24 16 24 C18 20 22 14 26 14 C29 14 31 16 32 20 C34 20 37 21 39 23 C41 24 43 27 42 30 C41 33 39 34 37 34 L37 38 C37 40 35 41 33 41 L31 41 C29 41 29 39 29 37 L29 32 L21 32 L21 37 C21 39 20 41 18 41 L16 41 C14 41 14 39 14 37 L14 34 C11 34 9 34 8 32 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cow Horns */}
      <path
        d="M37 20 C39 16 42 13 44 11 C43 14 41 17 40 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 19 C34 15 36 12 37 10 C36 13 35 16 34 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cow Dorsal Hump highlight */}
      <path
        d="M22 17 C24 15 27 15 28 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Pure A2 badge accent dot */}
      <circle cx="25" cy="24" r="1.5" fill={color} />
    </svg>
  );
}

export function BilonaChurnIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Central wooden churner shaft (Mathani) */}
      <path d="M24 6 L24 38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Top handle */}
      <path d="M19 8 L29 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Churning ropes crossed */}
      <path d="M16 18 C20 19 28 19 32 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M16 22 C20 23 28 23 32 22" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" />
      {/* Churner blades / wooden flutes at bottom */}
      <path d="M15 34 L33 34" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 38 L31 38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M19 42 L29 42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Motion arrows */}
      <path d="M11 20 C12 16 15 13 18 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M37 20 C36 24 33 27 30 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DanedarGheeIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Golden Ghee Droplet with Danedar grain texture */}
      <path
        d="M24 6 C24 6 12 20 12 29 C12 36.7 17.4 42 24 42 C30.6 42 36 36.7 36 29 C36 20 24 6 24 6 Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Granular Danedar particles */}
      <circle cx="24" cy="27" r="1.6" fill={color} />
      <circle cx="19" cy="31" r="1.4" fill={color} />
      <circle cx="28" cy="32" r="1.4" fill={color} />
      <circle cx="23" cy="36" r="1.2" fill={color} />
      <circle cx="29" cy="25" r="1.2" fill={color} />
      <circle cx="19" cy="25" r="1.2" fill={color} />
      {/* Droplet sheen */}
      <path d="M17 21 C15 25 15 29 16 32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function PuritySealIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Certified Quality Seal with ribbon */}
      <circle cx="24" cy="20" r="13" stroke={color} strokeWidth="2.2" />
      <circle cx="24" cy="20" r="10" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      {/* Center checkmark */}
      <path d="M19 20 L22.5 23.5 L29 17" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ribbon tails */}
      <path d="M17 31 L14 42 L20 39 L24 42 L22 32" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 31 L34 42 L28 39 L24 42 L26 32" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlassJarIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Jar lid */}
      <rect x="16" y="8" width="16" height="5" rx="2" stroke={color} strokeWidth="2" />
      <path d="M18 13 L18 16 L30 16 L30 13" stroke={color} strokeWidth="2" />
      {/* Glass jar body */}
      <path
        d="M14 19 C14 17.5 15 16 17 16 L31 16 C33 16 34 17.5 34 19 L34 38 C34 41 32 43 29 43 L19 43 C16 43 14 41 14 38 Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Glass reflections */}
      <path d="M18 21 L18 38" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <path d="M22 25 L22 36" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
      {/* Ghee fill line */}
      <path d="M18 28 C21 27 27 27 30 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SingleIngredientIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Pure leaf & drop - 100% natural, single ingredient */}
      <path
        d="M24 8 C14 16 11 26 15 34 C19 41 29 42 34 36 C40 29 39 18 24 8 Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Leaf vein */}
      <path d="M24 14 C24 24 22 33 26 38" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 22 C21 24 18 25 16 25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 28 C27 29 30 29 32 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SlowFlameIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Gentle simmer flame */}
      <path
        d="M24 7 C24 7 28 14 26 18 C28 17 31 18 32 20 C35 24 35 29 33 33 C30 38 25 41 20 41 C14 41 11 36 12 30 C13 24 18 19 19 16 C20 14 20 11 24 7 Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner flame */}
      <path
        d="M23 23 C25 25 26 27 26 29 C26 32 24 34 21 34 C18 34 17 32 17 30 C17 27 20 25 23 23 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CurdPotIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Earthen/Clay Curd Pot (Matka) */}
      <path d="M18 12 L30 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 12 C19 15 15 17 12 21 C8 27 10 37 17 40 C21 42 27 42 31 40 C38 37 40 27 36 21 C33 17 29 15 28 12" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      {/* Pot rim band */}
      <path d="M13 22 C18 25 30 25 35 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Fresh thick curd layer */}
      <path d="M16 27 C20 29 28 29 32 27" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" />
    </svg>
  );
}
