// src/app/api/get-subscriptions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prismaDB';

interface UserResponse {
  id: string;
  name: string | null;
  email: string | null;
}

interface SubscriptionResponse {
  id: string;
  subscriptionId: string;
  planType: string | null;
  status: string;
  endDate: string;
  remainingDays: number;
}

interface GetSubscriptionsResponse {
  user: UserResponse;
  subscriptions: SubscriptionResponse[];
}

// Ensure this API route is treated as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate the user
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      console.warn("Unauthorized access attempt.");
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch User Information including has_access
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        has_access: true, // Include has_access
      },
    });

    if (!user) {
      console.warn(`User with ID ${session.user.id} not found.`);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 4. Define Active Statuses
    const activeStatuses = ['active']; // Modify this array if there are multiple active statuses

    // 5. Fetch the active subscriptions for the authenticated user
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: session.user.id,
        status: {
          in: activeStatuses, // Filter to include only active subscriptions
        },
      },
      orderBy: { createdAt: 'desc' }, // Optional: Order by creation date
    });

    console.log(`Fetched ${subscriptions.length} active subscriptions for user ${user.id}.`);

    // 6. Calculate Remaining Days for Each Subscription
    const enhancedSubscriptions: SubscriptionResponse[] = subscriptions.map((sub) => {
      const today = new Date(new Date().toUTCString());
      const endDate = new Date(sub.endDate);
      const timeDifference = endDate.getTime() - today.getTime();
      let remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      // Ensure that remainingDays is not negative
      if (remainingDays < 0) {
        remainingDays = 0;
      }

      return {
        id: sub.id, // Internal ID
        subscriptionId: sub.subscriptionId, // External subscriptionId from Lemon Squeezy
        planType: sub.planType,
        status: sub.status.toUpperCase(), // Ensure consistent casing
        endDate: sub.endDate.toISOString(),
        remainingDays,
      };
    });

    // 7. Structure the Response
    const response: GetSubscriptionsResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      subscriptions: enhancedSubscriptions,
    };

    // 8. Return the enhanced subscriptions and user info in the response
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
