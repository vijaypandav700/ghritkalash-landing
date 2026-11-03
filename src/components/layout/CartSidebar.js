"use client";

import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/products";
import { initiateRazorpayCheckout } from "@/lib/razorpay";

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, totalQty, showToast } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499;
  const freeShippingQualified = subtotal >= FREE_SHIPPING_THRESHOLD;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  async function handleCheckout() {
    if (items.length === 0) return;
    setCheckingOut(true);
    await initiateRazorpayCheckout({
      cartItems: items,
      onSuccess(response) {
        showToast(`Order confirmed! Payment ID: ${response.razorpay_order_id}`);
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
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-[430px] bg-[#faf7ef] shadow-2xl flex flex-col border-l border-[#e5d8c4]"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ebdcc4] bg-[#0b3b24] text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#ffd978]" />
            <h2 className="font-serif text-xl font-bold tracking-wide">Your Bag</h2>
            {totalQty > 0 && (
              <span className="bg-[#ffd978] text-[#072417] text-xs px-2 py-0.5 rounded-full font-black">
                {totalQty}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="p-1.5 rounded-full hover:bg-white/20 text-[#d8ebdf] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-[#eef7f1] border-b border-[#cde5d6]">
          <div className="flex items-center justify-between text-xs font-bold text-[#0b3b24] mb-1.5">
            {freeShippingQualified ? (
              <span className="text-[#09733c]">
                ✓ Free Express Delivery Unlocked!
              </span>
            ) : (
              <span>
                Add {formatINR(FREE_SHIPPING_THRESHOLD - subtotal)} more for FREE Delivery
              </span>
            )}
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#d6eadc] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0b3b24] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-[#f0e8d8] flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-[#a89578]" />
              </div>
              <p className="font-serif text-lg font-bold text-[#142d1f] mb-1">
                Your cart is empty
              </p>
              <p className="text-xs text-[#736350] max-w-xs leading-relaxed">
                Add GHRITKALASH Pure A2 Cow Ghee (500ml or 1 Litre) to your bag.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider btn-anveshan-primary"
              >
                View Product
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="bg-white rounded-2xl border border-[#ebdcc4] p-3.5 flex gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#eedfc9] shrink-0 bg-[#faf7ef] relative flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="font-serif text-xs sm:text-sm font-bold text-[#142d1f] leading-snug line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-[10.5px] text-[#0b3b24] font-semibold mt-0.5">
                      {item.variantLabel}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f2e7d7]">
                    <div className="flex items-center gap-1.5 bg-[#faf7ef] rounded-full px-2 py-0.5 border border-[#e2d5c0]">
                      <button
                        onClick={() => updateQty(item.variantId, -1)}
                        aria-label="Decrease quantity"
                        className="w-5 h-5 rounded-full hover:bg-[#ebdcc4] flex items-center justify-center transition-colors text-[#142d1f]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#142d1f] w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.variantId, 1)}
                        aria-label="Increase quantity"
                        className="w-5 h-5 rounded-full hover:bg-[#ebdcc4] flex items-center justify-center transition-colors text-[#142d1f]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#0b3b24]">
                        {formatINR(item.price * item.qty)}
                      </span>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                        className="p-1 rounded-full hover:bg-red-50 text-red-500 transition-colors"
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

        {/* Footer Checkout Area */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#ebdcc4] bg-white space-y-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-xs text-[#736350]">
              <span>Subtotal ({totalQty} item{totalQty !== 1 ? "s" : ""})</span>
              <span className="font-bold text-[#142d1f] text-sm">{formatINR(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#736350]">
              <span>Delivery Fee</span>
              <span className="font-bold text-[#09733c]">
                {freeShippingQualified ? "FREE" : "₹60"}
              </span>
            </div>

            <div className="pt-2 border-t border-[#f0e6d6] flex items-baseline justify-between">
              <span className="font-serif font-bold text-base text-[#142d1f]">
                Total Amount
              </span>
              <span className="text-2xl font-black text-[#0b3b24]">
                {formatINR(subtotal + (freeShippingQualified ? 0 : 60))}
              </span>
            </div>

            {/* Direct Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-xs font-extrabold uppercase tracking-wider btn-anveshan-primary shadow-lg active:scale-[0.98] disabled:opacity-60"
            >
              {checkingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting Secure Gateway…</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 text-[#ffd978]" />
                  <span>Proceed to Pay &bull; {formatINR(subtotal + (freeShippingQualified ? 0 : 60))}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#736350] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#09733c]" />
              <span>Secure Checkout · Razorpay · UPI · Cards</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
