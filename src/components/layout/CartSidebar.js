"use client";

import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/products";
import { initiateRazorpayCheckout } from "@/lib/razorpay";

/**
 * CartSidebar
 *
 * Slide-in drawer showing cart items, qty controls and checkout.
 * Reads/writes from CartContext — no props needed.
 */
export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, totalQty, showToast } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isOpen) return null;

  async function handleCheckout() {
    if (items.length === 0) return;
    setCheckingOut(true);
    await initiateRazorpayCheckout({
      cartItems: items,
      onSuccess(response) {
        showToast(`Payment successful! Order ID: ${response.razorpay_order_id}`);
        setIsOpen(false);
      },
      onFailure(msg) {
        showToast(msg || "Payment failed. Please try again.", "error");
      },
    });
    setCheckingOut(false);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-[#fbf9f4] shadow-2xl flex flex-col"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#ece3d2] bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#113123]" />
            <h2 className="font-serif text-xl font-bold text-[#23180d]">Your Cart</h2>
            {totalQty > 0 && (
              <span className="bg-[#113123] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {totalQty}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-[#f0e8d8] text-[#463b2f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <ShoppingBag className="w-16 h-16 text-[#cbb898] mb-4" />
              <p className="font-serif text-lg font-semibold text-[#5a4e40] mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-[#8b7654]">
                Browse our products and add some goodness!
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider btn-amazon-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="bg-white rounded-2xl border border-[#ebdcc4] p-4 flex gap-3 shadow-sm"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#f0e8d8] shrink-0 bg-[#fdf9f1]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm font-bold text-[#23180d] leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#8b7654] mt-0.5">{item.variantLabel}</p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty controls */}
                    <div className="flex items-center gap-1 bg-[#f4ede1] rounded-full px-1 py-0.5">
                      <button
                        onClick={() => updateQty(item.variantId, -1)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-full hover:bg-[#e3cdb0] flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-[#23180d]" />
                      </button>
                      <span className="text-sm font-bold text-[#23180d] w-6 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.variantId, 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 rounded-full hover:bg-[#e3cdb0] flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-[#23180d]" />
                      </button>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#a86e1a]">
                        {formatINR(item.price * item.qty)}
                      </span>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                        className="p-1 rounded-full hover:bg-red-50 text-[#c77] hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#ece3d2] bg-white space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5a4e40] font-medium">
                Subtotal ({totalQty} item{totalQty !== 1 ? "s" : ""})
              </span>
              <span className="text-xl font-bold text-[#23180d]">{formatINR(subtotal)}</span>
            </div>
            <p className="text-[11px] text-[#8b7654]">
              Inclusive of all taxes. Shipping calculated at checkout.
            </p>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider btn-amazon-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 text-[#e3a938]" />
                  Checkout via Razorpay
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
