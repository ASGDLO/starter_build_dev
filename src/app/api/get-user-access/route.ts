// src/app/api/get-user-access/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prismaDB';

// Ensure this API route is treated as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ has_access: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { has_access: true },
    });

    if (!user) {
      return NextResponse.json({ has_access: false }, { status: 404 });
    }

    return NextResponse.json({ has_access: user.has_access }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user access:', error);
    return NextResponse.json({ has_access: false }, { status: 500 });
  }
}
