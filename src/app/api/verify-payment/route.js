import { NextResponse } from "next/server";
import crypto from "crypto";
import { markOrderAsPaid, getOrderByRazorpayId } from "@/lib/orders";
import { processFulfillment } from "@/lib/fulfillment";

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing required payment credentials" },
        { status: 400 }
      );
    }

    // Create the data string used to generate the signature
    const data = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Compute the HMAC SHA256 using the secret key
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(data)
      .digest("hex");

    // Timing-safe comparison to prevent side-channel timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(razorpay_signature, "utf-8")
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 1. Update Order in Supabase/Database to PAID
    let order = await markOrderAsPaid({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    if (!order) {
      order = await getOrderByRazorpayId(razorpay_order_id);
    }

    // 2. Trigger Fulfillment Pipeline (AWB Generation & Notifications)
    let shipment = null;
    if (order) {
      try {
        shipment = await processFulfillment(order);
      } catch (fulfillErr) {
        console.error("Fulfillment automation warning:", fulfillErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      order: {
        orderNumber: order?.orderNumber || "GK-CONFIRMED",
        paymentId: razorpay_payment_id,
        customer: order?.customer,
        shipment: shipment || order?.shipment,
        pricing: order?.pricing,
        items: order?.items,
      },
    });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during verification" },
      { status: 500 }
    );
  }
}
