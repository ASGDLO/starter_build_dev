import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prismaDB";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingSubmission = await prisma.tradingViewSubmission.findFirst({
      where: {
        email: token.email as string,
      },
    });

    if (!existingSubmission) {
      return NextResponse.json({ message: "No TradingView ID found" }, { status: 404 });
    }

    return NextResponse.json({ tradingViewId: existingSubmission.tradingViewId }, { status: 200 });
  } catch (error) {
    console.error("Error fetching TradingView ID:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}