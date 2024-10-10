// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';

// Remove the deprecated config export

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'public/uploads');

    // Create the uploads directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename =
      file.name.replace(/\.[^/.]+$/, '') +
      '-' +
      uniqueSuffix +
      extname(file.name);
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);
    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 },
    );
  }
}

// Add necessary route segment configs
export const runtime = 'nodejs'; // Required for file system operations
export const dynamic = 'force-dynamic'; // Prevents caching of the API route
