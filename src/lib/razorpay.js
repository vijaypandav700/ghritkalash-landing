/**
 * Razorpay payment integration helpers.
 * Handles script loading and checkout initiation.
 */

/**
 * Lazily load Razorpay checkout.js from CDN.
 * Returns true if loaded successfully, false otherwise.
 */
export async function loadRazorpayScript() {
  if (typeof window === "undefined") return false;
  if (window.Razorpay) return true;

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Initiate a Razorpay checkout session.
 *
 * @param {object} params
 * @param {Array}  params.cartItems   - Items from cart context
 * @param {function} params.onSuccess - Called with razorpay response on success
 * @param {function} params.onFailure - Called with error message string on failure
 */
export async function initiateRazorpayCheckout({ cartItems, onSuccess, onFailure }) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    onFailure?.("Failed to load the payment gateway. Please try again.");
    return;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  let orderData;
  try {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: subtotal * 100, // Razorpay expects paise
        currency: "INR",
        receipt: `gk_${Date.now()}`,
        notes: {
          items: cartItems
            .map((i) => `${i.name} (${i.variantLabel}) ×${i.qty}`)
            .join(", "),
        },
      }),
    });

    orderData = await res.json();
    if (!res.ok) throw new Error(orderData.message || "Order creation failed.");
  } catch (err) {
    onFailure?.(err.message);
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: orderData.currency,
    name: "GHRITKALASH",
    description: "Pure A2 Cow Ghee – Vedic Bilona Method",
    order_id: orderData.orderId,
    handler(response) {
      onSuccess?.(response);
    },
    prefill: { name: "", email: "", contact: "" },
    theme: { color: "#0f2e20" },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", () => {
    onFailure?.("Payment failed. Please try again.");
  });
  rzp.open();
}
