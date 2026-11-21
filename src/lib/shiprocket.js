/**
 * Shiprocket API Client for Ghritkalash
 * Handles authentication, automated order creation, AWB assignment,
 * and label generation for prepaid orders.
 */

const SHIPROCKET_API_BASE = "https://apiv2.shiprocket.in/v1/external";

let cachedToken = null;
let tokenExpiresAt = 0;

export const isShiprocketConfigured = Boolean(
  process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD
);

/**
 * Obtain Shiprocket JWT Token (with in-memory cache)
 */
export async function getShiprocketAuthToken() {
  const now = Date.now();
  if (cachedToken && tokenExpiresAt > now) {
    return cachedToken;
  }

  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    throw new Error("Shiprocket credentials missing in environment variables");
  }

  const res = await fetch(`${SHIPROCKET_API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Shiprocket auth failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  cachedToken = data.token;
  // Tokens typically valid for 10 days, cache for 8 days to be safe
  tokenExpiresAt = now + 8 * 24 * 60 * 60 * 1000;
  return cachedToken;
}

/**
 * Calculate accurate package weight & dimensions for Glass Ghee Jars
 */
export function calculateParcelPackage(items = []) {
  let totalWeightKg = 0;

  for (const item of items) {
    const is1L = (item.variantId || "").toLowerCase().includes("1l") ||
                 (item.variantLabel || "").toLowerCase().includes("1 litre") ||
                 (item.name || "").toLowerCase().includes("1l");
    // 1L jar + heavy glass + protective honeycomb wrapping ≈ 1.75 kg
    // 500ml jar + glass + honeycomb ≈ 0.95 kg
    const itemWeight = is1L ? 1.75 : 0.95;
    totalWeightKg += itemWeight * (Number(item.qty) || 1);
  }

  // Keep dimensions standard for courier box (cm)
  const length = 18;
  const breadth = 18;
  const height = totalWeightKg > 2 ? 26 : 20;

  return {
    weight: Math.max(0.5, Number(totalWeightKg.toFixed(2))),
    length,
    breadth,
    height,
  };
}

/**
 * Create Live Order in Shiprocket
 */
export async function createShiprocketOrder(order) {
  const token = await getShiprocketAuthToken();
  const parcel = calculateParcelPackage(order.items || []);

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toISOString().slice(0, 19).replace("T", " ")
    : new Date().toISOString().slice(0, 19).replace("T", " ");

  const pickupLocation = process.env.SHIPROCKET_PICKUP_LOCATION || "Primary";

  const payload = {
    order_id: order.orderNumber,
    order_date: orderDate,
    pickup_location: pickupLocation,
    channel_id: "",
    comment: "GHRITKALASH Pure A2 Ghee - Glass Jar Fragile",
    billing_customer_name: order.customer.name || "Customer",
    billing_last_name: "",
    billing_address: order.customer.address,
    billing_address_2: order.customer.landmark || "",
    billing_city: order.customer.city,
    billing_pincode: order.customer.pincode,
    billing_state: order.customer.state,
    billing_country: "India",
    billing_email: order.customer.email,
    billing_phone: order.customer.phone,
    shipping_is_billing: true,
    order_items: (order.items || []).map((item) => ({
      name: item.name || "A2 Desi Cow Ghee",
      sku: item.variantId || "ghee-default",
      units: Number(item.qty) || 1,
      selling_price: Number(item.price) || 850,
      discount: 0,
      tax: 0,
      hsn: 4059020, // HSN code for Desi Ghee
    })),
    payment_method: "Prepaid",
    shipping_charges: order.pricing?.deliveryFee || 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: order.pricing?.discount || 0,
    sub_total: order.pricing?.totalAmount || 0,
    length: parcel.length,
    breadth: parcel.breadth,
    height: parcel.height,
    weight: parcel.weight,
  };

  const res = await fetch(`${SHIPROCKET_API_BASE}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `Shiprocket order creation failed: ${data.message || JSON.stringify(data)}`
    );
  }

  const shipmentId = data.shipment_id;
  const orderId = data.order_id;

  // Attempt to assign AWB immediately
  let awbCode = data.awb_code || null;
  let courierName = data.courier_name || null;

  if (!awbCode && shipmentId) {
    try {
      const awbRes = await assignShiprocketAwb(shipmentId, token);
      if (awbRes) {
        awbCode = awbRes.awb_code;
        courierName = awbRes.courier_name;
      }
    } catch (awbErr) {
      console.warn("Could not auto-assign AWB immediately, will remain pending in Shiprocket:", awbErr.message);
    }
  }

  return {
    shipmentId,
    orderId,
    awbNumber: awbCode || "PENDING_PICKUP_ASSIGNMENT",
    courier: courierName || "Shiprocket Smart Express",
    trackingUrl: awbCode
      ? `https://shiprocket.co/tracking/${awbCode}`
      : "https://shiprocket.co/tracking",
    status: awbCode ? "SHIPPED" : "PROCESSING",
    packagingType: "Shock-absorbing Honeycomb Protective Wrap",
    liveIntegration: true,
  };
}

/**
 * Assign AWB Courier
 */
export async function assignShiprocketAwb(shipmentId, existingToken = null) {
  const token = existingToken || (await getShiprocketAuthToken());

  const res = await fetch(`${SHIPROCKET_API_BASE}/courier/assign/awb`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shipment_id: shipmentId }),
  });

  const data = await res.json();
  if (!res.ok || data.status_code === 400) {
    return null;
  }

  const r = data.response?.data;
  return {
    awb_code: r?.awb_code || null,
    courier_name: r?.courier_name || null,
  };
}

/**
 * Generate Printable Shipping Barcode Label PDF
 */
export async function generateShiprocketLabel(shipmentId) {
  const token = await getShiprocketAuthToken();

  const res = await fetch(`${SHIPROCKET_API_BASE}/courier/generate/label`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shipment_id: [shipmentId] }),
  });

  const data = await res.json();
  return data.label_url || null;
}
