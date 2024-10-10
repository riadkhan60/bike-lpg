import Logo from '@/components/brandUI/Logo';
import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (user) {
    redirect('/admin');
  }
  return (
    <div className="h-screen flex-col flex justify-center items-center">
      <div className="mb-5">
        <Logo />
      </div>
      {children}
    </div>
  );
}
