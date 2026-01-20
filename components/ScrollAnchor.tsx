"use client";

import { cn } from "@/lib/utils";

interface ScrollAnchorProps {
  id: string;
  className?: string;
}

/**
 * An invisible anchor element to fix scroll offsets.
 * It has zero height but provides a scroll-margin-top to ensure
 * the following content is not hidden behind the sticky navbar.
 */
export default function ScrollAnchor({ id, className }: ScrollAnchorProps) {
  // scroll-mt-28 = 112px (approx 32px top-offset + 80px navbar height)
  return (
    <div 
      id={id} 
      className={cn("block h-0 w-full scroll-mt-28 md:scroll-mt-32 invisible pointer-events-none", className)}
      aria-hidden="true"
    />
  );
}
