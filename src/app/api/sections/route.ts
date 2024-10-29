import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      where: { active: true },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      { error: 'Error fetching sections' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const section = await prisma.section.create({
      data: {
        sectionId: data.sectionId,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl || null,
        active: data.active ?? true,
      },
    });

    return NextResponse.json({ section }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error creating section' },
      { status: 500 },
    );
  }
}