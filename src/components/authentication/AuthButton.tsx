import React from 'react';
import { SignedOut, SignInButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function AuthButton() {
  const user = await currentUser();

  return (
    <div>
      {!user && (
        <SignedOut>
          <SignInButton  />
        </SignedOut>
      )}
      {user && <Link href={'/admin'}>Go to DashBoard</Link>}
    </div>
  );
}
