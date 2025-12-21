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
  "/highlights/DSC_1730.JPG",
  "/highlights/DSC_1757.JPG",
  "/highlights/DSC_1765.JPG",
  "/highlights/DSC_1766.JPG",
  "/highlights/DSC_1902.JPG",
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Blueprints 2025 Rewind
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A glimpse into our previous flagship hackathon where innovation met execution.
          </p>
        </div>

        <div className="relative h-[600px] w-full overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <img
                src={images[currentIndex]}
                alt={`Blueprints 2025 Highlight ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"
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
