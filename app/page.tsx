"use client";

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
import AppNavbar from "@/components/Navbar";
import Blueprints2025Carousel from "@/components/Blueprints2025Carousel";

export default function Home() {
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
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" />

          <div className="relative text-center z-10 px-4 w-full max-w-6xl mx-auto flex flex-col items-center">

            {/* Title */}
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 drop-shadow-2xl tracking-tighter max-w-full break-words leading-tight"
              style={{ fontFamily: 'var(--font-pixel), sans-serif', letterSpacing: '2px' }}
            >
              <span className="text-white inline-block pb-2">
                <TypewriterText text="BLUEPRINTS 2026" />
              </span>
            </h1>

            {/* Subtitle */}
            <FadeIn delay={0.8} direction="up" className="pointer-events-none px-2 mb-6 md:mb-0">
              <p className="text-lg md:text-2xl lg:text-3xl text-white/80 drop-shadow-md leading-relaxed max-w-3xl mx-auto font-light">
                Innovate. Build. Disrupt. <br />
                <span className="text-white/50 text-sm md:text-xl mt-2 block sm:inline">National-Level Intercollegiate Product Hackathon</span>
              </p>
            </FadeIn>

   {/* Buttons */}
<FadeIn delay={1.0} className="mt-4 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4 pointer-events-auto">

  <a
    href="/problem-statements"
    className="w-full md:w-auto justify-center order-1 px-8 py-3 md:py-4 text-base md:text-lg font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
  >
    <IconEye size={20} />
    View Problem Statements
  </a>

  <PulseGlow delay={1.5} className="w-full md:w-auto order-2">
    <a
      href="/Shortlisted Teams Blueprints 2026.pdf"
      download="Shortlisted Teams Blueprints 2026.pdf"
      className="w-full md:w-auto justify-center px-8 py-4 text-lg font-bold text-black bg-white hover:bg-gray-200 border border-transparent rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
    >
      <IconDownload size={20} />
      Round 1 Results.
    </a>
  </PulseGlow>

</FadeIn>

<FadeIn delay={1.2}>
  <CountdownTimer />
</FadeIn>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 border-y border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">

              <FadeIn delay={0.1} className="space-y-2" viewport={{ once: false }}>
                <div className="text-4xl md:text-6xl font-bold text-blue-500 flex justify-center">
                  <AnimatedCounter to={24} suffix="h" />
                </div>
                <p className="text-white/60 uppercase tracking-widest text-sm">Hackathon Duration</p>
              </FadeIn>

              <FadeIn delay={0.3} className="space-y-2" viewport={{ once: false }}>
                <div className="text-4xl md:text-6xl font-bold text-purple-500 flex justify-center">
                  <AnimatedCounter to={500} suffix="+" />
                </div>
                <p className="text-white/60 uppercase tracking-widest text-sm">Builders Participating</p>
              </FadeIn>

              <FadeIn delay={0.5} className="space-y-2" viewport={{ once: false }}>
                <div className="text-4xl md:text-6xl font-bold text-green-500 flex justify-center">
                  <AnimatedCounter prefix="₹" to={50} suffix="k+" />
                </div>
                <p className="text-white/60 uppercase tracking-widest text-sm">Total Prize Pool</p>
              </FadeIn>

              <FadeIn delay={0.7} className="space-y-2" viewport={{ once: false }}>
                <div className="text-4xl md:text-6xl font-bold text-orange-500 flex justify-center">
                  n8n Pro
                </div>
                <p className="text-white/60 uppercase tracking-widest text-sm">Exclusive Finalist Benefit</p>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="relative py-20 px-4">
          <FadeIn delay={0.2} className="mt-16 text-center max-w-4xl mx-auto">
            <SectionTitle title="Where Innovation Meets Execution" />
            <p className="text-lg text-white/70 leading-relaxed -mt-4">
              Blueprints 2026 goes beyond a typical hackathon — it serves as a launchpad for the next generation of innovators. It brings together driven minds to tackle real-world challenges across domains such as
              <span className="text-blue-400"> Machine Learning</span>,
              <span className="text-blue-400"> Blockchain</span>,
              <span className="text-purple-400"> Agentic AI</span>, and
              <span className="text-pink-400"> IoT</span>.
            </p>
          </FadeIn>
        </section>

        {/* Aim Section */}
        <section className="relative py-32 px-4 bg-gradient-to-b from-black/20 to-purple-900/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <FadeIn>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              <a href="https://www.linkedin.com/in/gurusiva/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/guruprakash.jpg" alt="Guruprakash Sivabalan" className="w-24 h-24 rounded-full object-cover object-top border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg flex items-center justify-center gap-1">Guruprakash Sivabalan <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-sm">CEO & Founder</p>
                  <p className="text-white/50 text-xs">Xobin</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/rajaraman-swaminathan/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/rajaraman.jpeg" alt="Rajaraman Swaminathan" className="w-24 h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg flex items-center justify-center gap-1">Rajaraman Swaminathan <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-sm">Product Manager</p>
                  <p className="text-white/50 text-xs">Revinova</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/ganesh-g/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/ganeshg.jpeg" alt="Ganesh G" className="w-24 h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg flex items-center justify-center gap-1">Ganesh G <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-sm">Senior Software Developer</p>
                  <p className="text-white/50 text-xs">Freshworks</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/adi4502/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/adhina.jpeg" alt="Adityavignesh V" className="w-24 h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg flex items-center justify-center gap-1">Adityavignesh V <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-sm">Software Engineer</p>
                  <p className="text-white/50 text-xs">Newgen</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/hakash-mp/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/Hakash.jpeg" alt="Hakash MP" className="w-24 h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg flex items-center justify-center gap-1">Hakash MP <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-sm">GenAI Solution Engineer</p>
                  <p className="text-white/50 text-xs text-balance">1CloudHub</p>
                </div>
              </a>
            </div>

            <SectionTitle title="Industry Connect Panel" subtitle="" />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 max-w-[90rem] mx-auto px-2 md:px-6">
              {/* Mathangi A */}
              <a href="https://www.linkedin.com/in/mathangi-ananth/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/Mathangi.jpeg" alt="Mathangi A" className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-base lg:text-lg flex flex-wrap items-center justify-center gap-1">Mathangi A <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-xs lg:text-sm mt-1">Manager</p>
                  <p className="text-white/50 text-[10px] lg:text-xs">DoorDash</p>
                </div>
              </a>

              {/* Akshay Kumar */}
              <a href="https://www.linkedin.com/in/akshay-kumar-636693aa/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/Akshaykumar.jpeg" alt="Akshay Kumar" className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-base lg:text-lg flex flex-wrap items-center justify-center gap-1">Akshay Kumar <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-xs lg:text-sm mt-1">JS & Python Developer</p>
                  <p className="text-white/50 text-[10px] lg:text-xs">TigerAnalytics</p>
                </div>
              </a>

              {/* Janani V */}
              <a href="http://linkedin.com/in/janani-venk/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/Janani.jpg" alt="Janani V" className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-base lg:text-lg flex flex-wrap items-center justify-center gap-1">Janani V <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-xs lg:text-sm mt-1">MEng AI</p>
                  <p className="text-white/50 text-[10px] lg:text-xs">UCLA</p>
                </div>
              </a>

              {/* Murari R */}
              <a href="https://www.linkedin.com/in/murarir/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/Murari.jpeg" alt="Murari R" className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-base lg:text-lg flex flex-wrap items-center justify-center gap-1">Murari R <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-xs lg:text-sm mt-1">Director, Carrier Operations</p>
                  <p className="text-white/50 text-[10px] lg:text-xs">Viu</p>
                </div>
              </a>

              {/* Krishnan Rajagopal */}
              <a href="https://www.linkedin.com/in/krishnanrajagopal/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 flex flex-col items-center space-y-4 hover:border-white/20 hover:scale-[1.02] transition-all duration-200 group">
                <img src="/Krishnan.jpeg" alt="Krishnan Rajagopal" className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-base lg:text-lg flex flex-wrap items-center justify-center gap-1">Krishnan Rajagopal <IconBrandLinkedin size={16} className="text-blue-400 opacity-50 group-hover:opacity-100" /></h3>
                  <p className="text-white/60 text-xs lg:text-sm mt-1">Chief Executive Officer</p>
                  <p className="text-white/50 text-[10px] lg:text-xs">NavaSys Technologies</p>
                </div>
              </a>

              {/* Sudarshan */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 flex flex-col items-center space-y-4 hover:border-white/20 transition-all duration-200 group">
                <img src="/sudarshan.jpeg" alt="Sudarshan" className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border border-white/20" />
                <div className="text-center">
                  <h3 className="text-white font-semibold text-base lg:text-lg flex flex-wrap items-center justify-center gap-1">Sudarshan</h3>
                  <p className="text-white/60 text-xs lg:text-sm mt-1">Senior Software Engineer</p>
                  <p className="text-white/50 text-[10px] lg:text-xs">NG</p>
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

        {/* Sponsors Section */}
        <ScrollAnchor id="sponsors" />
        <section className="relative py-20 px-4 max-w-6xl mx-auto text-center">
          <FadeIn>
            <SectionTitle title="Sponsors & Partners" subtitle="Our Supporters" />
          </FadeIn>

          {/* Prominent Sponsors */}
          <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center mb-16">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-blue-400 tracking-widest uppercase text-lg font-bold">Title Sponsor</p>
              <a href="https://xobin.com/" target="_blank" rel="noopener noreferrer" className="group transition-transform hover:scale-105 w-full block">
                <div className="bg-white rounded-[2rem] py-8 px-8 shadow-[0_0_30px_rgba(59,130,246,0.2)] flex items-center justify-center h-64 md:h-72 overflow-hidden">
                  <img src="/logos/xobin.png" alt="XOBIN" className="max-h-full w-auto object-contain scale-[1.8] md:scale-[2]" />
                </div>
              </a>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-purple-400 tracking-widest uppercase text-lg font-bold">Automation & Workflow Partner</p>
              <a
                href="https://n8n.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-105 w-full"
              >
                <div className="bg-white rounded-[2rem] py-8 px-8 shadow-[0_0_30px_rgba(168,85,247,0.2)] flex items-center justify-center h-64 md:h-72">
                  <img src="/sponsor-n8n.png" alt="Automation & Workflow Partner" loading="lazy" className="max-h-full w-auto object-contain" />
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Other Partners */}
          <FadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 items-stretch justify-center">
            
            <div className="flex flex-col items-center space-y-3">
              <p className="text-white/60 tracking-widest uppercase text-xs font-bold h-8 flex items-center">Venue Partner</p>
              <a
                href="https://www.google.com/maps/place/Tekclan+Software+Solutions+Pvt+Ltd/data=!4m2!3m1!1s0x0:0x1ab7093ab7f997f7?sa=X&ved=1t:2428&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-105 w-full flex-grow flex"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center w-full h-32">
                  <img src="/sponsor-yuniq-v3.png" alt="Venue Partner" loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
              </a>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <p className="text-white/60 tracking-widest uppercase text-xs font-bold h-8 flex items-center">Silver Sponsor</p>
              <a href="https://cityunionbank.bank.in/cub-net-banking-cub-online-banking" target="_blank" rel="noopener noreferrer" className="group transition-transform hover:scale-105 w-full flex-grow flex">
                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center w-full h-32 overflow-hidden">
                  <img src="/logos/CUB.jpg" alt="Cub" loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
              </a>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <p className="text-white/60 tracking-widest uppercase text-xs font-bold h-8 flex items-center text-center">Feedback Partner</p>
              <a
                href="https://askingindia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-105 w-full flex-grow flex"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center w-full h-32">
                  <img src="/sponsor-askingindia.jpeg" alt="Feedback Partner" loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
              </a>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <p className="text-white/60 tracking-widest uppercase text-xs font-bold h-8 flex items-center">Skill Partner</p>
              <a href="https://www.rgesindia.com/" target="_blank" rel="noopener noreferrer" className="group transition-transform hover:scale-105 w-full flex-grow flex">
                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center w-full h-32 overflow-hidden">
                  <img src="/logos/RGES.png" alt="Rges" loading="lazy" className="max-h-full max-w-full object-contain scale-[2.5]" />
                </div>
              </a>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <p className="text-white/60 tracking-widest uppercase text-xs font-bold h-8 flex items-center text-center">AI Innovation & Talent Partner</p>
              <a href="https://calphark.com/" target="_blank" rel="noopener noreferrer" className="group transition-transform hover:scale-105 w-full flex-grow flex">
                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center w-full h-32 overflow-hidden">
                  <img src="/logos/Calphark.png" alt="Calphark" loading="lazy" className="max-h-full max-w-full object-contain scale-[2.5]" />
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
                  href="mailto:gdscsvce@svce.ac.in"
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
                  q: "What is the team size?",
                  a: "Each team must consist of 4 to 6 participants. Solo or smaller teams are not allowed."
                },
                {
                  q: "How do we register?",
                  a: "Registration is done only through the official Google Form available on the Blueprints 2026 website."
                },
                {
                  q: "Is there a registration fee?",
                  a: "A registration fee of ₹450 will be collected only from the teams shortlisted for the Grand Finale."
                },
                {
                  q: "How does the selection process work?",
                  a: "All registered teams participate in Round 1. The top 50 teams will be shortlisted for Round 2, followed by the Grand Finale."
                },
                {
                  q: "What domains do the problem statements cover?",
                  a: "Problem statements span multiple domains including Machine Learning, Agentic AI, Blockchain, IoT, and related technology areas."
                }
              ]}
            />
          </FadeIn>
        </section>

        {/* Contact Section */}
        <ScrollAnchor id="contact" />
        <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-black to-blue-950/20">
          <div className="w-full max-w-4xl mx-auto text-center z-10">
            <SectionTitle title="Get in Touch" />

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Have questions? Reach out to us directly. We're here to help!
            </p>

            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <a
                  href="mailto:gdscsvce@svce.ac.in"
                  className="block text-white/70 hover:text-blue-400 transition-colors text-lg"
                >
                  gdscsvce@svce.ac.in
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

            <div className="mt-8">
              <a
                href="/login"
                className="text-white/30 hover:text-white/50 text-sm transition-colors"
              >
                Admin Login
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
