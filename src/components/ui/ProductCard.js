"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Star, Check, ShieldCheck, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR, getDiscountPercent } from "@/lib/products";

export default function ProductCard({ product }) {
  const { addItem, setIsOpen } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [added, setAdded] = useState(false);

  const discount = getDiscountPercent(selectedVariant.mrp, selectedVariant.price);

  function handleAddToCart(e) {
    e?.stopPropagation();
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsOpen(true);
    }, 600);
  }

  return (
    <div className="bg-white rounded-3xl border border-[#ebdcc4] shadow-[0_4px_20px_rgba(25,45,30,0.06)] hover:shadow-[0_12px_32px_rgba(25,45,30,0.12)] transition-all duration-300 overflow-hidden flex flex-col group card-gold-hover w-full max-w-xl mx-auto">
      
      {/* Product Image Area */}
      <div className="relative bg-[#faf7ef] pt-6 px-6 pb-4 border-b border-[#f0e6d6]">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          <span className="bg-[#0b3b24] text-[#f7e2a9] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#ffd978]" />
            <span>A2 Cow Ghee</span>
          </span>
          <span className="bg-[#e9f4ed] text-[#0b3b24] text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#c6e4d1]">
            Traditional Bilona
          </span>
        </div>

        {/* Discount Badge on Right */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 z-10 bg-[#e8a723] text-[#0b2b1b] text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-md">
            {discount}% OFF
          </div>
        )}

        {/* Product Image */}
        <div className="aspect-[4/3] sm:aspect-square relative w-full overflow-hidden flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Product Info & Actions */}
      <div className="p-6 flex flex-col flex-1 gap-5 justify-between">
        <div className="space-y-3">
          {/* Ratings & Verification */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#fdf5e2] px-2 py-0.5 rounded-md border border-[#f3d995]">
                <Star className="w-3.5 h-3.5 fill-[#e8a723] text-[#e8a723]" />
                <span className="text-xs font-bold text-[#292017]">
                  {product.rating}
                </span>
              </div>
              <span className="text-[11px] text-[#736350] font-medium">
                ({product.reviewsCount} ratings)
              </span>
            </div>

            <span className="text-[11px] font-bold text-[#0b3b24] bg-[#eef7f1] px-2.5 py-0.5 rounded-full border border-[#cbe5d5]">
              100% Desi Cow Fat
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142d1f] leading-snug">
              {product.name}
            </h3>
            <p className="text-xs text-[#0b3b24] font-semibold mt-1">
              {product.subtitle}
            </p>
            <p className="text-xs text-[#736553] mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selector */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-[#44382d] uppercase tracking-wider mb-2">
              Select Size:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`py-2.5 px-3 rounded-2xl text-left border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-[#0b3b24] bg-[#0b3b24] text-white shadow-md"
                        : "border-[#e5d8c4] bg-[#fdfbf7] text-[#3d3227] hover:border-[#0b3b24]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{v.label}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? "text-[#ffd978]" : "text-[#09733c]"}`}>
                        Save {getDiscountPercent(v.mrp, v.price)}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className={`text-sm font-black ${isSelected ? "text-[#fce8a9]" : "text-[#0b3b24]"}`}>
                        {formatINR(v.price)}
                      </span>
                      <span className={`text-[11px] line-through ${isSelected ? "text-[#a0c5b1]" : "text-[#8a7a68]"}`}>
                        {formatINR(v.mrp)}
                      </span>
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? "text-[#d8ebd9]" : "text-[#8a7a68]"}`}>
                      ({v.unitPrice})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-[#f0e6d6] space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#0b3b24]">
                {formatINR(selectedVariant.price)}
              </span>
              <span className="text-sm text-[#8c7b68] line-through font-medium">
                {formatINR(selectedVariant.mrp)}
              </span>
            </div>
            <span className="text-xs font-bold text-[#09733c] bg-[#e6f4ea] px-2.5 py-1 rounded-md">
              Save {formatINR(selectedVariant.mrp - selectedVariant.price)} ({discount}% off)
            </span>
          </div>

          <p className="text-[11px] text-[#736350]">
            Inclusive of all taxes &bull; {selectedVariant.unitPrice}
          </p>

          <button
            onClick={handleAddToCart}
            className={`w-full py-4 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
              added
                ? "bg-[#09733c] text-white"
                : "btn-anveshan-primary"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Shopping Bag!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 text-[#ffd978]" />
                <span>Add To Cart &bull; {formatINR(selectedVariant.price)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
