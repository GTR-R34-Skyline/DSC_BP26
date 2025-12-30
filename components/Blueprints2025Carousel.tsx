"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/highlights/DSC_1570.JPG",
  "/highlights/DSC_1579.JPG",
  "/highlights/DSC_1584.JPG",
  "/highlights/DSC_1590.JPG",
  "/highlights/DSC_1631.JPG",
  "/highlights/DSC_1711.JPG",
  "/highlights/DSC_1757.JPG",
  "/highlights/DSC_1765.JPG",
  "/highlights/DSC_1766.JPG",
  "/highlights/DSC_1903.JPG",
];

export default function Blueprints2025Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Blueprints 2025 Rewind
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A glimpse into our previous flagship hackathon where innovation met execution.
          </p>
        </div>

        {/* Aspect-ratio based container instead of fixed height */}
        <div className="relative w-full aspect-[16/9] bg-black overflow-hidden rounded-xl">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

              {/* Image */}
              <img
                src={images[currentIndex]}
                alt={`Blueprints 2025 Highlight ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain z-0"
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/30 w-3 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
