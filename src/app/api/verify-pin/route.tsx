import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    // Find and validate PIN
    const downloadRequest = await prisma.downloadRequest.findFirst({
      where: {
        pin,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!downloadRequest) {
      return NextResponse.json(
        { message: 'Invalid or expired PIN' },
        { status: 400 },
      );
    }

    // Mark PIN as used
    await prisma.downloadRequest.update({
      where: { id: downloadRequest.id },
      data: { used: true },
    });

    // Generate temporary download URL from Firebase Storage
    const fileRef = ref(storage, 'bike.pdf');
    const downloadUrl = await getDownloadURL(fileRef);

    return NextResponse.json({ downloadUrl });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Error verifying PIN' },
      { status: 500 },
    );
  }
}
