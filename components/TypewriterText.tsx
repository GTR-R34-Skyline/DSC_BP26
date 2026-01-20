"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypewriterText({
  text,
  className,
  delay = 0,
}: TypewriterTextProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: isMobile ? 0 : 1, scale: isMobile ? 0.9 : 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.05,
        delayChildren: delay,
        duration: isMobile ? 0.6 : 0,
        ease: "easeOut" as any,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 10 },
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
