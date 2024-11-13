// /src/app/api/cron/update-subscriptions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prismaDB'; // Ensure this path is correct
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the handler for POST requests
export async function POST(request: NextRequest) {
  try {
    // Authenticate the request using a secret token
    const authHeader = request.headers.get('Authorization');
    const CRON_SECRET = process.env.CRON_SECRET;

    if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
      console.error('Unauthorized access attempt to cron job.');
      console.log('Expected CRON_SECRET:', CRON_SECRET);

      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date(new Date().toUTCString());

    // Find subscriptions that have expired but are still marked as active or renewed
    const expiredSubscriptions = await prisma.subscription.findMany({
      where: {
        endDate: { lt: new Date(new Date().toUTCString()) },
        status: { in: ['active', 'renewed'] },
      },
    });

    for (const subscription of expiredSubscriptions) {
      // Update subscription status to 'expired'
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'expired' },
      });

      // Check if the user has any other active subscriptions
      const activeSubscriptions = await prisma.subscription.findMany({
        where: {
          userId: subscription.userId,
          status: { in: ['active', 'renewed'] },
          endDate: { gte: now },
        },
      });

      const hasAccess = activeSubscriptions.length > 0;

      // Update user's access
      await prisma.user.update({
        where: { id: subscription.userId },
        data: { has_access: hasAccess },
      });

      console.log(
        `Subscription ${subscription.id} for user ${subscription.userId} has been marked as expired. Access set to ${hasAccess}.`
      );
    }

    return NextResponse.json({ message: 'Subscription update completed successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error processing cron job:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
