import { NextResponse } from "next/server";
import { verifyAdminPassword, getExpectedSessionToken } from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Invalid admin password" },
        { status: 401 }
      );
    }

    const token = getExpectedSessionToken();
    const response = NextResponse.json({ success: true, message: "Authenticated" });

    // Set HTTP-only secure cookie
    response.cookies.set("gk_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
