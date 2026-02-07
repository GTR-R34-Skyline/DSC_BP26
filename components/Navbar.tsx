"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState, ReactNode } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

// ============ NAVBAR COMPONENTS ============

interface NavbarProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Navbar = ({ children, className, id }: NavbarProps) => {
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
      id={id}
      className={cn("sticky inset-x-0 top-8 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
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
        width: visible ? "85%" : "100%",
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
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center gap-8 self-start rounded-full bg-transparent pl-2 pr-6 py-4 lg:flex",
        visible && "bg-black/70 border border-white/10",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
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
  activeTab?: string;
}

export const NavItems = ({ items, className, onItemClick, activeTab, visible, ...props }: NavItemsProps & { visible?: boolean }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex",
        className
      )}
      {...props}
    >
      {items.map((item, idx) => {
        const isActive = activeTab === item.link || activeTab === item.link.substring(1);
        
        return (
          <a
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 text-sm transition-colors duration-200",
              isActive ? "text-white font-semibold" : "text-white/70 hover:text-white/90"
            )}
            key={`link-${idx}`}
            href={item.link}
          >
            {isActive && (
               <motion.div
                layoutId="active-pill"
                className="absolute inset-0 h-full w-full rounded-full bg-white/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {hovered === idx && !isActive && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-white/5"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </a>
        );
      })}
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
      href="/"
      className="relative z-20 flex items-center gap-2 flex-shrink-0"
    >
      <span className="text-white text-sm font-bold leading-none">
        &lt;&gt;
      </span>
      <span className="block md:hidden text-white text-sm font-bold tracking-wide leading-none">
        DSC
      </span>
      <span className="hidden md:block text-white text-sm tracking-wide leading-none whitespace-nowrap">
        Developer Student Community
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
  visible,
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

interface SocialIconsProps {
  className?: string;
  visible?: boolean;
  children: ReactNode;
}

export const SocialIcons = ({ className, visible, children }: SocialIconsProps) => {
  return (
    <AnimatePresence>
      {!visible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          className={cn("", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============ APP NAVBAR COMPONENT ============

export const navItems = [
  { name: "Home", link: "/#home" },
  { name: "Problem Statements", link: "/problem-statements" },
  { name: "Blueprints 2025", link: "/#blueprints-2025" },
  { name: "Sponsors", link: "/#sponsors" },
  { name: "FAQ", link: "/#faq" },
  { name: "Contact", link: "/#contact" },
];

export default function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(["home", "blueprints-2025", "sponsors", "faq", "contact"]);

  const activeTab = navItems.find(item => item.link.includes(`#${activeSection}`))?.link || (activeSection === "home" ? "/#home" : "");

  return (
    <Navbar className="fixed top-0 z-50">
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} activeTab={activeTab} />
        <SocialIcons className="hidden lg:flex items-center gap-3">
          <a
            href="https://www.linkedin.com/company/svce-developer-student-community/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin size={20} className="text-white" />
          </a>
          <a
            href="https://www.instagram.com/dsc.svce?igsh=NHlqbGE5ZHNnamRh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
            aria-label="Instagram"
          >
            <IconBrandInstagram size={20} className="text-white" />
          </a>
        </SocialIcons>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              className="text-white/80 hover:text-white/90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10 w-full">
            <a
              href="https://www.linkedin.com/company/svce-developer-student-community/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={20} className="text-white" />
            </a>
            <a
              href="https://www.instagram.com/dsc.svce?igsh=NHlqbGE5ZHNnamRh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
              aria-label="Instagram"
            >
              <IconBrandInstagram size={20} className="text-white" />
            </a>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}