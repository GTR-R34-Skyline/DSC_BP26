"use client";

import { useState } from "react";
import DarkVeil from "@/components/DarkVeil";
import ClickSpark from "@/components/ClickSpark";

import Chatbot from "@/components/Chatbot";
import { IconArrowUpRight, IconBrandLinkedin, IconBrandInstagram, IconDownload, IconEye } from "@tabler/icons-react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/Navbar";

import Blueprints2025Carousel from "@/components/Blueprints2025Carousel";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Problem Statements", link: "/problem-statements" },
  { name: "Contact", link: "/#contact" },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to send");
      }
      alert("Thanks! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Sorry, something went wrong. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <div className="relative w-full min-h-screen bg-black">
        {/* Background with DarkVeil */}
        <div className="fixed inset-0 w-full h-full pointer-events-none">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.02}
            scanlineIntensity={0}
            speed={1.5}
            scanlineFrequency={0}
            warpAmount={0.3}
            resolutionScale={1}
          />
        </div>
      
        {/* Navbar */}
        <Navbar className="fixed top-0 z-50">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
          </NavBody>
          <div className="hidden lg:flex items-center gap-3 absolute right-8 top-8 z-50">
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
              href="https://www.instagram.com/gdscsvce/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
              aria-label="Instagram"
            >
              <IconBrandInstagram size={20} className="text-white" />
            </a>
          </div>

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
              <div className="flex items-center gap-3 mt-4">
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
                  href="https://www.instagram.com/gdscsvce/"
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

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
          <div className="text-center z-10 px-4 max-w-6xl">
            <div className="pointer-events-none">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-6 drop-shadow-lg leading-tight tracking-tighter" style={{ fontFamily: 'var(--font-anonymous-pro)' }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
                  BLUEPRINTS 2026
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/80 drop-shadow-md leading-relaxed max-w-4xl mx-auto font-light">
                Innovate. Build. Disrupt. <br/>
                <span className="text-white/50 text-lg md:text-xl">The flagship 24-hour hackathon by DSC SVCE.</span>
              </p>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                <a 
                  href="/problem-statements"
                  className="px-8 py-4 text-lg font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
                >
                  <IconEye size={20} />
                  View Problem Statements
                </a>
                <a 
                  href="#"
                  className="px-8 py-4 text-lg font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
                >
                  <IconDownload size={20} />
                  Download Template
                </a>
                <a 
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-lg font-bold text-black bg-white hover:bg-gray-200 border border-transparent rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Register Now
                  <IconArrowUpRight size={20} />
                </a>
            </div>
          </div>
        </section>

        {/* Event Overview / Stats Section */}
        <section className="relative py-20 border-y border-white/10 bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-6xl font-bold text-blue-500">24h</h3>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Duration</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-6xl font-bold text-purple-500">500+</h3>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Participants</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-6xl font-bold text-pink-500">15+</h3>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Problem Statements</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-6xl font-bold text-green-500">₹50k+</h3>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Prize Pool</p>
                    </div>
                </div>
                
                <div className="mt-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Where Innovation Meets Execution</h2>
                    <p className="text-lg text-white/70 leading-relaxed">
                        Blueprints 2026 is not just a hackathon; it's a launchpad for the next generation of developers. 
                        We bring together the brightest minds to solve real-world problems across domains like 
                        <span className="text-blue-400"> Machine Learning</span>, 
                        <span className="text-purple-400"> Cyber Security</span>, and 
                        <span className="text-pink-400"> IoT</span>.
                    </p>
                </div>
            </div>
        </section>

        {/* Event Aim & Flow Section */}
        <section className="relative py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                            The Aim of <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Blueprints 2026</span>
                        </h2>
                        <div className="space-y-6 text-lg text-white/70">
                            <p>
                                Our goal is to bridge the gap between theoretical knowledge and practical application. 
                                We want to empower students to build solutions that matter.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mt-1">1</div>
                                    <span>Foster a culture of innovation and collaborative learning.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mt-1">2</div>
                                    <span>Provide mentorship from industry experts and alumni.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mt-1">3</div>
                                    <span>Create a platform for networking and career growth.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="text-center p-8">
                            <p className="text-white/30 text-xl font-mono mb-4">[EVENT FLOW VISUAL]</p>
                            <div className="space-y-2 text-white/50 text-sm">
                                <p>Registration Starts</p>
                                <p>↓</p>
                                <p>Hackathon Phases</p>
                                <p>↓</p>
                                <p>Shortlisting</p>
                                <p>↓</p>
                                <p>Grand Finale</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




        {/* Blueprints 2025 Carousel */}
        <Blueprints2025Carousel />

{/* FAQ Section */}
<section className="relative py-20 px-4 max-w-4xl mx-auto">
  <h2 className="text-4xl font-bold text-white mb-12 text-center">
    Frequently Asked Questions
  </h2>

  <div className="space-y-4">
    {[
      {
        q: "Who can participate in Blueprints 2026?",
        a: "All college students from 1st to 4th year are eligible to participate. Students from other colleges are also welcome."
      },
      {
        q: "What is the team size?",
        a: "Each team must consist of 4 to 6 participants. Solo or smaller teams are not allowed."
      },
      {
        q: "How do we register?",
        a: "Registration is done only through the official Google Form available on the Blueprints 2026 website."
      },
      {
        q: "Is there a registration fee?",
        a: "There is no registration fee for Round 1. A registration fee is applicable only for teams selected for Round 2."
      },
      {
        q: "How does the selection process work?",
        a: "All registered teams participate in Round 1. The top 50 teams will be shortlisted for Round 2, followed by the Grand Finale."
      },
      {
        q: "What domains do the problem statements cover?",
        a: "Problem statements span multiple domains including Machine Learning, Cyber Security, IoT, and related technology areas."
      },
      {
        q: "Can participants from different colleges form a team?",
        a: "Yes, cross-college teams are allowed as long as the team size requirement is met."
      }
    ].map((faq, idx) => (
      <details
        key={idx}
        className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 open:bg-white/10"
      >
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <h3 className="text-lg font-medium text-white">{faq.q}</h3>
          <span className="text-white/50 transition-transform group-open:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </summary>
        <div className="px-6 pb-6 text-white/70 leading-relaxed">
          {faq.a}
        </div>
      </details>
    ))}
  </div>
</section>

        {/* Contact Section */}
        <section id="contact" className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-black to-blue-950/20">
          <div className="w-full max-w-4xl mx-auto text-center z-10">
            <p className="text-sm md:text-base text-white/50 font-mono tracking-wider uppercase mb-4">
                [CONTACT US]
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Get in Touch
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                Have questions? Reach out to us directly. We're here to help!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                    <a href="mailto:dsc@svce.ac.in" className="text-white/70 hover:text-blue-400 transition-colors text-lg">
                        gdsc@svce.ac.in
                    </a>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                    <a href="tel:+919876543210" className="text-white/70 hover:text-purple-400 transition-colors text-lg">
                        +91 80159 20905
                    </a>
                </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-12">
                  <a
                    href="https://www.linkedin.com/company/svce-developer-student-community/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-600 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <IconBrandLinkedin size={24} className="text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/gdscsvce/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <IconBrandInstagram size={24} className="text-white" />
                  </a>
            </div>
          </div>
        </section>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </ClickSpark>
  );
}
