import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 points
  duration: 3600, // Per hour
});

export async function POST(request: Request) {
  const { email } = await request.json();
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr');

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  try {
    const ipAddress = ip || 'unknown'; // Provide a default value
    await rateLimiter.consume(ipAddress); // Consume 1 point per request

    const existingSubscription = await prisma.newsletterEmail.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      return new NextResponse("Email already exists", { status: 409 });
    }

    const newSubscription = await prisma.newsletterEmail.create({
      data: { email },
    });

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return new NextResponse("Too many requests. Please try again later.", { status: 429 });
    }
    console.error("Error creating subscription:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
