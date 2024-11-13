// /src/app/api/payment/subscribe/route.ts
import { NextResponse } from "next/server";
import { createLemonSqueezyCheckout } from "@/libs/lemonsqueezy";
import { prisma } from '@/utils/prismaDB';  // Adjust based on your Prisma setup

export async function POST(request: Request) {
  try {
    const { userId, variantId, redirectUrl } = await request.json();
    console.log("API Received:", { userId, variantId, redirectUrl }); // Log to check input

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) {
      console.error("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!variantId || !user.id || !user.email || !redirectUrl) {
      console.error("Invalid input: One or more required fields are null");
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const checkoutURL = await createLemonSqueezyCheckout(variantId, user.id, user.email, redirectUrl);
    console.log("Checkout URL Generated:", checkoutURL); // Log the URL for testing

    return NextResponse.json({ checkoutURL }, { status: 201 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
