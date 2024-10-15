import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Bike LPG',
  description: 'BikeLPG is a new way to save 50% of your fuel!',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 
        <ClerkProvider>
          <body className={`${poppins.className}  antialiased`}>
            {children}
          </body>
        </ClerkProvider>

    </html>
  );
}
