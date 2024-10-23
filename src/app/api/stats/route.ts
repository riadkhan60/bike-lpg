// app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'; // Assuming you have prisma client setup in lib/prisma

// GET method to fetch stats
export async function GET() {
  try {
    // Get the first stats record or create one if it doesn't exist
    const stats =
      (await prisma.stats.findFirst()) ||
      (await prisma.stats.create({
        data: {
          employees: 0,
          dealers: 0,
          clientsServed: 0,
          solutions: 0,
          satiesfiedClients: 0,
          lpgConversion: 0,
          fuelstation: 0,
          furnitureSold: 0,
        },
      }));

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 },
    );
  }
}

// PATCH method to update stats
export async function PATCH(request: NextRequest) {
  try {
    const { id, field, value } = await request.json();

    // Validate inputs
    if (!id || !field || value === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Validate field name to prevent injection
    const allowedFields = [
      'employees',
      'dealers',
      'clientsServed',
      'solutions',
      'satiesfiedClients',
      'lpgConversion',
      'fuelstation',
      'furnitureSold',
    ];

    if (!allowedFields.includes(field)) {
      return NextResponse.json(
        { error: 'Invalid field name' },
        { status: 400 },
      );
    }

    // Create dynamic update object
    const updateData = {
      [field]: parseInt(value),
    };

    // Update the specific field
    const updatedStats = await prisma.stats.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedStats);
  } catch (error) {
    console.error('Error updating stats:', error);
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 },
    );
  }
}
