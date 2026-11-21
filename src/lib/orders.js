import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "./supabase";

/**
 * Order Storage Layer
 * - Seamlessly integrates with Supabase PostgreSQL when configured
 * - Automatically falls back to local data/orders.json file storage for development/offline
 */

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// ── File Storage Helpers (Fallback) ──────────────────────────────────────────

function ensureFileStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

function getFileOrders() {
  try {
    ensureFileStorage();
    const data = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Failed to read local orders file:", err);
    return [];
  }
}

function saveFileOrders(orders) {
  try {
    ensureFileStorage();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save local orders file:", err);
  }
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `GK-${timestamp}-${random}`;
}

// ── Supabase Entity Mapper ────────────────────────────────────────────────────

function mapSupabaseOrder(row) {
  if (!row) return null;
  return {
    id: row.id,
    orderNumber: row.order_number,
    razorpayOrderId: row.razorpay_order_id,
    razorpayPaymentId: row.razorpay_payment_id,
    razorpaySignature: row.razorpay_signature,
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    customer: {
      name: row.customer_name,
      phone: row.customer_phone,
      email: row.customer_email,
      address: row.shipping_address,
      landmark: row.shipping_landmark,
      city: row.shipping_city,
      state: row.shipping_state,
      pincode: row.shipping_pincode,
    },
    pricing: {
      subtotal: Number(row.subtotal),
      deliveryFee: Number(row.delivery_fee),
      discount: Number(row.discount || 0),
      totalAmount: Number(row.total_amount),
      currency: row.currency || "INR",
    },
    items: (row.order_items || []).map((i) => ({
      productId: i.product_id,
      variantId: i.variant_id,
      name: i.name,
      variantLabel: i.variant_label,
      price: Number(i.price),
      qty: Number(i.qty),
      total: Number(i.total),
      image: i.image,
    })),
    shipment: row.shipment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at,
  };
}

// ── CRUD Methods (Hybrid Supabase & Local Fallback) ──────────────────────────

export async function createOrderRecord({
  customer,
  items,
  pricing,
  razorpayOrderId,
}) {
  const orderNumber = generateOrderNumber();

  if (isSupabaseConfigured) {
    try {
      const { data: orderData, error: orderErr } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          razorpay_order_id: razorpayOrderId || null,
          payment_status: "PENDING_PAYMENT",
          fulfillment_status: "UNFULFILLED",
          customer_name: customer?.name || "",
          customer_phone: customer?.phone || "",
          customer_email: customer?.email || "",
          shipping_address: customer?.address || "",
          shipping_landmark: customer?.landmark || "",
          shipping_city: customer?.city || "",
          shipping_state: customer?.state || "",
          shipping_pincode: customer?.pincode || "",
          subtotal: pricing.subtotal,
          delivery_fee: pricing.deliveryFee,
          discount: pricing.discount || 0,
          total_amount: pricing.totalAmount,
          currency: "INR",
        })
        .select()
        .single();

      if (orderErr) throw orderErr;

      if (items && items.length > 0) {
        const orderItemsPayload = items.map((item) => ({
          order_id: orderData.id,
          product_id: item.productId || item.variantId || "ghee",
          variant_id: item.variantId || "default",
          name: item.name || "A2 Ghee",
          variant_label: item.variantLabel || "",
          price: item.price,
          qty: item.qty || 1,
          total: (item.price || 0) * (item.qty || 1),
          image: item.image || "",
        }));

        const { error: itemsErr } = await supabase
          .from("order_items")
          .insert(orderItemsPayload);

        if (itemsErr) console.error("Error inserting order items:", itemsErr);
      }

      return mapSupabaseOrder({ ...orderData, order_items: items });
    } catch (err) {
      console.error("Supabase createOrderRecord error, falling back to local file:", err);
    }
  }

  // Local file fallback
  const orders = getFileOrders();
  const newOrder = {
    id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    orderNumber,
    razorpayOrderId: razorpayOrderId || null,
    razorpayPaymentId: null,
    razorpaySignature: null,
    paymentStatus: "PENDING_PAYMENT",
    fulfillmentStatus: "UNFULFILLED",
    customer: {
      name: customer?.name || "",
      phone: customer?.phone || "",
      email: customer?.email || "",
      address: customer?.address || "",
      landmark: customer?.landmark || "",
      city: customer?.city || "",
      state: customer?.state || "",
      pincode: customer?.pincode || "",
    },
    items: (items || []).map((item) => ({
      productId: item.id || item.variantId,
      variantId: item.variantId,
      name: item.name,
      variantLabel: item.variantLabel,
      price: item.price,
      qty: item.qty,
      total: item.price * item.qty,
      image: item.image || "",
    })),
    pricing: {
      subtotal: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      discount: pricing.discount || 0,
      totalAmount: pricing.totalAmount,
      currency: "INR",
    },
    shipment: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  saveFileOrders(orders);
  return newOrder;
}

export async function updateOrderRazorpayId(orderNumber, razorpayOrderId) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ razorpay_order_id: razorpayOrderId })
        .eq("order_number", orderNumber)
        .select()
        .single();
      if (!error && data) return mapSupabaseOrder(data);
    } catch (err) {
      console.error("Supabase updateOrderRazorpayId error:", err);
    }
  }

  const orders = getFileOrders();
  const idx = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (idx !== -1) {
    orders[idx].razorpayOrderId = razorpayOrderId;
    orders[idx].updatedAt = new Date().toISOString();
    saveFileOrders(orders);
    return orders[idx];
  }
  return null;
}

export async function getOrderByRazorpayId(razorpayOrderId) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("razorpay_order_id", razorpayOrderId)
        .maybeSingle();

      if (!error && data) {
        return mapSupabaseOrder(data);
      }
    } catch (err) {
      console.error("Supabase getOrderByRazorpayId error:", err);
    }
  }

  const orders = getFileOrders();
  return orders.find((o) => o.razorpayOrderId === razorpayOrderId) || null;
}

export async function getOrderByNumber(orderNumber) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("order_number", orderNumber)
        .maybeSingle();

      if (!error && data) {
        return mapSupabaseOrder(data);
      }
    } catch (err) {
      console.error("Supabase getOrderByNumber error:", err);
    }
  }

  const orders = getFileOrders();
  return orders.find((o) => o.orderNumber === orderNumber) || null;
}

export async function markOrderAsPaid({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({
          razorpay_payment_id: razorpayPaymentId,
          razorpay_signature: razorpaySignature,
          payment_status: "PAID",
          fulfillment_status: "PROCESSING",
          paid_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpayOrderId)
        .select("*, order_items(*)")
        .single();

      if (!error && data) {
        return mapSupabaseOrder(data);
      }
    } catch (err) {
      console.error("Supabase markOrderAsPaid error:", err);
    }
  }

  const orders = getFileOrders();
  const index = orders.findIndex((o) => o.razorpayOrderId === razorpayOrderId);

  if (index === -1) return null;

  orders[index].razorpayPaymentId = razorpayPaymentId;
  orders[index].razorpaySignature = razorpaySignature;
  orders[index].paymentStatus = "PAID";
  orders[index].fulfillmentStatus = "PROCESSING";
  orders[index].paidAt = new Date().toISOString();
  orders[index].updatedAt = new Date().toISOString();

  saveFileOrders(orders);
  return orders[index];
}

export async function updateOrderShipment(orderNumber, shipmentData) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({
          shipment: shipmentData,
          fulfillment_status: shipmentData.status || "SHIPPED",
        })
        .eq("order_number", orderNumber)
        .select("*, order_items(*)")
        .single();

      if (!error && data) {
        return mapSupabaseOrder(data);
      }
    } catch (err) {
      console.error("Supabase updateOrderShipment error:", err);
    }
  }

  const orders = getFileOrders();
  const index = orders.findIndex((o) => o.orderNumber === orderNumber);

  if (index === -1) return null;

  orders[index].shipment = shipmentData;
  orders[index].fulfillmentStatus = shipmentData.status || "SHIPPED";
  orders[index].updatedAt = new Date().toISOString();

  saveFileOrders(orders);
  return orders[index];
}

export async function getAllOrders() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map(mapSupabaseOrder);
      }
    } catch (err) {
      console.error("Supabase getAllOrders error:", err);
    }
  }

  return getFileOrders();
}
