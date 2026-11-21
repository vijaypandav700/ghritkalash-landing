import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getOrderByNumber, updateOrderShipment } from "@/lib/orders";
import { isShiprocketConfigured, createShiprocketOrder, generateShiprocketLabel } from "@/lib/shiprocket";
import { supabase, isSupabaseConfigured } from "@/lib/supabase.js";

export async function POST(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!isShiprocketConfigured) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Shiprocket is not configured. Please add SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD to your .env file.",
      },
      { status: 400 }
    );
  }

  try {
    const { orderNumber } = await request.json();
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const shiprocketResult = await createShiprocketOrder(order);

    const updatedShipment = {
      ...(order.shipment || {}),
      ...shiprocketResult,
      updatedAt: new Date().toISOString(),
    };

    const updated = await updateOrderShipment(orderNumber, updatedShipment);

    if (isSupabaseConfigured) {
      await supabase
        .from("orders")
        .update({
          fulfillment_status: updatedShipment.status || "PROCESSING",
          shipment: updatedShipment,
        })
        .eq("order_number", orderNumber);
    }

    return NextResponse.json({ success: true, shipment: updatedShipment, order: updated });
  } catch (err) {
    console.error("Admin Shiprocket dispatch error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create Shiprocket order" },
      { status: 500 }
    );
  }
}
