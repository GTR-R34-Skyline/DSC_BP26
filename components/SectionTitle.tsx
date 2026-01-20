"use client";

import { motion } from "motion/react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export default function SectionTitle({ title, subtitle, className = "", id }: SectionTitleProps) {
  return (
    <div className={`text-center mb-12 ${className}`} id={id}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm md:text-base text-white/50 font-mono tracking-wider uppercase mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="inline-block relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white relative z-10"
        >
          {title}
        </motion.h2>
        <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-4 origin-left rounded-full"
        />
      </div>
    </div>
  );
}
