"use client";

import Image from "next/image";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Truck,
  ExternalLink,
  Phone,
  Package,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/products";
import { initiateRazorpayCheckout } from "@/lib/razorpay";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQty,
    removeItem,
    clearCart,
    subtotal,
    totalQty,
    showToast,
  } = useCart();

  const [step, setStep] = useState("cart"); // 'cart' | 'address' | 'success'
  const [checkingOut, setCheckingOut] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499;
  const freeShippingQualified = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = freeShippingQualified ? 0 : 60;
  const totalAmount = subtotal + shippingFee;
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validateAddress() {
    const errs = {};
    if (!customer.name.trim()) errs.name = "Full name is required";
    if (!customer.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(customer.phone.replace(/\D/g, ""))) {
      errs.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (!customer.email.trim()) {
      errs.email = "Email is required for tracking & invoice";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!customer.address.trim()) errs.address = "Flat / House no. / Street address required";
    if (!customer.pincode.trim()) {
      errs.pincode = "6-digit PIN code required";
    } else if (!/^\d{6}$/.test(customer.pincode.trim())) {
      errs.pincode = "Enter a valid 6-digit PIN code";
    }
    if (!customer.city.trim()) errs.city = "City is required";
    if (!customer.state.trim()) errs.state = "State is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleProceedToPayment() {
    if (!validateAddress()) {
      showToast("Please fill in all required delivery details", "error");
      return;
    }

    setCheckingOut(true);
    await initiateRazorpayCheckout({
      cartItems: items,
      customerDetails: customer,
      pricing: {
        subtotal,
        deliveryFee: shippingFee,
        totalAmount,
      },
      onSuccess(order) {
        setConfirmedOrder(order);
        clearCart();
        setStep("success");
        showToast("Order confirmed! Your shipment is being prepared.");
      },
      onFailure(msg) {
        showToast(msg || "Payment failed. Please try again.", "error");
      },
    });
    setCheckingOut(false);
  }

  function handleClose() {
    setIsOpen(false);
    if (step === "success") {
      setStep("cart");
      setConfirmedOrder(null);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-[440px] bg-[#faf7ef] shadow-2xl flex flex-col border-l border-[#e5d8c4]"
        aria-label="Shopping Cart & Checkout"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ebdcc4] bg-[#0b3b24] text-white">
          <div className="flex items-center gap-2.5">
            {step === "address" ? (
              <button
                onClick={() => setStep("cart")}
                aria-label="Back to Cart"
                className="p-1 -ml-1 rounded-full hover:bg-white/20 text-[#ffd978] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <ShoppingBag className="w-5 h-5 text-[#ffd978]" />
            )}

            <h2 className="font-serif text-xl font-bold tracking-wide">
              {step === "cart" && "Your Bag"}
              {step === "address" && "Shipping & Address"}
              {step === "success" && "Order Confirmed"}
            </h2>

            {step === "cart" && totalQty > 0 && (
              <span className="bg-[#ffd978] text-[#072417] text-xs px-2 py-0.5 rounded-full font-black">
                {totalQty}
              </span>
            )}
          </div>

          <button
            onClick={handleClose}
            aria-label="Close cart"
            className="p-1.5 rounded-full hover:bg-white/20 text-[#d8ebdf] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── STEP 1: CART ITEMS ── */}
        {step === "cart" && (
          <>
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
              <div className="px-5 sm:px-6 py-4 sm:py-5 border-t border-[#ebdcc4] bg-white space-y-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
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
                    {formatINR(totalAmount)}
                  </span>
                </div>

                <button
                  onClick={() => setStep("address")}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-xs font-extrabold uppercase tracking-wider btn-anveshan-primary shadow-lg active:scale-[0.98]"
                >
                  <MapPin className="w-4 h-4 text-[#ffd978]" />
                  <span>Enter Delivery Address &bull; {formatINR(totalAmount)}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#736350] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#09733c]" />
                  <span>Secure Checkout · Fast Shipping · Tamper-proof Glass Packaging</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── STEP 2: SHIPPING & ADDRESS FORM ── */}
        {step === "address" && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <div className="bg-[#f4eee1] p-3 rounded-xl border border-[#ebdcc4] flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#0b3b24] shrink-0 mt-0.5" />
                <p className="text-xs text-[#524434] leading-relaxed">
                  Your order is prepared at our Vedic Gaushala and shipped via express courier in shock-proof honeycomb cushioning.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#142d1f] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Aarav Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] ${
                      errors.name ? "border-red-500" : "border-[#ebdcc4]"
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#142d1f] mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] ${
                        errors.phone ? "border-red-500" : "border-[#ebdcc4]"
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142d1f] mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleInputChange}
                      placeholder="receipt@email.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] ${
                        errors.email ? "border-red-500" : "border-[#ebdcc4]"
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142d1f] mb-1">
                    Delivery Address (House / Flat / Street) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={customer.address}
                    onChange={handleInputChange}
                    placeholder="e.g. Flat 302, Green Meadows, 5th Main"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] resize-none ${
                      errors.address ? "border-red-500" : "border-[#ebdcc4]"
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-[#142d1f] mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={customer.pincode}
                      onChange={handleInputChange}
                      placeholder="6 digits"
                      maxLength={6}
                      className={`w-full px-3 py-2.5 rounded-xl border bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] ${
                        errors.pincode ? "border-red-500" : "border-[#ebdcc4]"
                      }`}
                    />
                    {errors.pincode && <p className="text-[10px] text-red-500 mt-1">{errors.pincode}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142d1f] mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={customer.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className={`w-full px-3 py-2.5 rounded-xl border bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] ${
                        errors.city ? "border-red-500" : "border-[#ebdcc4]"
                      }`}
                    />
                    {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142d1f] mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={customer.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className={`w-full px-3 py-2.5 rounded-xl border bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] ${
                        errors.state ? "border-red-500" : "border-[#ebdcc4]"
                      }`}
                    />
                    {errors.state && <p className="text-[10px] text-red-500 mt-1">{errors.state}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142d1f] mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={customer.landmark}
                    onChange={handleInputChange}
                    placeholder="Near temple, metro station, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ebdcc4] bg-white text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Checkout CTA */}
            <div className="px-5 sm:px-6 py-4 border-t border-[#ebdcc4] bg-white space-y-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between text-xs text-[#736350]">
                <span>Total to Pay ({totalQty} item{totalQty !== 1 ? "s" : ""})</span>
                <span className="font-extrabold text-[#0b3b24] text-base">{formatINR(totalAmount)}</span>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={checkingOut}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-xs font-extrabold uppercase tracking-wider btn-anveshan-primary shadow-lg active:scale-[0.98] disabled:opacity-60"
              >
                {checkingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting Razorpay…</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-[#ffd978]" />
                    <span>Pay {formatINR(totalAmount)} with Razorpay</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#736350]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#09733c]" />
                <span>UPI, Cards, NetBanking, Wallets supported</span>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: ORDER CONFIRMED & FULFILLMENT STATUS ── */}
        {step === "success" && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto px-6 py-6 text-center">
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#0b3b24] text-[#ffd978] mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#09733c] bg-[#eef7f1] px-3 py-1 rounded-full border border-[#cde5d6]">
                  Order Placed Successfully
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#142d1f] mt-3">
                  Thank You, {customer.name || "Valued Customer"}!
                </h3>
                <p className="text-xs text-[#736350] mt-1">
                  Order Reference:{" "}
                  <strong className="text-[#0b3b24] font-mono">
                    {confirmedOrder?.orderNumber || "GK-CONFIRMED"}
                  </strong>
                </p>
              </div>

              {/* Fulfilment & Shipping Card */}
              <div className="bg-white rounded-2xl border border-[#ebdcc4] p-4 text-left space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#f0e6d6] pb-2.5">
                  <div className="flex items-center gap-2 text-[#0b3b24]">
                    <Truck className="w-4 h-4" />
                    <span className="text-xs font-bold">Fulfillment Status</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#09733c] bg-[#eef7f1] px-2 py-0.5 rounded-full">
                    {confirmedOrder?.shipment?.status || "Processing"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-[#736350] block">Assigned Courier</span>
                    <strong className="text-[#142d1f] font-semibold">
                      {confirmedOrder?.shipment?.courier || "BlueDart Express"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#736350] block">Est. Delivery</span>
                    <strong className="text-[#09733c] font-semibold">
                      {confirmedOrder?.shipment?.estimatedDelivery || "3 - 5 Days"}
                    </strong>
                  </div>
                </div>

                {confirmedOrder?.shipment?.awbNumber && (
                  <div className="pt-2 border-t border-[#f2e7d7] flex items-center justify-between text-xs">
                    <span className="text-[#736350]">AWB Tracking:</span>
                    <a
                      href={confirmedOrder?.shipment?.trackingUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#0b3b24] font-bold underline flex items-center gap-1 hover:text-[#09733c]"
                    >
                      {confirmedOrder.shipment.awbNumber}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Delivery Address Summary */}
              <div className="bg-[#fcfaf5] rounded-xl border border-[#ede3d1] p-3 text-left text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#544636] font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#0b3b24]" />
                  <span>Delivering to</span>
                </div>
                <p className="text-[#142d1f] font-semibold">{customer.name}</p>
                <p className="text-[#736350] leading-snug">
                  {customer.address}, {customer.landmark && `${customer.landmark}, `}
                  {customer.city}, {customer.state} - {customer.pincode}
                </p>
                <p className="text-[#736350]">Phone: {customer.phone}</p>
              </div>

              {/* Safety Packaging Guarantee */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f0f8f3] border border-[#cde5d6] text-left">
                <Package className="w-5 h-5 text-[#09733c] shrink-0" />
                <p className="text-[11px] text-[#0b3b24] leading-snug">
                  <strong>Glass-Safe Packing:</strong> Your jar is protected with honeycomb paper wrap and a tamper-evident Vedic seal.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 mt-6">
              <a
                href={`https://wa.me/919999999999?text=${encodeURIComponent(
                  `Hi Ghritkalash team, I just placed order ${
                    confirmedOrder?.orderNumber || ""
                  }. Please share updates.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-[#0b3b24] bg-[#ffd978] hover:bg-[#ffe399] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Support on WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-full text-xs font-bold text-[#736350] hover:text-[#142d1f] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
