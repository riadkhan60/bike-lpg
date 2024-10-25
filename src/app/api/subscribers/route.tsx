import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const emails = await prisma.subscribers.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return NextResponse.json(emails);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    await prisma.subscribers.deleteMany();
    return NextResponse.json(
      { message: 'All messages deleted successfully' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete all messages' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

    const { email } = body as { email?: string };

    // Validate email presence
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscribers.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 },
      );
    }

    // Create new subscriber
    const newSubscriber = await prisma.subscribers.create({
      data: {
        email: email.toLowerCase(),
      },
    });

    return NextResponse.json(
      {
        message: 'Subscriber added successfully',
        status: 'success',
        subscriber: newSubscriber,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Subscription error:', error);

    // Type guard for Prisma errors
    if (error instanceof Error && 'code' in error) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to add subscriber',
        status: 'error',
      },
      { status: 500 },
    );
  }
}
