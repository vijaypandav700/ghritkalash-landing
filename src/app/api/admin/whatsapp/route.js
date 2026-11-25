import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getOrderByNumber } from "@/lib/orders";
import { sendAdminWhatsAppNotification, isWhatsAppConfigured } from "@/lib/whatsapp";

export async function POST(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!isWhatsAppConfigured) {
    return NextResponse.json(
      {
        success: false,
        message:
          "WhatsApp alert is not configured. Please add ADMIN_WHATSAPP_PHONE and CALLMEBOT_API_KEY in Vercel / .env.",
      },
      { status: 400 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { orderNumber } = body;

    let testOrder = null;
    if (orderNumber) {
      testOrder = await getOrderByNumber(orderNumber);
    }

    if (!testOrder) {
      testOrder = {
        orderNumber: `GK-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
        pricing: { totalAmount: 850 },
        customer: {
          name: "Test Customer (Sample Alert)",
          phone: "9876543210",
          city: "Pune",
          pincode: "411068",
          address: "Sample Address, Nanded City, Pune",
        },
        items: [
          {
            name: "GHRITKALASH A2 Cow Ghee",
            variantLabel: "500 ml Glass Jar",
            qty: 1,
          },
        ],
        shipment: {
          courier: "Delhivery Surface",
          awbNumber: "DLH987654321",
        },
      };
    }

    const result = await sendAdminWhatsAppNotification(testOrder);
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Test WhatsApp notification sent to your phone!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Failed to send alert: ${result.reason || result.error || "Unknown error"}`,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to trigger WhatsApp test" },
      { status: 500 }
    );
  }
}
