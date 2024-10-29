import {  NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const milestones = await prisma.mileStones.findMany({
      orderBy: {
        year: 'desc',
      },
    });
    return NextResponse.json(milestones);
  } catch  {
    return NextResponse.json(
      { error: 'Error fetching milestones' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const milestone = await prisma.mileStones.create({
      data: {
        year: json.year,
        text: json.text,
      },
    });
    return NextResponse.json(milestone);
  } catch  {
    return NextResponse.json(
      { error: 'Error creating milestone' },
      { status: 500 },
    );
  }
}