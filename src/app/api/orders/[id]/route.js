import { NextResponse } from "next/server";
import { getOrderByNumber, getOrderByRazorpayId } from "@/lib/orders";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    let order = await getOrderByNumber(id);
    if (!order) {
      order = await getOrderByRazorpayId(id);
    }

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch order", message: error.message },
      { status: 500 }
    );
  }
}
