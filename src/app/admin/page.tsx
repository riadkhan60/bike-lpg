'use client';
import CMSAdminPanel from '@/components/dashBoard/CMSAdminPanel';
import { Protect } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function page() {
  return (
    <Protect fallback={<FallBack />}>
      <div>
        <CMSAdminPanel />
      </div>
    </Protect>
  );
}

function FallBack() {
  return (
    <div className="flex w-full h-screen flex-col justify-center items-center">
      <Image src={'/data/robot.png'} alt="logo" width={400} height={400} />
      <p className="text-2xl font-medium mt-5 ">{"can't"} access this page</p>
      <div className="mt-6 text-[18px] leading-[100%] rounded-[10px] px-[30px] py-[11px] bg-[#FF9900] text-white ">
        <Link href="/auth/sign-in">Login</Link>
      </div>
    </div>
  );
}
