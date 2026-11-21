import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { updateOrderShipment, getOrderByNumber } from "@/lib/orders";
import { supabase, isSupabaseConfigured } from "@/lib/supabase.js";

export async function PATCH(request, context) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const params = await context.params;
    const { id: orderNumber } = params;
    const body = await request.json();
    const { fulfillmentStatus, awbNumber, courier, trackingUrl } = body;

    const existingOrder = await getOrderByNumber(orderNumber);
    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const currentShipment = existingOrder.shipment || {};
    const updatedShipment = {
      ...currentShipment,
      status: fulfillmentStatus || currentShipment.status || "PROCESSING",
      courier: courier || currentShipment.courier || "Delhivery Surface",
      awbNumber: awbNumber !== undefined ? awbNumber : currentShipment.awbNumber,
      trackingUrl:
        trackingUrl ||
        (awbNumber
          ? `https://www.delhivery.com/track/package/${awbNumber}`
          : currentShipment.trackingUrl),
      updatedAt: new Date().toISOString(),
    };

    // Update in Supabase or file storage
    const updated = await updateOrderShipment(orderNumber, updatedShipment);

    if (isSupabaseConfigured && fulfillmentStatus) {
      await supabase
        .from("orders")
        .update({
          fulfillment_status: fulfillmentStatus,
          shipment: updatedShipment,
        })
        .eq("order_number", orderNumber);
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    console.error("Admin order update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
