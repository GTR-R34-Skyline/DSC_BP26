"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconArrowUpRight } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState, ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-8 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // Only pass visible to React components, not DOM elements
        if (typeof child.type === 'string') {
          return child;
        }
        return React.cloneElement(child as React.ReactElement<any>, { visible });
      })}
    </motion.div>
  );
};

interface NavBodyProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

export const NavBody = ({ children, className, visible = false }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      style={{
        willChange: "backdrop-filter, box-shadow, width, transform",
        minWidth: "950px",
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent pl-2 pr-6 py-4 lg:flex",
        visible && "bg-black/70 border border-white/10",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // Only pass visible to React components, not DOM elements
        if (typeof child.type === 'string') {
          return child;
        }
        return React.cloneElement(child as React.ReactElement<any>, { visible });
      })}
    </motion.div>
  );
};

interface NavItemsProps {
  items: Array<{ name: string; link: string }>;
  className?: string;
  onItemClick?: () => void;
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-white/80 hover:text-white/90"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/10"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

interface MobileNavProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

export const MobileNav = ({ children, className, visible = false }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      style={{
        willChange: "backdrop-filter, box-shadow, width, padding, border-radius, transform",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-4 py-3 lg:hidden",
        visible && "bg-black/70 border border-white/10",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // Only pass visible to React components, not DOM elements
        if (typeof child.type === 'string') {
          return child;
        }
        return React.cloneElement(child as React.ReactElement<any>, { visible });
      })}
    </motion.div>
  );
};

interface MobileNavHeaderProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

export const MobileNavHeader = ({ children, className, visible = false }: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // Only pass visible to React components, not DOM elements
        if (typeof child.type === 'string') {
          return child;
        }
        return React.cloneElement(child as React.ReactElement<any>, { visible });
      })}
    </div>
  );
};

interface MobileNavMenuProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-black/90 backdrop-blur-md px-4 py-8 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/10",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileNavToggle = ({ isOpen, onClick }: MobileNavToggleProps) => {
  return isOpen ? (
    <IconX className="text-white/90" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white/90" onClick={onClick} />
  );
};

interface NavbarLogoProps {
  visible?: boolean;
}

export const NavbarLogo = ({ visible = false }: NavbarLogoProps) => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center gap-2 mr-20"
    >
      <span className="text-white text-2xl font-bold">
        &lt;&gt;
      </span>
      <span className="relative text-white text-xl tracking-wide whitespace-nowrap">
        <motion.span
          initial={false}
          animate={{
            opacity: visible ? 0 : 1,
            x: visible ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          Developer Student Community,SVCE
        </motion.span>
        <motion.span
          initial={false}
          animate={{
            opacity: visible ? 1 : 0,
            x: visible ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
          className="inline-block absolute left-0 top-0"
        >
          DSC
        </motion.span>
      </span>
    </a>
  );
};

interface NavbarButtonProps {
  href?: string;
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  visible?: boolean;
  [key: string]: any;
}

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  visible, // Extract visible prop to prevent it from being passed to DOM
  ...props
}: NavbarButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]",
    secondary: "bg-transparent shadow-none text-white/80 hover:text-white/90 hover:bg-white/5",
    dark: "bg-white/10 text-white/90 shadow-none hover:bg-white/20",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

