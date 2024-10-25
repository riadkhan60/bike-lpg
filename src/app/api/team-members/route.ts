import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all team members
export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(members);
  } catch  {
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 },
    );
  }
}

// POST new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, phone, email, image } = body;

    const member = await prisma.teamMember.create({
      data: {
        name,
        position,
        phone,
        email,
        image,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 },
    );
  }
}
