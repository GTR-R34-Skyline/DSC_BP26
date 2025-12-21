"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, NavBody, NavbarLogo, NavItems, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/Navbar";
import DarkVeil from "@/components/DarkVeil";
import { IconX, IconArrowUpRight, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";

// Mock Data for Problem Statements
const problemStatements = [
  {
    id: 1,
    title: "Revolutionizing EdTech: Agentic AI for Personalized and Ethical Learning",
    domain: "Machine Learning",
    company: "Revinova",
    logo: "https://ui-avatars.com/api/?name=Revinova&background=random", // Placeholder
    shortDescription: "Transforming education with autonomous AI agents for personalized and ethical learning experiences.",
    overview: "AI is revolutionizing education through autonomous tutoring, adaptive content curation, and predictive analytics. Traditional EdTech platforms need to evolve to remain relevant.",
    problemStatement: [
      "Integrate AI as a co-pilot for educators and learners (not a replacement).",
      "Deliver hyper-personalized learning experiences at scale.",
      "Ensure ethical AI use (bias mitigation, data privacy).",
      "Maintain engagement in hybrid human-AI environments."
    ],
    keyChallenges: [
      "Intelligent Tutoring Systems: Implement AI-powered tutoring that provides personalized feedback, answers questions, and guides learners through complex topics (Recommended).",
      "Autonomous Content Curation: Create AI agents that curate and recommend learning resources based on learner needs.",
      "Skills Gap Analysis: Implement Agentic AI to identify workforce skill gaps and recommend learning paths.",
      "Real-time Feedback & Adaptation: Traditional AI requires manual updates—Agentic AI autonomously adapts based on continuous feedback.",
      "Engagement in Hybrid Learning: Combat AI fatigue by balancing automation with peer collaboration and mentorship."
    ],
    baselineRequirements: [
      "A prototype demonstrating ONE of the following:",
      "Intelligent Tutoring Systems (Recommended)",
      "AI chatbot that answers learner queries like a tutor.",
      "AI-generated quizzes personalized to learning gaps.",
      "Human-AI Collaboration",
      "AI tool automating grading & content recommendations."
    ]
  },
  {
    id: 2,
    title: "Smart Traffic Management System",
    domain: "IoT",
    company: "CityFlow",
    logo: "https://ui-avatars.com/api/?name=CityFlow&background=random",
    shortDescription: "Optimizing urban traffic flow using IoT sensors and real-time data analysis.",
    overview: "Urban congestion is a growing problem. We need smart solutions to manage traffic flow efficiently, reduce waiting times, and lower emissions.",
    problemStatement: [
      "Develop a system to monitor traffic density in real-time.",
      "Optimize traffic signal timings based on current congestion levels.",
      "Detect and report accidents or roadblocks automatically.",
      "Provide alternative route suggestions to drivers."
    ],
    keyChallenges: [
      "Sensor Integration: Integrating various IoT sensors for accurate data collection.",
      "Real-time Processing: Processing large volumes of data with minimal latency.",
      "Scalability: Ensuring the system can handle city-wide deployment.",
      "Connectivity: Maintaining reliable communication between sensors and the central server."
    ],
    baselineRequirements: [
      "A working prototype with at least 3 simulated traffic nodes.",
      "Dashboard for traffic monitoring.",
      "Algorithm for dynamic signal adjustment."
    ]
  },
  {
    id: 3,
    title: "Blockchain-based Secure Voting",
    domain: "Cyber Security",
    company: "SecureVote",
    logo: "https://ui-avatars.com/api/?name=SecureVote&background=random",
    shortDescription: "Ensuring transparency and security in elections using blockchain technology.",
    overview: "Trust in electoral processes is paramount. Blockchain can provide an immutable ledger for recording votes, ensuring they cannot be tampered with.",
    problemStatement: [
      "Create a decentralized application (DApp) for voting.",
      "Ensure voter anonymity while maintaining verifiability.",
      "Prevent double voting and unauthorized access.",
      "Provide a transparent tallying mechanism."
    ],
    keyChallenges: [
      "Identity Verification: Securely verifying voter identity without compromising anonymity.",
      "Scalability: Handling a large number of transactions (votes) efficiently.",
      "User Experience: Making the voting process simple and accessible for all users.",
      "Security: Protecting the network from 51% attacks and other vulnerabilities."
    ],
    baselineRequirements: [
      "Smart contract for voting logic.",
      "Frontend interface for voters.",
      "Admin panel for election management.",
      "Demonstration of immutability and transparency."
    ]
  },
  {
    id: 4,
    title: "Fake News Detection",
    domain: "Machine Learning",
    company: "TruthLens",
    logo: "https://ui-avatars.com/api/?name=TruthLens&background=random",
    shortDescription: "Combating misinformation with advanced NLP models.",
    overview: "The spread of fake news on social media is a critical issue. We need automated tools to identify and flag misleading information.",
    problemStatement: [
      "Build a model to classify news articles as real or fake.",
      "Analyze the credibility of sources and authors.",
      "Detect clickbait headlines and sensationalism.",
      "Provide a confidence score for the prediction."
    ],
    keyChallenges: [
      "Data Quality: gathering a diverse and balanced dataset of real and fake news.",
      "Context Understanding: NLP models often struggle with sarcasm and nuance.",
      "Adversarial Attacks: Robustness against content designed to fool the model.",
      "Explainability: Providing reasons for why a piece of content was flagged."
    ],
    baselineRequirements: [
      "Trained NLP model with >85% accuracy.",
      "Web extension or app to analyze links/text.",
      "Visual report of the analysis."
    ]
  },
  {
    id: 5,
    title: "Predictive Maintenance for Industry 4.0",
    domain: "IoT",
    company: "InduTech",
    logo: "https://ui-avatars.com/api/?name=InduTech&background=random",
    shortDescription: "Minimizing downtime by predicting equipment failures.",
    overview: "Unplanned equipment downtime costs industries billions. Predictive maintenance uses sensor data to foresee failures before they happen.",
    problemStatement: [
      "Collect vibration, temperature, and sound data from machinery.",
      "Train ML models to detect anomalies and predict failure modes.",
      "Schedule maintenance only when necessary.",
      "Visualize machine health in real-time."
    ],
    keyChallenges: [
      "Data Noise: Filtering out noise from industrial environments.",
      "Early Detection: Identifying subtle signs of wear and tear.",
      "Integration: connecting with legacy industrial equipment.",
      "Actionable Insights: Translating data into clear maintenance recommendations."
    ],
    baselineRequirements: [
      "IoT setup for data collection (simulated or real).",
      "Dashboard showing machine health status.",
      "Alert system for predicted failures."
    ]
  },
  {
    id: 6,
    title: "Phishing Website Detector",
    domain: "Cyber Security",
    company: "WebGuard",
    logo: "https://ui-avatars.com/api/?name=WebGuard&background=random",
    shortDescription: "Protecting users from malicious websites.",
    overview: "Phishing attacks are becoming increasingly sophisticated. A real-time detector can warn users before they enter sensitive information.",
    problemStatement: [
      "Analyze URL structure and domain reputation.",
      "Inspect page content for suspicious elements (e.g., hidden forms).",
      "Check for SSL certificates and other security indicators.",
      "Maintain a blacklist of known phishing sites."
    ],
    keyChallenges: [
      "Zero-day Attacks: Detecting new phishing sites that haven't been reported yet.",
      "False Positives: Avoiding blocking legitimate websites.",
      "Performance: Analyzing sites quickly without slowing down browsing.",
      "Obfuscation: Handling techniques used by attackers to hide malicious code."
    ],
    baselineRequirements: [
      "Browser extension or proxy service.",
      "Real-time analysis of visited URLs.",
      "User warning interface."
    ]
  }
];

const domains = ["All", "Machine Learning", "Cyber Security", "IoT"];

const navItems = [
  { name: "Home", link: "/" },
  { name: "Problem Statements", link: "/problem-statements" },
  { name: "Contact", link: "/#contact" },
];

export default function ProblemStatements() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedProblem, setSelectedProblem] = useState<typeof problemStatements[0] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProblems = selectedDomain === "All" 
    ? problemStatements 
    : problemStatements.filter(p => p.domain === selectedDomain);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProblem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProblem]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-purple-500/30">
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
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="relative z-10 pt-32 px-4 md:px-8 pb-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Problem Statements
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Explore the challenges for Blueprints 2026. Choose your domain and build the future.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedDomain === domain
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProblems.map((problem) => (
              <motion.div
                key={problem.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProblem(problem)}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconArrowUpRight className="text-white/50" />
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/20 mb-4">
                    {problem.domain}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-white/60 line-clamp-3">
                    {problem.shortDescription}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                    <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                        <img src={problem.logo} alt={problem.company} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm text-white/50">{problem.company}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProblem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedProblem(null)}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                    <IconX size={24} />
                </button>

                {/* Left Panel - Sticky Info */}
                <div className="w-full md:w-1/3 bg-zinc-900/50 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                    
                    <div className="mb-8">
                        <p className="text-white/40 font-mono text-sm mb-2">Problem Statement #{selectedProblem.id}</p>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                <img src={selectedProblem.logo} alt={selectedProblem.company} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-lg font-medium text-white">{selectedProblem.company}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            {selectedProblem.title}
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                            {selectedProblem.shortDescription}
                        </p>
                    </div>
                </div>

                {/* Right Panel - Scrollable Content */}
                <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <div className="max-w-3xl mx-auto space-y-12">
                        
                        {/* Overview */}
                        <section>
                            <h3 className="text-2xl font-semibold text-white mb-4">Overview</h3>
                            <p className="text-white/70 leading-relaxed text-lg">
                                {selectedProblem.overview}
                            </p>
                        </section>

                        {/* Problem Statement */}
                        <section>
                            <h3 className="text-2xl font-semibold text-white mb-4">Problem Statement</h3>
                            <ul className="space-y-3">
                                {selectedProblem.problemStatement.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-white/70 text-lg">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Key Challenges */}
                        <section>
                            <h3 className="text-2xl font-semibold text-white mb-4">Key Challenges</h3>
                            <ul className="space-y-3">
                                {selectedProblem.keyChallenges.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-white/70 text-lg">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Baseline Requirements */}
                        <section>
                            <h3 className="text-2xl font-semibold text-white mb-4">Baseline Requirements</h3>
                            <ul className="space-y-3">
                                {selectedProblem.baselineRequirements.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-white/70 text-lg">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
