import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(member);
  } catch  {
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 },
    );
  }
}

// PUT update team member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { name, position, phone, email, image } = body;

    const member = await prisma.teamMember.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        position,
        phone,
        email,
        image,
      },
    });

    return NextResponse.json(member);
  } catch  {
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 },
    );
  }
}

// DELETE team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.teamMember.delete({
      where: { id: parseInt(params.id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch  {
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 },
    );
  }
}
