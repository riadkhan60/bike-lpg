import { ReactLenis } from 'lenis/react';
import React from 'react';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactLenis root>{children}</ReactLenis>;
}
