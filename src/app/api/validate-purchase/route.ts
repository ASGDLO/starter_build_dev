import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB"; // Adjust this path to your Prisma setup

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ isValid: false, error: "Email is required" }, { status: 400 });
  }

  try {
    const purchase = await prisma.purchase.findFirst({
      where: { email },
    });

    if (!purchase) {
      return NextResponse.json({ isValid: false });
    }

    return NextResponse.json({ isValid: true, purchaseId: purchase.id });
  } catch (error) {
    console.error("Error querying purchase:", error);
    return NextResponse.json({ isValid: false, error: "Error validating purchase" }, { status: 500 });
  }
}
