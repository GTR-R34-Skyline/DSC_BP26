"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface PulseGlowProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function PulseGlow({ children, className = "", delay = 0 }: PulseGlowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 20px rgba(255,255,255,0.3)",
            "0 0 0px rgba(255,255,255,0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: delay + 0.5, // Start pulse after entrance
        }}
        className="absolute inset-0 rounded-full"
        style={{ pointerEvents: "none" }}
      />
      {children}
    </motion.div>
  );
}
