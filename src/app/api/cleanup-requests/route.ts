import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Delete all used and expired download requests
    const deletedRecords = await prisma.downloadRequest.deleteMany({
      where: {
        OR: [{ used: true }, { expiresAt: { lt: new Date() } }],
      },
    });

    return NextResponse.json({
      message: `Cleaned up ${deletedRecords.count} records`,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Error cleaning up records' },
      { status: 500 },
    );
  }
}
