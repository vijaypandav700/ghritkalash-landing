import { NextResponse } from "next/server";
import crypto from "crypto";
import { markOrderAsPaid, getOrderByRazorpayId } from "@/lib/orders";
import { processFulfillment } from "@/lib/fulfillment";

/**
 * Razorpay Webhook Endpoint
 * Listens to background events from Razorpay (e.g. payment.captured, order.paid)
 * Provides 100% reliability if customer browser closes before client verification finishes.
 */
export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(signature, "utf-8")
      );

      if (!isValid) {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      const razorpayPaymentId = paymentEntity?.id;

      if (razorpayOrderId) {
        let order = await getOrderByRazorpayId(razorpayOrderId);
        if (order && order.paymentStatus !== "PAID") {
          order = await markOrderAsPaid({
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature: "webhook_verified",
          });
          if (order) {
            await processFulfillment(order);
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
