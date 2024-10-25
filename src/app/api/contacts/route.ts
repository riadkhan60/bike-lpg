import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        company: true,
      },
    });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json(
      { error: 'Error fetching contacts' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const contact = await prisma.contact.create({
      data: {
        companyId: json.companyId,
        phone: json.phone,
        email: json.email,
        location: json.location,
        facebook: json.facebook,
        whatsapp: json.whatsapp,
        tiktok: json.tiktok,
        youtube: json.youtube,
        instagram: json.instagram,
        linkedin: json.linkedin,
      },
    });
    return NextResponse.json(contact);
  } catch {
    return NextResponse.json(
      { error: 'Error creating contact' },
      { status: 500 },
    );
  }
}
