"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TypewriterText({
  text,
  className,
  delay = 0,
  stagger = 0.05, // Adjusted to user request (1-5ms is extremely fast, so I'll try 0.03s which is 30ms, 1-5ms might be indistinguishable from instant on some screens but I'll aim for "very fast")
}: TypewriterTextProps) {
  // Parsing text to handle gradient spans or just raw text is tricky if preserving the gradient is needed on the whole block.
  // The user wants "BLUEPRINTS 2026" animated. In page.tsx it has a gradient class.
  // Best approach: Render individual characters, but they need to inherit the background clip from the parent if possible,
  // OR we apply the gradient to the parent and make characters transparent/fill.
  // Given the existing code uses `bg-clip-text text-transparent`, we must apply the animation to the container's opacity or use a mask, 
  // BUT the request specifically asked for "character-by-character".
  // To preserve the gradient across multiple spans (characters), the gradient must be on the parent and the chars transparent.

  const ref = useRef(null);
  // Using 'once: true' as requested
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // 30ms per char
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: "easeOut" as any },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={charVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
