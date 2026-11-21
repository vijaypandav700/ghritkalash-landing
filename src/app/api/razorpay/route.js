import Razorpay from "razorpay";
import { createOrderRecord, updateOrderRazorpayId } from "@/lib/orders";

const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer, pricing: clientPricing } = body;

    // Calculate or validate totals
    let subtotal = 0;
    if (items && Array.isArray(items)) {
      subtotal = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 1),
        0
      );
    } else if (body.amount) {
      subtotal = Math.round(body.amount / 100);
    }

    if (subtotal < 1) {
      return Response.json(
        { error: "Invalid amount", message: "Cart total must be greater than ₹0" },
        { status: 400 }
      );
    }

    const deliveryFee = subtotal >= 499 ? 0 : 60;
    const totalAmount = subtotal + deliveryFee;
    const amountInPaise = Math.round(totalAmount * 100);

    const pricing = {
      subtotal,
      deliveryFee,
      discount: clientPricing?.discount || 0,
      totalAmount,
    };

    // 1. Create order record in Supabase / order storage with PENDING_PAYMENT status
    const pendingOrder = await createOrderRecord({
      customer: customer || {},
      items: items || [],
      pricing,
    });

    // 2. Create official order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: pendingOrder.orderNumber,
      notes: {
        orderNumber: pendingOrder.orderNumber,
        customerName: customer?.name || "Customer",
        customerPhone: customer?.phone || "",
        shippingCity: customer?.city || "",
        shippingPincode: customer?.pincode || "",
      },
    });

    // 3. Link Razorpay order ID to our database record
    await updateOrderRazorpayId(pendingOrder.orderNumber, razorpayOrder.id);

    return Response.json({
      order_id: razorpayOrder.id,
      orderId: razorpayOrder.id,
      orderNumber: pendingOrder.orderNumber,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: keyId,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    const status = error.statusCode === 401 ? 401 : 500;
    const errorMessage =
      error.error?.description ||
      error.description ||
      error.message ||
      "Failed to create order";
    return Response.json(
      { error: "Failed to create order", message: errorMessage, details: error.error || null },
      { status }
    );
  }
}
