import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: params.id,
      },
      include: {
        company: true,
      },
    });
    return NextResponse.json(contact);
  } catch  {
    return NextResponse.json(
      { error: 'Error fetching contact' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const json = await request.json();
    const contact = await prisma.contact.update({
      where: {
        id: params.id,
      },
      data: {
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
  } catch  {
    return NextResponse.json(
      { error: 'Error updating contact' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.contact.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: 'Contact deleted' });
  } catch  {
    return NextResponse.json(
      { error: 'Error deleting contact' },
      { status: 500 },
    );
  }
}
