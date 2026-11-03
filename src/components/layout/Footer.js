"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import { PRODUCTS } from "@/lib/products";
import { DesiCowIcon, BilonaChurnIcon, PuritySealIcon, GlassJarIcon } from "@/components/ui/Icons";

const PRODUCT = PRODUCTS[0];

const PAGE_LINKS = [
  { label: "Order Now", href: "#order" },
  { label: "Our Heritage", href: "#heritage" },
  { label: "The Bilona Process", href: "#process" },
  { label: "Nutritional Info", href: "#nutrition" },
  { label: "Customer Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a2617] text-[#c8dece]">

      {/* Trust strip */}
      <div className="border-b border-[#1a4a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <DesiCowIcon className="w-7 h-7 text-[#ffd978]" />,
                title: "100% Pure A2 Cow Milk",
                desc: "Sourced from grass-fed indigenous desi cows",
              },
              {
                icon: <BilonaChurnIcon className="w-7 h-7 text-[#ffd978]" />,
                title: "Traditional Bilona",
                desc: "Hand-churned from curd using wooden churner",
              },
              {
                icon: <PuritySealIcon className="w-7 h-7 text-[#ffd978]" />,
                title: "60+ Parameters Tested",
                desc: "Every batch lab-verified for purity and aroma",
              },
              {
                icon: <GlassJarIcon className="w-7 h-7 text-[#ffd978]" />,
                title: "Glass Jar Packaging",
                desc: "Zero plastic contact for authentic Danedar goodness",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#0f3c27] border border-[#1d5e3d] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#faf5e8]">{item.title}</p>
                  <p className="text-xs text-[#8cbfa4] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo variant="light" size="md" />
            <p className="text-sm text-[#9abfac] leading-relaxed max-w-sm mt-3">
              GHRITKALASH is crafted using the revered Bilona process — where curd is hand-churned
              into makhan and slowly simmered to create rich, aromatic golden ghee. Pure.
              Traditional. Trusted.
            </p>

            <div className="pt-2 space-y-2 text-sm">
              <a href={`tel:${PRODUCT.phone}`} className="flex items-center gap-2.5 text-[#9abfac] hover:text-[#ffd978] transition-colors group">
                <Phone className="w-4 h-4 text-[#ffd978] shrink-0" />
                <span>{PRODUCT.phone}</span>
              </a>
              <a href={`mailto:${PRODUCT.email}`} className="flex items-center gap-2.5 text-[#9abfac] hover:text-[#ffd978] transition-colors">
                <Mail className="w-4 h-4 text-[#ffd978] shrink-0" />
                <span>{PRODUCT.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-[#9abfac]">
                <MapPin className="w-4 h-4 text-[#ffd978] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{PRODUCT.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#ffd978] uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-2.5">
              {PAGE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#9abfac] hover:text-[#ffd978] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#ffd978] uppercase tracking-[0.2em]">Product Details</h4>
            <div className="space-y-2 text-sm text-[#9abfac]">
              <p><span className="text-[#faf5e8] font-semibold">Brand:</span> GHRITKALASH</p>
              <p><span className="text-[#faf5e8] font-semibold">Ingredient:</span> {PRODUCT.ingredient}</p>
              <p><span className="text-[#faf5e8] font-semibold">Allergen:</span> {PRODUCT.allergenInfo}</p>
              <p><span className="text-[#faf5e8] font-semibold">Storage:</span> {PRODUCT.storage}</p>
              <p><span className="text-[#faf5e8] font-semibold">Made in:</span> {PRODUCT.countryOfOrigin}</p>
              <p><span className="text-[#faf5e8] font-semibold">Manufacturer:</span> {PRODUCT.manufacturer}</p>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#0f3c27] border border-[#1d5e3d]">
              <p className="text-xs font-bold text-[#faf5e8] mb-1">Available In</p>
              <div className="flex gap-2 flex-wrap mt-2">
                {PRODUCT.variants.map((v) => (
                  <span key={v.id} className="text-xs bg-[#1a5537] text-[#c8dece] px-3 py-1 rounded-full border border-[#286645]">
                    {v.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a4a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24 sm:pb-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6a9a80]">
          <p>© 2026 GHRITKALASH ENTERPRISES. All Rights Reserved. Made in India 🇮🇳</p>
          <p className="text-[11px]">Pure · Traditional · Trusted</p>
        </div>
      </div>
    </footer>
  );
}
