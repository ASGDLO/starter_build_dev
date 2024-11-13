import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prismaDB";
import { getToken } from "next-auth/jwt";

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const submission = await prisma.tradingViewSubmission.findFirst({
      where: {
        email: token.email as string,
      },
      select: {
        id: true,
      },
    });

    if (!submission || !submission.id) {
      return NextResponse.json({ message: "No TradingView ID found to delete" }, { status: 404 });
    }

    const deletedSubmission = await prisma.tradingViewSubmission.delete({
      where: {
        id: submission.id,
      },
    });

    return NextResponse.json({ message: "TradingView ID deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}