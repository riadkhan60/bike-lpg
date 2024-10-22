import React from 'react'

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="py-[13px] px-[29px] text-[18px] rounded-[10px] text-white bg-[#FF9900] font-bold">
      {children}
    </button>
  );
}
