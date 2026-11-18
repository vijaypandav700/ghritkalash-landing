import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", receipt, notes } = body;

    // Validate minimum amount (100 paise = ₹1)
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

    return Response.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);

    const status = error.statusCode === 401 ? 401 : 500;
    return Response.json(
      { error: "Failed to create order", message: error.message },
      { status }
    );
  }
}
