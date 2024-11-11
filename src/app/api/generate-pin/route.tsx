import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const email = `khanriad60@gmail.com`;
export async function POST() {
  try {
   
    // Count active download requests
    const activeRequestsCount = await prisma.downloadRequest.count({
      where: {
        AND: [{ used: false }, { expiresAt: { gt: new Date() } }],
      },
    });

    // If approaching limit (e.g., 45 rows), trigger cleanup
    if (activeRequestsCount >= 45) {
      await fetch('/api/cleanup-requests', { method: 'POST' });
    }

    // Check again after cleanup
    const remainingSlots = await prisma.downloadRequest.count();
    if (remainingSlots >= 50) {
      return NextResponse.json(
        { message: 'Database capacity reached. Please try again later.' },
        { status: 503 },
      );
    }

    const pin = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 30 * 60000); // 30 minutes expiry

    try {
      // Store PIN in database
      await prisma.downloadRequest.create({
        data: {
          pin,
          expiresAt,
          used: false,
        },
      });

      // Only send email if database operation was successful
      await resend.emails.send({
        from: 'client_contact <web@msjannattraders.com>',
        to: email,
        subject: 'Your PDF Download PIN',
        html: `
          <h2>Your Download PIN</h2>
          <p>Use this PIN to download your PDF: <strong>${pin}</strong></p>
          <p>This PIN will expire in 30 minutes.</p>
        `,
      });

      return NextResponse.json({ message: 'PIN sent successfully' });
    } catch (dbError) {
      console.error('Database or email error:', dbError);
      // If database operation fails, return a specific error
      return NextResponse.json(
        { message: 'Failed to generate PIN. Please try again.' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
