import {  NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// export async function GET(
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const milestone = await prisma.mileStones.findUnique({
//       where: {
//         id: parseInt(params.id),
//       },
//     });
//     return NextResponse.json(milestone);
//   } catch  {
//     return NextResponse.json(
//       { error: 'Error fetching milestone' },
//       { status: 500 },
//     );
//   }
// }

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const json = await request.json();
    const milestone = await prisma.mileStones.update({
      where: {
        id:  parseInt(params.id),
      },
      data: {
        year: json.year,
        text: json.text,
      },
    });
    return NextResponse.json(milestone);
  } catch  {
    return NextResponse.json(
      { error: 'Error updating milestone' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.mileStones.delete({
      where: { id: parseInt(params.id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 },
    );
  }
}
