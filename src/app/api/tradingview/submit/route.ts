// src/app/api/tradingview/submit/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prismaDB";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { tradingViewId, strategyName } = await request.json();

  if (!tradingViewId || !strategyName) {
    return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: token.email as string,
      },
      select: { has_access: true },
    });

    if (!user || !user.has_access) {
      return NextResponse.json({ message: "Forbidden: No access" }, { status: 403 });
    }

    // Check if the TradingView ID already exists for this user
    const existingSubmission = await prisma.tradingViewSubmission.findFirst({
      where: {
        email: token.email as string,
      },
    });

    if (existingSubmission) {
      return NextResponse.json({ message: "TradingView ID already submitted" }, { status: 409 });
    }

    await prisma.tradingViewSubmission.create({
      data: {
        tradingViewId,
        email: token.email as string,
        strategyName, // Store the strategy name
      },
    });

    return NextResponse.json({ message: "Submission successful!" }, { status: 200 });
  } catch (error) {
    console.error("Error storing submission:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
