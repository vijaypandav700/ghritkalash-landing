import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", receipt, notes } = body;

    if (!amount || amount < 100) {
      return Response.json(
        { error: "Invalid amount", message: "Amount must be at least 100 paise (₹1)" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount, // amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    });

    return Response.json({
      order_id: order.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: keyId,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    const status = error.statusCode === 401 ? 401 : 500;
    return Response.json(
      { error: "Failed to create order", message: error.message },
      { status }
    );
  }
}
