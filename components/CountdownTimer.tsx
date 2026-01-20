"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const CountdownTimer = () => {
  const targetDate = new Date("2026-04-04T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isClient) return null; // Prevent hydration mismatch

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl md:text-5xl font-bold text-white tabular-nums drop-shadow-lg"
      >
        {value.toString().padStart(2, "0")}
      </motion.div>
      <span className="text-xs md:text-sm text-white/50 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-8 md:mt-12 pb-4 md:pb-8">
      <p className="text-white/70 uppercase tracking-widest text-[10px] md:text-sm mb-3 md:mb-4 font-semibold">
        Hackathon Begins In
      </p>
      <div className="flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-2xl">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-xl md:text-4xl text-white/30 -mt-4 md:-mt-6">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-xl md:text-4xl text-white/30 -mt-4 md:-mt-6">:</span>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <span className="text-xl md:text-4xl text-white/30 -mt-4 md:-mt-6">:</span>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default CountdownTimer;
