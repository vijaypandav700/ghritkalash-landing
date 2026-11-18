import { NextResponse } from "next/server";
import crypto from "crypto";

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
        { success: false, message: "Missing required payment fields" },
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

    // Timing-safe comparison
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(razorpay_signature, "utf-8")
    );

    if (isValid) {
      // Here you would normally update your order status in a DB.
      return NextResponse.json(
        { success: true, message: "Payment verified successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid payment signature" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
