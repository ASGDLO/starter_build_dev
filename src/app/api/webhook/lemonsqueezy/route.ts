// src/app/api/webhook/lemonsqueezy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prismaDB';
import crypto from 'crypto';

// Function to verify LemonSqueezy signature
function verifyLemonSqueezySignature(signature: string | null, rawBody: string): boolean {
  if (!signature) return false;

  const secret = process.env.LEMONSQUEEZY_SIGNING_SECRET!;
  if (!secret) {
    console.error('LEMONSQUEEZY_SIGNING_SECRET is not set');
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');

  try {
    const signatureBuffer = Buffer.from(signature, 'hex'); // Adjust encoding if necessary
    const digestBuffer = Buffer.from(digest, 'hex');

    if (signatureBuffer.length !== digestBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(digestBuffer, signatureBuffer);
  } catch (error) {
    console.error('Error comparing signatures:', error);
    return false;
  }
}

// Webhook POST handler
export async function POST(request: NextRequest) {
  try {
    // **1. Get the raw body text**
    const rawBody = await request.text();

    // **2. Parse the raw body as JSON**
    const body = JSON.parse(rawBody);

    // **3. Log the body for debugging**
    console.log('Received webhook body:', body);

    const { data, meta } = body;
    const eventName = meta.event_name;

    // **4. Log the event name**
    console.log('Event name:', eventName);

    // **5. Define the events you want to handle**
    const handledEvents = [
      'subscription_created',
      'subscription_updated',
      'subscription_cancelled',
      'subscription_expired',
      // 'order_created', // Uncomment if needed
    ];

    if (!handledEvents.includes(eventName)) {
      console.log(`Unhandled event type: ${eventName}`);
      return NextResponse.json({ message: 'Event type not handled' }, { status: 200 });
    }

    // **6. Verify the signature unless in test mode**

    const signature = request.headers.get('x-signature'); // Use the correct header name
    if (!signature || !verifyLemonSqueezySignature(signature, rawBody)) {
      console.error('Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    

    // **7. Extract the userId from meta.custom_data**
    let userId: string | undefined;

    if (meta.custom_data) {
      if (typeof meta.custom_data === 'string') {
        try {
          const customData = JSON.parse(meta.custom_data);
          userId = customData.userId || customData.user_id;
        } catch (error) {
          console.error('Failed to parse custom_data:', error);
        }
      } else if (typeof meta.custom_data === 'object') {
        userId = meta.custom_data.userId || meta.custom_data.user_id;
      }
    }

    if (!userId) {
      console.error('User ID not found in custom data');
      return NextResponse.json({ message: 'User ID not found in custom data' }, { status: 400 });
    }

    // **8. Find the user in your database**
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.error('User not found');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // **9. Handle different event types**
    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated': {
        const status = data.attributes.status;
        const renewsAt = data.attributes.renews_at ? new Date(data.attributes.renews_at) : undefined;
        const endsAt = data.attributes.ends_at ? new Date(data.attributes.ends_at) : undefined;
        const createdAt = data.attributes.created_at ? new Date(data.attributes.created_at) : new Date();

        // Determine the endDate based on the subscription status
        let endDate: Date | undefined;

        if (['active', 'on_trial', 'on_grace_period', 'paused'].includes(status)) {
          // For active subscriptions, set endDate to renews_at
          endDate = renewsAt;
        } else if (['cancelled', 'expired'].includes(status)) {
          // For cancelled or expired subscriptions, set endDate to ends_at
          endDate = endsAt;
        } else {
          // Default fallback
          endDate = renewsAt || endsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 1 month
        }

        const updateData: any = {
          status: status,
          renewalDate: renewsAt,
          planType: data.attributes.variant_name || data.attributes.plan_type,
          startDate: createdAt,
          email: data.attributes.user_email, // Update email in case it changes
          endDate: endDate,
        };

        await prisma.subscription.upsert({
          where: { subscriptionId: data.id.toString() },
          update: updateData,
          create: {
            userId: userId,
            productId: data.attributes.product_id,
            status: status,
            subscriptionId: data.id.toString(),
            email: data.attributes.user_email,
            startDate: createdAt,
            endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 1 month if undefined
            renewalDate: renewsAt,
            planType: data.attributes.variant_name || data.attributes.plan_type,
          },
        });
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_expired': {
        const status = data.attributes.status;
        const endsAt = data.attributes.ends_at ? new Date(data.attributes.ends_at) : new Date();

        const subscription = await prisma.subscription.findUnique({
          where: { subscriptionId: data.id.toString() }, // Using subscriptionId
        });

        if (!subscription) {
          console.error(`Subscription with subscriptionId ${data.id} not found`);
          return NextResponse.json(
            { message: `Subscription with subscriptionId ${data.id} not found` },
            { status: 404 }
          );
        }

        await prisma.subscription.update({
          where: { subscriptionId: data.id.toString() }, // Using subscriptionId
          data: {
            status: status,
            endDate: endsAt, // Set to ends_at or current date if undefined
          },
        });
        break;
      }

      // Uncomment and handle other events if needed
      // case 'order_created':
      //   // Record the purchase
      //   await prisma.purchase.create({
      //     data: {
      //       userId: userId,
      //       productId: data.attributes.product_id,
      //       status: data.attributes.status,
      //       purchaseId: data.id.toString(),
      //       email: data.attributes.user_email,
      //       renewalDate: data.attributes.renews_at ? new Date(data.attributes.renews_at) : undefined,
      //       planType: data.attributes.plan_type,
      //     },
      //   });
      //   break;

      default:
        console.log(`No handler for event type: ${eventName}`);
    }

    // **10. Update user's access based on active subscriptions**
    const activeSubscriptions = await prisma.subscription.findMany({
      where: {
        userId: userId,
        status: { in: ['active', 'on_trial', 'paused', 'on_grace_period'] },
        endDate: { gte: new Date() },
      },
    });

    const hasAccess = activeSubscriptions.length > 0;

    await prisma.user.update({
      where: { id: userId },
      data: { has_access: hasAccess },
    });

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
