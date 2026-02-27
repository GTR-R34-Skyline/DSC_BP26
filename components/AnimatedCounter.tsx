"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const inView = useInView(ref, { once: false, margin: "-10px" }); 
  const springValue = useSpring(motionValue, {
    duration: duration * 1000, 
    bounce: 0,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    } else {
      motionValue.set(from);
    }
  }, [inView, motionValue, from, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // integers only
        ref.current.textContent = `${prefix}${latest.toFixed(0)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} className={className} />;
}
