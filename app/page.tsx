"use client";

import { useState } from "react";
import DarkVeil from "@/components/DarkVeil";
import ClickSpark from "@/components/ClickSpark";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import Accordion from "@/components/Accordion";
import TypewriterText from "@/components/TypewriterText";
import PulseGlow from "@/components/PulseGlow";
import SectionTitle from "@/components/SectionTitle";
import CountdownTimer from "@/components/CountdownTimer";
import ScrollAnchor from "@/components/ScrollAnchor";

import Chatbot from "@/components/Chatbot";
import { IconArrowUpRight, IconBrandLinkedin, IconBrandInstagram, IconDownload, IconEye } from "@tabler/icons-react";
// Removed unused Navbar imports
import AppNavbar from "@/components/Navbar";
import Blueprints2025Carousel from "@/components/Blueprints2025Carousel";

// ... (keep navItems if used, or remove if unused, but page has its own definitions sometimes. checking...)
// The page.tsx had a local navItems definition which is now redundant if we rely on AppNavbar.
// However, I will just leave the imports and focusing on the render part.

export default function Home() {
  // Mobile menu state handled by AppNavbar internally now, or if passed, it's fine.
  // Removing unused form state logic


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
        <section id="home" className="relative min-h-[90svh] flex items-center justify-center pt-24 md:pt-20">
          {/* Background Layer (Clipped) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
             {/* Add decorative elements here if any specific to hero, otherwise this acts as the safe boundary */}
          </div>

          {/* Content Layer (visible, no clip) */}
          <div className="relative text-center z-10 px-4 w-full max-w-6xl mx-auto flex flex-col items-center">
            
            {/* Title - Typewriter Animation - FIXED FOR MOBILE */}
            <h1 
              className="text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl font-bold mb-4 md:mb-6 drop-shadow-2xl tracking-tighter max-w-full break-words leading-tight" 
              style={{ fontFamily: 'var(--font-anonymous-pro)' }}
            >
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x inline-block pb-2">
                <TypewriterText text="BLUEPRINTS 2026" />
               </span>
            </h1>

            {/* Subtitle & Description - Staggered Fade Up */}
            <FadeIn delay={0.8} direction="up" className="pointer-events-none px-2 mb-6 md:mb-0">
              <p className="text-lg md:text-2xl lg:text-3xl text-white/80 drop-shadow-md leading-relaxed max-w-3xl mx-auto font-light">
                Innovate. Build. Disrupt. <br/>
                <span className="text-white/50 text-sm md:text-xl mt-2 block sm:inline">National-Level Intercollegiate Innovation & Product Development Bootcamp</span>
              </p>
            </FadeIn>
            
            {/* Buttons - Staggered Fade Up */}
            <FadeIn delay={1.0} className="mt-4 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4 pointer-events-auto">
                {/* Primary CTA: Register Now (Mobile First) */}
                <PulseGlow delay={1.5} className="w-full md:w-auto order-1 md:order-3">
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdxjNTYRklXSOkXOXKWBi63Qb-aSaOLi_DcDuUK0vQcxQjZcw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto justify-center px-8 py-4 text-lg font-bold text-black bg-white hover:bg-gray-200 border border-transparent rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    Register Now
                    <IconArrowUpRight size={20} />
                  </a>
                </PulseGlow>

                {/* Secondary CTAs */}
                <a 
                  href="/problem-statements"
                  className="w-full md:w-auto justify-center order-2 md:order-1 px-8 py-3 md:py-4 text-base md:text-lg font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
                >
                  <IconEye size={20} />
                  View Problem Statements
                </a>
                <a 
                  href="/Copy of PPT Template_1.pptx"
                  download="Blueprints_2026_Template.pptx"
                  className="w-full md:w-auto justify-center order-3 md:order-2 px-8 py-3 md:py-4 text-base md:text-lg font-bold text-white/70 hover:text-white bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                >
                  <IconDownload size={20} />
                  Download Template
                </a>
            </FadeIn>
            
            <FadeIn delay={1.2}>
              <CountdownTimer />
            </FadeIn>
          </div>
        </section>

        {/* Event Overview / Stats Section */}
        <section className="relative py-20 border-y border-white/10 bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4">
                {/* Stats - Sequentially Animated */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <FadeIn delay={0.1} className="space-y-2" viewport={{ once: false }}>
                        <div className="text-4xl md:text-6xl font-bold text-blue-500 flex justify-center">
                           <AnimatedCounter to={24} suffix="h" />
                        </div>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Duration</p>
                    </FadeIn>
                    <FadeIn delay={0.3} className="space-y-2" viewport={{ once: false }}>
                        <div className="text-4xl md:text-6xl font-bold text-purple-500 flex justify-center">
                           <AnimatedCounter to={500} suffix="+" />
                        </div>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Participants</p>
                    </FadeIn>
                    <FadeIn delay={0.7} className="space-y-2" viewport={{ once: false }}>
                         <div className="text-4xl md:text-6xl font-bold text-green-500 flex justify-center">
                           <AnimatedCounter prefix="₹" to={50} suffix="k+" />
                        </div>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Prize Pool</p>
                    </FadeIn>
                </div>
                
                <FadeIn delay={0.2} className="mt-16 text-center max-w-4xl mx-auto">
                    <SectionTitle title="Where Innovation Meets Execution" />
                    <p className="text-lg text-white/70 leading-relaxed -mt-4">
                        Blueprints 2026 is not just a hackathon; it's a launchpad for the next generation of developers. 
                        We bring together the brightest minds to solve real-world problems across domains like 
                        <span className="text-blue-400"> Machine Learning</span>, 
                        <span className="text-purple-400"> Cyber Security</span>, and 
                        <span className="text-pink-400"> IoT</span>.
                    </p>
                </FadeIn>
            </div>
        </section>

        {/* Aim Section - Redesigned */}
        <section className="relative py-32 px-4 bg-gradient-to-b from-black/20 to-purple-900/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto text-center">
                <FadeIn>
                  {/* Custom Title for Aim to preserve specific styling */}
                  <h2 className="text-white mb-12 tracking-tight drop-shadow-2xl font-bold">
                      <span className="block text-3xl md:text-4xl mb-2 text-white/80">The Aim of</span>
                      <span className="block text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x leading-none pb-4">
                          Blueprints 2026
                      </span>
                  </h2>
                  
                  <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-20 leading-relaxed font-light">
                      Our goal is to <span className="text-white font-semibold border-b-2 border-blue-500/50">bridge the gap</span> between theoretical knowledge and practical application. 
                      We want to empower students to build <span className="text-purple-300 font-semibold border-b-2 border-purple-500/50">solutions that matter</span>.
                  </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <FadeIn delay={0.1} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <span className="text-3xl font-bold">1</span>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Foster a culture of <span className="text-blue-400 font-bold block mt-2 text-2xl">Innovation</span> and collaborative learning.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <span className="text-3xl font-bold">2</span>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Provide mentorship from <span className="text-purple-400 font-bold block mt-2 text-2xl">Industry Experts</span> and alumni.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
                        <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                            <span className="text-3xl font-bold">3</span>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Create a platform for <span className="text-pink-400 font-bold block mt-2 text-2xl">Networking</span> and career growth.
                        </p>
                    </FadeIn>
                </div>
            </div>
        </section>

        {/* Judging Panel Section */}
        <section className="relative py-20 px-4 text-center bg-black/40 border-t border-white/5">
            <FadeIn>
                <SectionTitle title="Judging Panel" subtitle="Evaluation" />
                
                {/* Judges Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Judge 1 */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 transition-all duration-200">
                        <img src="/rajaraman.jpeg" alt="Rajaraman Swaminathan" className="w-24 h-24 rounded-full object-cover border border-white/20" />
                        <div>
                            <h3 className="text-white font-semibold text-lg">Rajaraman Swaminathan</h3>
                            <p className="text-white/60 text-sm">Product Manager</p>
                            <p className="text-white/50 text-xs">Revinova</p>
                        </div>
                    </div>

                    {/* Judge 2 */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 transition-all duration-200">
                        <img src="/ganeshg.jpeg" alt="Ganesh G" className="w-24 h-24 rounded-full object-cover border border-white/20" />
                        <div>
                            <h3 className="text-white font-semibold text-lg">Ganesh G</h3>
                            <p className="text-white/60 text-sm">Software Developer Engineer</p>
                            <p className="text-white/50 text-xs">Freshworks</p>
                        </div>
                    </div>

                    {/* Judge 3 */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 transition-all duration-200">
                        <img src="/adhina.jpeg" alt="Adityavignesh V" className="w-24 h-24 rounded-full object-cover border border-white/20" />
                        <div>
                            <h3 className="text-white font-semibold text-lg">Adityavignesh V</h3>
                            <p className="text-white/60 text-sm">Software Engineer</p>
                            <p className="text-white/50 text-xs">Newgen</p>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>

        {/* Blueprints 2025 Carousel */}
        <ScrollAnchor id="blueprints-2025" />
        <div>
          <Blueprints2025Carousel />
        </div>

        {/* Partners Section - Renamed id to sponsors to match navbar */}
        <ScrollAnchor id="sponsors" />
        <section className="relative py-20 px-4 max-w-4xl mx-auto text-center">
            <FadeIn>
              <SectionTitle title="Sponsors & Partners" subtitle="Our Supporters" />
            </FadeIn>
            
            <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
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
                            {/* Replaced img with standard img for now, converting to next/image requires size knowledge which I don't have yet. Can be future optimization task. */}
                            <img 
                                src="/sponsor-yuniq-v3.png" 
                                alt="Venue Partner" 
                                loading="lazy"
                                className="h-40 md:h-52 w-auto object-contain"
                            />
                        </div>
                    </a>
                </div>

                {/* Food Partner */}
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-white/60 tracking-widest uppercase text-sm font-bold">Automation & Workflow Partner</p>
                    <a 
                      href="https://n8n.io/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group transition-transform hover:scale-105"
                    >
                        <div className="bg-white rounded-3xl py-4 px-8 md:px-12 shadow-lg flex items-center justify-center">
                            {/* Replaced img with standard img for now, converting to next/image requires size knowledge which I don't have yet. Can be future optimization task. */}
                            <img 
                                src="/sponsor-n8n.png" 
                                alt="Automation & Workflow Partner" 
                                loading="lazy"
                                className="h-40 md:h-52 w-auto object-contain"
                            />
                        </div>
                    </a>
                </div>
            </FadeIn>
        </section>

        {/* Sponsorship Details Section */}
        <section className="relative py-20 px-4 max-w-5xl mx-auto text-center border-t border-white/10">
            <FadeIn>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Partner With Us</h3>
                    <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                        Join us in shaping the future of technology. As a sponsor, you gain access to the brightest minds, 
                        showcase your brand to a dedicated community of developers, and contribute to an ecosystem of innovation.
                        We welcome both financial sponsorships and strategic partnerships.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <h4 className="text-blue-400 font-bold mb-2">Talent Access</h4>
                            <p className="text-sm text-white/70">Connect with top-tier student developers for hiring and internships.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <h4 className="text-purple-400 font-bold mb-2">Brand Visibility</h4>
                            <p className="text-sm text-white/70">Showcase your brand across our social media handles and event assets.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <h4 className="text-pink-400 font-bold mb-2">Mentorship</h4>
                            <p className="text-sm text-white/70">Engage directly with participants through workshops and mentoring sessions.</p>
                        </div>
                    </div>
                    <PulseGlow>
                        <a 
                            href="mailto:dsc@svce.ac.in"
                            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-black bg-white hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Become a Partner
                            <IconArrowUpRight size={20} />
                        </a>
                    </PulseGlow>
                </div>
            </FadeIn>
        </section>

{/* FAQ Section */}
<ScrollAnchor id="faq" />
<section className="relative py-20 px-4 max-w-4xl mx-auto">
  <FadeIn>
    <SectionTitle title="Frequently Asked Questions" />
  </FadeIn>

  <FadeIn delay={0.2}>
    <Accordion
      items={[
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
          a: "No registration fee is required for participation in Round 1. A registration fee shall apply exclusively to teams shortlisted for Round 2 and the Final Round."
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
          a: "No, cross-college teams are not allowed."
        }
      ]}
    />
  </FadeIn>
</section>

        {/* Contact Section */}
        <ScrollAnchor id="contact" />
        <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-black to-blue-950/20">
          <div className="w-full max-w-4xl mx-auto text-center z-10">
            <SectionTitle title="Get in Touch" subtitle="[CONTACT US]" />

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                Have questions? Reach out to us directly. We're here to help!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                    <a href="mailto:gdscsvce@svce.ac.in" className="text-white/70 hover:text-blue-400 transition-colors text-lg">
                        gdscsvce@svce.ac.in
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
            
            <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-white/60 mb-4">Visit our Community Website</p>
                <a 
                    href="https://developer-student-community.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium border-b border-blue-400/50 hover:border-blue-300 pb-1"
                >
                    developer-student-community.vercel.app
                </a>
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
