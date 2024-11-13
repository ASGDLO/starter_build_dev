// src/app/api/subscription/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prismaDB';

// Define a custom type for the user session
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function GET(request: NextRequest) {
  // Retrieve the session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Cast session.user to CustomUser
  const user = session.user as CustomUser;

  try {
    // Fetch the latest subscription for the user
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,  // Use the casted user object
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!subscription) {
      return NextResponse.json({ subscription: null }, { status: 200 });
    }

    return NextResponse.json({ subscription }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
