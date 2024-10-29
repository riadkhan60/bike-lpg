import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { sectionId: string } },
) {
  try {
    const { imageUrl } = await request.json();
    const { sectionId } = params;

    const updatedSection = await prisma.section.update({
      where: { sectionId },
      data: {
        imageUrl,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { error: 'Error updating section' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sectionId: string } },
) {
  try {
    const { sectionId } = params;



    const clearedSection = await prisma.section.update({
      where: { sectionId },
      data: {
        imageUrl: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(clearedSection);
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error deleting image' },
      { status: 500 },
    );
  }
}
