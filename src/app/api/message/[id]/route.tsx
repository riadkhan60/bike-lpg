import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';



export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'Message ID is required' },
      { status: 400 },
    );
  }

  try {
    await prisma.messages.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 },
    );
  } catch  {
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 },
    );
  }
}


