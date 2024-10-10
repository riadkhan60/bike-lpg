import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const qas = await prisma.qA.findMany();
    const videoLinks = await prisma.videoLink.findMany({
      orderBy: { order: 'asc' },
    });
    const products = await prisma.product.findMany();

    return NextResponse.json({ qas, videoLinks, products });
  } catch  {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    let result;

    switch (type) {
      case 'qa':
        result = await prisma.qA.create({ data });
        break;
      case 'videoLink':
        const lastOrder = await prisma.videoLink.findFirst({
          orderBy: { order: 'desc' },
          select: { order: true },
        });
        result = await prisma.videoLink.create({
          data: { ...data, order: (lastOrder?.order ?? 0) + 1 },
        });
        break;
      case 'product':
        result = await prisma.product.create({ data });
        break;
      default:
        throw new Error('Invalid type');
    }

    return NextResponse.json(result, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error: 'Failed to create record' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { type, id, data } = await request.json();
    let result;

    switch (type) {
      case 'qa':
        result = await prisma.qA.update({ where: { id }, data });
        break;
      case 'videoLink':
        result = await prisma.videoLink.update({ where: { id }, data });
        break;
      case 'product':
        result = await prisma.product.update({ where: { id }, data });
        break;
      default:
        throw new Error('Invalid type');
    }

    return NextResponse.json(result);
  } catch  {
    return NextResponse.json(
      { error: 'Failed to update record' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { type, id } = await request.json();
    let result;

    switch (type) {
      case 'qa':
        result = await prisma.qA.delete({ where: { id } });
        break;
      case 'videoLink':
        result = await prisma.videoLink.delete({ where: { id } });
        break;
      case 'product':
        result = await prisma.product.delete({ where: { id } });
        break;
      default:
        throw new Error('Invalid type');
    }

    return NextResponse.json(result);
  } catch  {
    return NextResponse.json(
      { error: 'Failed to delete record' },
      { status: 500 },
    );
  }
}
