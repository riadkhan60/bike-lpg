import {  NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

interface MessageData {
  email: string;
  lastName: string;
  firstName: string;
  phone: string;
  message: string;
}

export async function GET() {
  try {
    const messages = await prisma.messages.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(messages);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    await prisma.messages.deleteMany();
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
  try {
    // Parse the request body
    const body = await request.json();

    // Handle both cases where data might be nested or not
    const data: MessageData = body.data || body;

    // Validate required fields
    if (
      !data.email ||
      !data.lastName ||
      !data.firstName ||
      !data.phone ||
      !data.message
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    // Explicitly structure the data to match Prisma schema
    const newMessage = await prisma.messages.create({
      data: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        phone: data.phone,
        message: data.message,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    // Log the actual error for debugging
    console.error('Error creating message:', error);

    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 },
    );
  }
}