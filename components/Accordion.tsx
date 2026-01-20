"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const AccordionItem = ({ question, answer, isOpen, onClick, index }: AccordionItemProps) => {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 transition-colors hover:bg-white/10">
      <button
        type="button"
        id={`accordion-header-${index}`}
        aria-controls={`accordion-content-${index}`}
        aria-expanded={isOpen}
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-white/50"
        >
          <IconChevronDown size={24} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${index}`}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  items: { q: string; a: string }[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          index={idx}
          question={item.q}
          answer={item.a}
          isOpen={activeIndex === idx}
          onClick={() => handleItemClick(idx)}
        />
      ))}
    </div>
  );
}
