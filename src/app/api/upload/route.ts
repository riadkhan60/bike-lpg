// // app/api/upload/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { writeFile, mkdir } from 'fs/promises';
// import { join, extname } from 'path';

// // Remove the deprecated config export

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('image') as File | null;

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadDir = join(process.cwd(), 'public/uploads');

//     // Create the uploads directory if it doesn't exist
//     await mkdir(uploadDir, { recursive: true });

//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const filename =
//       file.name.replace(/\.[^/.]+$/, '') +
//       '-' +
//       uniqueSuffix +
//       extname(file.name);
//     const filepath = join(uploadDir, filename);

//     await writeFile(filepath, buffer);
//     const fileUrl = `/uploads/${filename}`;
//     return NextResponse.json({ url: fileUrl }, { status: 200 });
//   } catch (error) {
//     console.error('Error saving file:', error);
//     return NextResponse.json(
//       { error: 'Error uploading file' },
//       { status: 500 },
//     );
//   }
// }

// // Add necessary route segment configs
// export const runtime = 'nodejs'; // Required for file system operations
// export const dynamic = 'force-dynamic'; // Prevents caching of the API route

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary,  } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  version: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the image to Cloudinary (wrapped in a Promise for async/await support)
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(buffer); // Send buffer data to upload stream
    });


    // Return the URL of the uploaded image
    return NextResponse.json(
      { url: (result as CloudinaryUploadResult).secure_url },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 },
    );
  }
}
