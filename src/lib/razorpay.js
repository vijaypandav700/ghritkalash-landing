/**
 * Razorpay payment integration helpers.
 * Handles script loading, checkout initiation, and server-side signature verification.
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

async function verifyPayment(response) {
  const res = await fetch("/api/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    }),
  });
  return res.json();
}

export async function initiateRazorpayCheckout({ cartItems, onSuccess, onFailure }) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    onFailure?.("Failed to load the payment gateway. Please check your internet connection.");
    return;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  let orderData;
  try {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(subtotal * 100), // Razorpay expects paise
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
    if (!res.ok) throw new Error(orderData.message || orderData.error || "Order creation failed.");
  } catch (err) {
    onFailure?.(err.message || "Failed to initiate order.");
    return;
  }

  const razorpayKey = orderData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const orderId = orderData.order_id || orderData.orderId;

  if (!orderId) {
    onFailure?.("Invalid order details received from server.");
    return;
  }

  const options = {
    key: razorpayKey,
    amount: orderData.amount,
    currency: orderData.currency || "INR",
    name: "GHRITKALASH",
    description: "Pure A2 Cow Ghee – Vedic Bilona Method",
    order_id: orderId,
    async handler(response) {
      try {
        const result = await verifyPayment(response);
        if (result.success) {
          onSuccess?.(response);
        } else {
          onFailure?.(result.message || "Payment verification failed.");
        }
      } catch {
        onFailure?.("Payment verification request failed. Please contact support.");
      }
    },
    prefill: { name: "", email: "", contact: "" },
    theme: { color: "#0f2e20" },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (resp) => {
    onFailure?.(resp.error?.description || "Payment failed. Please try again.");
  });
  rzp.open();
}
