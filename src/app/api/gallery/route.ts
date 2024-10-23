import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const createImageSchema = z.object({
  image: z.string().url().min(1, 'Image URL is required'),
});

const deleteImageSchema = z.object({
  id: z.string().min(1, 'Image ID is required'),
});

// Error handler utility
const handleError = (error: unknown) => {
  console.error('Gallery API Error:', error);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: 'Validation Error', details: error.errors },
      { status: 400 },
    );
  }

  if (error instanceof Error) {
    // Check for Prisma-specific errors
    if (error.name === 'PrismaClientKnownRequestError') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code === 'P2025') {
        return NextResponse.json(
          { error: 'Record not found' },
          { status: 404 },
        );
      }
    }
  }

  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validated = createImageSchema.parse(data);

    const newImage = await prisma.images.create({
      data: { image: validated.image },
    });

    return NextResponse.json(newImage, { status: 201, });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const images = await prisma.images.findMany();

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const validated = deleteImageSchema.parse(data);

    const deletedImage = await prisma.images.delete({
      where: { id: validated.id },
    });

    return NextResponse.json(deletedImage, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
