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
  MobileNavMenu,
  MobileNavToggle,
  SocialIcons,
} from "@/components/Navbar";

import AppNavbar from "@/components/AppNavbar";
import Blueprints2025Carousel from "@/components/Blueprints2025Carousel";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Problem Statements", link: "/problem-statements" },
  { name: "Sponsors", link: "/#sponsors" },
  { name: "Blueprints 2025", link: "/#blueprints-2025" },
  { name: "FAQ", link: "/#faq" },
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
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
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

      <AppNavbar />

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
                  href="/Copy of PPT Template_1.pptx"
                  download="Blueprints_2026_Template.pptx"
                  className="px-8 py-4 text-lg font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
                >
                  <IconDownload size={20} />
                  Download Template
                </a>
                <a 
                  href="https://docs.google.com/forms/d/16FXTZ4LEUdLaLxJxFgZK1NC1ebDaQJixH5N9_NbGu8A/edit"
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

        {/* Aim Section - Redesigned */}
        <section className="relative py-32 px-4 bg-gradient-to-b from-black/20 to-purple-900/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-white mb-12 tracking-tight drop-shadow-2xl font-bold">
                    <span className="block text-4xl md:text-5xl mb-2 text-white/80">The Aim of</span>
                    <span className="block text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x leading-none pb-4">
                        Blueprints 2026
                    </span>
                </h2>
                
                <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-20 leading-relaxed font-light">
                    Our goal is to <span className="text-white font-semibold border-b-2 border-blue-500/50">bridge the gap</span> between theoretical knowledge and practical application. 
                    We want to empower students to build <span className="text-purple-300 font-semibold border-b-2 border-purple-500/50">solutions that matter</span>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <span className="text-3xl font-bold">1</span>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Foster a culture of <span className="text-blue-400 font-bold block mt-2 text-2xl">Innovation</span> and collaborative learning.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <span className="text-3xl font-bold">2</span>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Provide mentorship from <span className="text-purple-400 font-bold block mt-2 text-2xl">Industry Experts</span> and alumni.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
                        <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                            <span className="text-3xl font-bold">3</span>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Create a platform for <span className="text-pink-400 font-bold block mt-2 text-2xl">Networking</span> and career growth.
                        </p>
                    </div>
                </div>
            </div>
        </section>




        {/* Blueprints 2025 Carousel */}
        <div id="blueprints-2025">
          <Blueprints2025Carousel />
        </div>

        {/* Partners Section */}
        <section id="partners" className="relative py-20 px-4 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-12">
                Our Partners
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
                {/* Venue Partner */}
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-white/60 tracking-widest uppercase text-sm font-bold">Venue Partner</p>
                    <a 
                      href="https://www.google.com/maps/place/Tekclan+Software+Solutions+Pvt+Ltd/data=!4m2!3m1!1s0x0:0x1ab7093ab7f997f7?sa=X&ved=1t:2428&ictx=111" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group transition-transform hover:scale-105"
                    >
                        <div className="bg-white rounded-3xl py-4 px-8 md:px-12 shadow-lg flex items-center justify-center">
                            <img 
                                src="/sponsor-yuniq-v3.png" 
                                alt="Venue Partner" 
                                className="h-40 md:h-52 w-auto object-contain"
                            />
                        </div>
                    </a>
                </div>

                {/* Food Partner */}
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-white/60 tracking-widest uppercase text-sm font-bold">Food Partner</p>
                    <div className="h-24 md:h-32 flex items-center justify-center">
                        <p className="text-2xl text-white/40 font-mono italic">Coming Soon</p>
                    </div>
                </div>
            </div>
        </section>

{/* FAQ Section */}
<section id="faq" className="relative py-20 px-4 max-w-4xl mx-auto">
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
                    <a href="tel:+918015920905" className="text-white/70 hover:text-purple-400 transition-colors text-lg">
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
