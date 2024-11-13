import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth';
import { cancelLemonSqueezySubscription } from '@/libs/lemonsqueezy';
import { prisma } from '@/utils/prismaDB';
import { z } from 'zod';

// Define the schema for request validation
const cancelSubscriptionSchema = z.object({
  subscriptionId: z.string().nonempty(),
});

export async function POST(request: NextRequest) {
  try {
    // **1. Authentication & Authorization**
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // **2. Parse and Validate Request Body**
    const body = await request.json();
    const { subscriptionId } = cancelSubscriptionSchema.parse(body);
    console.log('Received subscriptionId:', subscriptionId);

    // **3. Log User's Subscriptions (for Debugging)**
    const userSubscriptions = await prisma.subscription.findMany({
      where: { userId: session.user.id },
      select: { subscriptionId: true },
    });
    console.log('User subscriptions:', userSubscriptions);

    // **4. Find Subscription & Verify Ownership**
    const subscription = await prisma.subscription.findUnique({
      where: { subscriptionId: subscriptionId },
    });
    console.log('Retrieved subscription:', subscription);

    if (!subscription) {
      return NextResponse.json(
        { message: 'Subscription not found' },
        { status: 404 }
      );
    }

    if (subscription.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized to cancel this subscription' },
        { status: 403 }
      );
    }

    if (subscription.status === 'cancelled') {
      return NextResponse.json(
        { message: 'Subscription is already cancelled' },
        { status: 400 }
      );
    }

    // **5. Cancel Subscription via Lemon Squeezy**
    await cancelLemonSqueezySubscription(subscription.subscriptionId);

    // **6. Update Subscription Status**
    await prisma.subscription.update({
      where: { subscriptionId: subscriptionId },
      data: {
        status: 'cancelled',
        endDate: new Date(new Date().toUTCString()),
      },
    });

    // **7. Recalculate User Access**
    const activeSubscriptions = await prisma.subscription.findMany({
      where: {
        userId: session.user.id,
        status: {
          in: ['active', 'on_trial', 'paused', 'on_grace_period'],
        },
        endDate: { gte: new Date(new Date().toUTCString()) },
      },
    });

    const hasAccess = activeSubscriptions.length > 0;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        has_access: hasAccess,
      },
    });

    // **8. Respond to Client**
    return NextResponse.json(
      { message: 'Subscription cancelled successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error cancelling subscription:', error);

    // **9. Enhanced Error Handling**
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid request data', errors: error.errors },
        { status: 400 }
      );
    }

    if (error.response && error.response.status === 404) {
      return NextResponse.json(
        { message: 'Subscription not found in Lemon Squeezy' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
