/**
 * WhatsApp Notification Service for Ghritkalash Store Owner
 * Uses CallMeBot API to deliver instant WhatsApp alerts on new paid orders.
 */

export const isWhatsAppConfigured = Boolean(
  process.env.ADMIN_WHATSAPP_PHONE && process.env.CALLMEBOT_API_KEY
);

/**
 * Format and send an instant WhatsApp order alert to the store owner
 */
export async function sendAdminWhatsAppNotification(order) {
  if (!isWhatsAppConfigured) {
    console.log("[WHATSAPP] Skipped: ADMIN_WHATSAPP_PHONE or CALLMEBOT_API_KEY not set");
    return { success: false, reason: "NOT_CONFIGURED" };
  }

  const phone = process.env.ADMIN_WHATSAPP_PHONE.replace(/\D/g, "");
  // Ensure international format (e.g. 919309110595 for India)
  const formattedPhone = phone.startsWith("91") ? `+${phone}` : `+91${phone}`;
  const apiKey = process.env.CALLMEBOT_API_KEY.trim();

  const customerName = order.customer?.name || "Customer";
  const customerPhone = order.customer?.phone || "N/A";
  const address = order.customer?.address || "";
  const city = order.customer?.city || "";
  const pincode = order.customer?.pincode || "";
  const totalAmount = order.pricing?.totalAmount || 0;
  const courier = order.shipment?.courier || "Assigned Courier";
  const awb = order.shipment?.awbNumber || null;

  const itemsList = (order.items || [])
    .map((i) => `• ${i.name} (${i.variantLabel}) × ${i.qty}`)
    .join("\n");

  const message = `🍯 *NEW GHRITKALASH ORDER!*

📦 *Order #:* ${order.orderNumber}
💰 *Amount:* ₹${totalAmount} (PAID via Razorpay)
👤 *Customer:* ${customerName}
📞 *Phone:* ${customerPhone}
📍 *Location:* ${city} - ${pincode}
🏠 *Address:* ${address}

🛒 *Items to Pack:*
${itemsList || "• Pure A2 Desi Cow Ghee"}

🚚 *Courier:* ${courier}
${awb && awb !== "PENDING_PICKUP_ASSIGNMENT" ? `🏷 *AWB:* ${awb}\n` : ""}
👉 _Manage Order:_ https://www.ghritkalash.com/admin`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
      formattedPhone
    )}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const responseText = await res.text();
    const success = res.ok && !responseText.toLowerCase().includes("error");

    if (success) {
      console.log(`[WHATSAPP ALERT SENT] Successfully notified store owner for #${order.orderNumber}`);
      return { success: true };
    } else {
      console.warn(`[WHATSAPP ALERT WARNING] CallMeBot response: ${responseText}`);
      return { success: false, reason: responseText };
    }
  } catch (err) {
    console.error("[WHATSAPP ALERT ERROR]", err.message);
    return { success: false, error: err.message };
  }
}
