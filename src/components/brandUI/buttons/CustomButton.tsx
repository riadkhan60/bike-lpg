import { cn } from '@/lib/utils';
import React from 'react';

export default function CustomButton({
  children,
  type,
  className,
}: {
  children: React.ReactNode;
  type: string;
  className?: string;
}) {
  return (
    <>
      {type === 'primary' && (
        <div
          className={cn(
            'text-[18px] rounded-[10px] text-white font-medium px-[30px] py-[11px] bg-[#FF9900]',
            className,
          )}
        >
          {children}
        </div>
      )}
      {type === 'secondary' && (
        <div
          className={cn(
            'text-[18px] rounded-[10px] text-white font-medium px-[30px] py-[11px] bg-black',
            className,
          )}
        >
          {children}
        </div>
      )}
    </>
  );
}
