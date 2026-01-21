"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, NavBody, NavbarLogo, NavItems, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/Navbar";
import AppNavbar from "@/components/Navbar";
import DarkVeil from "@/components/DarkVeil";
import { IconX, IconArrowUpRight, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";

// Mock Data for Problem Statements
const problemStatements = [
  {
    id: 1,
    title: "AI-Powered Diabetic Retinopathy Screening for Eye Camps",
    domain: "Healthcare / Computer Vision",
    company: "Eye Screening",
    logo: "https://ui-avatars.com/api/?name=Eye+Screening&background=random",
    shortDescription: "AI-powered triage assistant to filter retinal images and optimize ophthalmologist time in rural camps.",
    overview: "In India, diabetic retinopathy (DR) is a leading cause of avoidable blindness. Rural eye screening camps serve hundreds of patients daily with limited specialist availability, creating a critical bottleneck in specialist time.",
    problemStatement: [
      "Design an AI-powered triage assistant that analyzes retinal (fundus) images.",
      "Estimate Diabetic Retinopathy severity to identify patients needing urgent intervention.",
      "Function as a high-volume filter: 'Refer' vs 'Monitor'.",
      "Ensure no severe cases are missed while maintaining speed."
    ],
    keyChallenges: [
      "The Trust Gap: Systems must explain decisions via heatmaps or lesion detection.",
      "Field Conditions: Must be robust against uneven lighting, blur, and noise typical of mobile camps.",
      "Throughput: Render decisions quickly to prevent patient queue pile-up."
    ],
    baselineRequirements: [
      "Core Classification: Analyze images into standard clinical stages (0-4: No DR to Proliferative).",
      "Actionable Triage: Map severity to a binary 'Refer' or 'Monitor' recommendation.",
      "Explainability: Provide visual or textual rationale for predictions.",
      "Safety Protocol: Interface must state 'Screening Support – Non-Diagnostic'."
    ]
  },
  {
    id: 2,
    title: "Neuro-Adaptive Workflow: The In-IDE Skill Synthesizer",
    domain: "EdTech / Software Engineering",
    company: "IDE Skills",
    logo: "https://ui-avatars.com/api/?name=IDE+Skills&background=random",
    shortDescription: "A 'Just-in-Time' learning engine that detects developer friction and provides contextual micro-learning.",
    overview: "Corporate training is often disconnected from daily work. Modern developers suffer from context switching when leaving their IDE to search for answers, breaking their cognitive 'Flow State'.",
    problemStatement: [
      "Develop an intelligent IDE plugin (VS Code/JetBrains) to detect 'Cognitive Friction'.",
      "Dynamically generate micro-learning modules when a user is struggling.",
      "Unblock the developer without them leaving the editor.",
      "Differentiate between thinking time and struggling time."
    ],
    keyChallenges: [
      "Struggle Detection: Using behavioral metrics (deletion rate, idle time) to identify gaps.",
      "Contextual Relevance: Understanding code intent (e.g., implementing a React Hook) to provide useful help.",
      "Privacy & Performance: Processing context locally without lagging the IDE."
    ],
    baselineRequirements: [
      "IDE Extension: Functional plugin reading active editor state and AST.",
      "Friction Metrics: Scoring system for struggle (Error frequency, Deletion rate).",
      "Dynamic Content: Concise code snippets/explanations (under 200 words) upon detecting friction.",
      "Dashboard: Summary view of 'Struggle Areas' for self-review."
    ]
  },
  {
    id: 3,
    title: "AI Agent for Intake and Sales Enablement",
    domain: "Sales Operations / NLP",
    company: "Sales Agent",
    logo: "https://ui-avatars.com/api/?name=Sales+Agent&background=random",
    shortDescription: "End-to-End Sales Agent that autonomously qualifies leads and orchestrates meeting scheduling.",
    overview: "Sales teams lose opportunities because inbound leads are not guided quickly. This challenge focuses on Agentic Behavior: autonomous decision-making and safe action execution.",
    problemStatement: [
      "Design an Agentic Sales Orchestrator as the first point of contact for leads.",
      "Autonomously capture lead details and evaluate against qualification criteria.",
      "Orchestrate next steps: booking meetings for qualified leads or educating others.",
      "Use a controlled Knowledge Base to prevent hallucinations."
    ],
    keyChallenges: [
      "Agentic Decision Making: Deciding autonomously when enough info is gathered to qualify.",
      "Tool Orchestration: Reliably triggering external actions (Calendly, Email) contextually.",
      "Context Retention: Remembering user details (Role, Company) across multiple turns."
    ],
    baselineRequirements: [
      "Natural Intake: Conversational extraction of Name, Company, Role, and Use Case.",
      "Criteria-Driven Routing: Generate Calendly links for qualified leads; provide resources for others.",
      "Knowledge Retrieval: Recommend 2–5 specific product links/videos from a CSV/PDF KB.",
      "Lead Log: Maintain a structured interaction state (New -> In Progress -> Qualified)."
    ]
  },
  {
    id: 4,
    title: "Digital Pulse: The Contextual Cultural Intelligence Engine",
    domain: "Data Analytics / Social Intelligence",
    company: "Digital Pulse",
    logo: "https://ui-avatars.com/api/?name=Digital+Pulse&background=random",
    shortDescription: "A contextual analytics platform to identify and visualize viral narratives within social datasets.",
    overview: "For researchers, viral metrics often mask subtle, significant cultural shifts. This tool reconstructs narratives to see what is driving engagement beyond just numbers.",
    problemStatement: [
      "Design a platform to ingest social data and reconstruct the 'Viral Narrative'.",
      "Identify, rank, and visualize dominant trends based on engagement metrics.",
      "Process raw data to group fragmented text into coherent topics.",
      "Enable deep-dives into specific data points contributing to a trend."
    ],
    keyChallenges: [
      "Contextual Ingestion: Normalizing diverse datasets (CSVs, JSON dumps) for analysis.",
      "Metric Reconstruction: Calculating 'Virality' and 'Impact' accurately within a bounded set.",
      "Cluster Identification: Semantic grouping of unstructured text into topics."
    ],
    baselineRequirements: [
      "Data Pipeline: System to parse and index user-uploaded social datasets.",
      "Viral Ranking Engine: Scoring logic based on Volume, Likes, Shares, and Comments.",
      "Hype Dashboard: Visualization of top-performing trends and entities.",
      "Drill-Down: Ability to inspect specific posts contributing to a sentiment spike."
    ]
  },
  {
    id: 5,
    title: "Gridlock-Breaker: AI-Coordinated Adaptive Traffic Orchestration",
    domain: "Smart Cities / IoT",
    company: "Traffic AI",
    logo: "https://ui-avatars.com/api/?name=Traffic+AI&background=random",
    shortDescription: "A city-wide orchestration engine that transforms static traffic signals into a synchronized intelligent network.",
    overview: "Urban traffic in India is characterized by 'chaotic heterogeneity'. Current systems are reactive, leading to economic loss and delayed emergency services.",
    problemStatement: [
      "Design an AI Control Plane coordinating multiple intersections simultaneously.",
      "Ingest real-time density data to dynamically adjust signal phases.",
      "Maximize vehicle throughput and minimize waiting time across a grid.",
      "Implement emergency priority corridors."
    ],
    keyChallenges: [
      "Green Wave Logic: Coordinating adjacent signals for fluid platoon movement.",
      "Heterogeneous Flow: Handling mixed traffic (Buses, Bikes, Cars) with different behaviors.",
      "Emergency Priority: Clearing paths for ambulances without gridlocking the rest of the city."
    ],
    baselineRequirements: [
      "Simulation Environment: Demonstration on a valid simulator (SUMO, CityFlow).",
      "Adaptive Logic: RL or Heuristic algorithm adjusting timing based on queue length.",
      "Emergency Override: Feature for zero-wait passage for an 'Ambulance Agent'.",
      "Fail-Safe: Fallback to 'Safety Mode' if sensors go offline."
    ]
  },
  {
    id: 6,
    title: "Credit-Vision: Inclusive Scoring & Trust Protocols",
    domain: "FinTech / Machine Learning",
    company: "Credit Vision",
    logo: "https://ui-avatars.com/api/?name=Credit+Vision&background=random",
    shortDescription: "Alternative credit scoring engine using non-traditional data to assess risk for the 'Credit Invisible'.",
    overview: "Many individuals in emerging economies are rejected by lenders due to lack of formal credit history, despite being financially responsible in daily life.",
    problemStatement: [
      "Design a real-time scoring engine that fuses non-traditional signals with traditional data.",
      "Utilize Explainable AI (XAI) to justify scores to loan officers and users.",
      "Assess risk for 'Cold Start' users with zero previous loan history.",
      "Ensure the model is transparent and meets regulatory standards."
    ],
    keyChallenges: [
      "Data Fusion: Merging structured bureau data with unstructured alternative signals.",
      "Explainability: Outputting causal factors behind a score rather than just a probability.",
      "Cold Start: Accurate risk assessment without historical loan data."
    ],
    baselineRequirements: [
      "Multi-Source Ingestion: Pipeline for cash flow patterns, utility payments, and digital metadata.",
      "Hybrid Scoring Logic: ML model that weights alternative data based on availability.",
      "Explainability Layer: Breakdown of contributing factors for a loan officer.",
      "Performance: Near real-time evaluation for instant-finance use cases."
    ]
  },
  {
    id: 8,
    title: "Lifecycle-Ledger: IoT Digital Product Passports",
    domain: "IoT / Sustainability",
    company: "Lifecycle Ledger",
    logo: "https://ui-avatars.com/api/?name=Lifecycle+Ledger&background=random",
    shortDescription: "A 'Living Identity' for electronics that records health metrics, repairs, and ownership transfer on a tamper-resistant ledger.",
    overview: "Electronic waste is accelerated by opacity; devices are discarded because their internal health and repair history are unknown. To enable a Circular Economy and the 'Right to Repair,' devices require a trusted, transparent history.",
    problemStatement: [
      "Create an IoT-enabled Digital Passport System where each device is a dynamic asset.",
      "Update automatically based on the device's lifecycle (health, repairs).",
      "Allow authorized service centers to log repairs securely.",
      "Enable recyclers to query 'Health Status' to calculate resale value."
    ],
    keyChallenges: [
      "Dynamic Metadata: Synchronizing blockchain records with real-world IoT telemetry without congestion.",
      "Access Control: ensuring only 'Authorized Repair Shops' can execute a 'Certified Repair'.",
      "Offline Inspection: Verification of the passport via passive NFC even if hardware is offline."
    ],
    baselineRequirements: [
      "Dynamic Asset Standard: Metadata state changes reflect physical wear (Health: 100% -> 80%).",
      "Repair Signing: Cryptographic workflow for technician signatures.",
      "Telemetry Bridge: IoT agent simulation anchoring 'Health Checkpoints' to the ledger.",
      "Valuation Logic: Computational module estimating 'Resale Value' based on verified history."
    ]
  },
  {
    id: 9,
    title: "Cyber-Resilient IoT Ecosystems",
    domain: "IoT / Cybersecurity",
    company: "Siemens",
    logo: "https://ui-avatars.com/api/?name=Siemens&background=random",
    shortDescription: "Developing adaptive AI-driven security for IoT to autonomously detect and mitigate threats.",
    overview: "The widespread adoption of IoT has introduced security risks. Cyber-resilient security frameworks must defend against threats using lightweight encryption and self-healing networks.",
    problemStatement: [
      "Develop an adaptive AI-driven security system that autonomously detects threats.",
      "Address unauthorized access, data breaches, and botnet attacks.",
      "Overcome limited computational resources with lightweight protection.",
      "Implement self-healing networks to detect and neutralize intrusions in real-time."
    ],
    keyChallenges: [
      "Resource Constraints: implementing strong security on low-power devices.",
      "Scalability: Protecting billions of diverse devices.",
      "Real-time Mitigation: Detecting and stopping attacks instantly without human intervention."
    ],
    baselineRequirements: [
      "AI-Driven Threat Detection: Real-time anomaly detection with minimal latency.",
      "Lightweight Encryption: Elliptic Curve Cryptography (ECC) for constrained devices.",
      "Zero-Trust Architecture: Continuous authentication and least-privilege access.",
      "Decentralized Identity: Blockchain-based authentication.",
      "Self-Healing: Autonomous detection and neutralization of intrusions."
    ]
  },
  {
    id: 10,
    title: "Automating Labeling for Object Detection",
    domain: "Manufacturing / AI",
    company: "Smart Factory",
    logo: "https://ui-avatars.com/api/?name=Smart+Factory&background=random",
    shortDescription: "Enhancing manufacturing with AI-driven automated labeling for car part quality control.",
    overview: "Manual labeling of assembly line parts is time-consuming and error-prone. Automating this process improves accuracy, speed, and consistency in quality control.",
    problemStatement: [
      "Automatically detect and annotate parts within images from the assembly line.",
      "Label parts with relevant classes (e.g., 'part A', 'defect type X').",
      "Identify and label defects or deviations in assembled products.",
      "Integrate seamlessly with the existing quality control system."
    ],
    keyChallenges: [
      "Variability: Handling different part variations, orientations, and lighting conditions.",
      "Accuracy: Minimizing false positives and negatives in a high-speed environment.",
      "Real-Time Processing: Keeping up with assembly line speeds."
    ],
    baselineRequirements: [
      "Object Detection: High-accuracy identification of assembly components.",
      "Automated Labeling: Drawing bounding boxes and assigning correct class labels.",
      "Real-Time Integration: Processing images immediately for quality control feedback.",
      "Data Scalability: Handling large volumes of data and adapting to new part types."
    ]
  }
];

const domains = [
  "All",
  "Healthcare / Computer Vision",
  "EdTech / Software Engineering",
  "Sales Operations / NLP",
  "Data Analytics / Social Intelligence",
  "Smart Cities / IoT",
  "FinTech / Machine Learning",
  "Blockchain / Supply Chain",
  "IoT / Sustainability",
  "IoT / Cybersecurity",
  "Manufacturing / AI"
];

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

      <AppNavbar />

      <main className="relative z-10 px-4 md:px-8 pb-20 max-w-7xl mx-auto">
        <div className="h-28 md:h-36 w-full" aria-hidden="true" />
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Problem Statements
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Explore the challenges for Blueprints 2026. Choose your domain and build the future.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
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
