import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <Image src="/data/logo.png" alt="logo" width={120} height={100} />
  );
}
