import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Karma } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Bike LPG',
  description: 'BikeLPG is a new way to save 50% of your fuel!',
};

const karma = Karma({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${karma.className} ${inter.className}`}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
