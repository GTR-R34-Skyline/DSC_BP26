"use client";
import { useState } from "react";
import { Navbar, NavBody, NavbarLogo, NavItems, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu, SocialIcons } from "@/components/Navbar";
import { IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";

export const navItems = [
  { name: "Home", link: "/" },
  { name: "Problem Statements", link: "/problem-statements" },
  { name: "Partners", link: "/#partners" },
  { name: "Blueprints 2025", link: "/#blueprints-2025" },
  { name: "FAQ", link: "/#faq" },
  { name: "Contact", link: "/#contact" },
];

export default function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="fixed top-0 z-50">
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
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
