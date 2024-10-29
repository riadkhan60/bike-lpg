// app/api/product/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const product = await prisma.featuredProduct.findFirst({
      include: {
        features: true,
      },
    });
    return NextResponse.json(product);
  } catch  {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, description, imageUrl, features } = await request.json();

    const updatedProduct = await prisma.featuredProduct.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        features: {
          deleteMany: {},
          createMany: {
            data: features.map(
              (feature: { title: string; description: string }) => ({
                title: feature.title,
                description: feature.description,
              }),
            ),
          },
        },
      },
      include: {
        features: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch  {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 },
    );
  }
}
