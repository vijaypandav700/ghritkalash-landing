"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR, getDiscountPercent } from "@/lib/products";

/**
 * ProductCard
 *
 * Displays a single product with its variant selector and Add to Cart action.
 * Self-contained: manages its own selected variant state.
 *
 * @param {{ product: import('@/lib/products').Product }} props
 */
export default function ProductCard({ product }) {
  const { addItem, setIsOpen } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [added, setAdded] = useState(false);

  const discount = getDiscountPercent(selectedVariant.mrp, selectedVariant.price);

  function handleAddToCart() {
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleViewCart() {
    addItem(product, selectedVariant);
    setIsOpen(true);
  }

  return (
    <div className="bg-white rounded-3xl border border-[#ebdcc4] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Product Image */}
      <div className="relative bg-[#fdf9f1]">
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 bg-[#113123] text-[#f8e7b9] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#e4a938]/30">
            {product.badge}
          </span>
        )}
        {selectedVariant.tag && (
          <span className="absolute top-4 right-4 z-10 bg-[#e4a938] text-[#122b1c] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {selectedVariant.tag}
          </span>
        )}
        <div className="aspect-[4/3] relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Name + Tagline */}
        <div>
          <h3 className="font-serif text-lg font-bold text-[#23180d] leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-[#8b7654] mt-0.5 italic">{product.tagline}</p>
        </div>

        {/* Variant Selector */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-[#5a4e40] uppercase tracking-wider">
            Select Size
          </p>
          <div className="flex gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                  selectedVariant.id === v.id
                    ? "border-[#113123] bg-[#113123] text-[#f6d483]"
                    : "border-[#e0d0b8] bg-white text-[#5a4e40] hover:border-[#113123]/40"
                }`}
              >
                {v.shortLabel}
                <span className="block text-[10px] font-normal opacity-70 mt-0.5">
                  {v.unit}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-end gap-3">
          <div>
            <p className="text-2xl font-bold text-[#23180d]">
              {formatINR(selectedVariant.price)}
            </p>
            <p className="text-xs text-[#9c8c7a] line-through mt-0.5">
              MRP {formatINR(selectedVariant.mrp)}
            </p>
          </div>
          <span className="mb-1 text-[11px] font-bold text-white bg-[#1a7c44] px-2 py-0.5 rounded-lg">
            {discount}% OFF
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1">
          {product.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-[11px] text-[#5a4e40]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1a7c44] shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2 ${
              added
                ? "border-[#1a7c44] bg-[#eef5f0] text-[#1a7c44]"
                : "border-[#113123] bg-white text-[#113123] hover:bg-[#113123] hover:text-[#f6d483]"
            }`}
          >
            {added ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>

          <button
            onClick={handleViewCart}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider btn-amazon-primary"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
