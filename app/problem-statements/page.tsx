"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, NavBody, NavbarLogo, NavItems, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/Navbar";
import AppNavbar from "@/components/Navbar";
import DarkVeil from "@/components/DarkVeil";
import { IconX, IconArrowUpRight } from "@tabler/icons-react";

// Updated Data: Removed IDs 9 & 10, Updated ID 3 with Revinova
const problemStatements = [
  {
    id: 1,
    title: "AI-Powered Diabetic Retinopathy Screening for Eye Camps",
    domain: "Healthcare / Computer Vision",
    company: "Eye Screening",
    logo: "https://ui-avatars.com/api/?name=Eye+Screening&background=random",
    shortDescription: "AI-powered triage assistant to filter retinal images and optimize ophthalmologist time in rural camps.",
    overview: "In India, diabetic retinopathy (DR) is a leading cause of avoidable blindness. Rural eye screening camps serve hundreds of patients daily with limited specialist availability.",
    problemStatement: [
      "Design an AI-powered triage assistant that analyzes retinal (fundus) images.",
      "Estimate Diabetic Retinopathy severity to identify patients needing urgent intervention.",
      "Function as a high-volume filter: 'Refer' vs 'Monitor'.",
      "Ensure no severe cases are missed while maintaining speed."
    ],
    keyChallenges: [
      "The Trust Gap: Systems must explain decisions via heatmaps.",
      "Field Conditions: Must be robust against uneven lighting and blur.",
      "Throughput: Render decisions quickly to prevent patient queue pile-up."
    ],
    baselineRequirements: [
      "Core Classification: Analyze images into standard clinical stages (0-4).",
      "Actionable Triage: Map severity to a binary 'Refer' or 'Monitor' recommendation.",
      "Explainability: Provide visual rationale for predictions.",
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
    overview: "Corporate training is often disconnected from daily work. Developers break their cognitive 'Flow State' when searching for answers outside the IDE.",
    problemStatement: [
      "Develop an intelligent IDE plugin to detect 'Cognitive Friction'.",
      "Dynamically generate micro-learning modules when a user is struggling.",
      "Unblock the developer without them leaving the editor.",
      "Differentiate between thinking time and struggling time."
    ],
    keyChallenges: [
      "Struggle Detection: Using behavioral metrics (deletion rate, idle time).",
      "Contextual Relevance: Understanding code intent to provide useful help.",
      "Privacy & Performance: Processing context locally without lagging the IDE."
    ],
    baselineRequirements: [
      "IDE Extension: Functional plugin reading active editor state.",
      "Friction Metrics: Scoring system for struggle.",
      "Dynamic Content: Concise code snippets/explanations.",
      "Dashboard: Summary view of 'Struggle Areas' for self-review."
    ]
  },
  {
    id: 3,
    title: "AI Agent for Intake and Sales Enablement",
    domain: "Sales Operations / NLP",
    company: "Revinova", // Updated
    logo: "/logos/revinova-logo.png", // Ensure this path is correct in your public folder
    shortDescription: "End-to-End Sales Agent that autonomously qualifies leads and orchestrates meeting scheduling.",
    overview: "Sales teams lose opportunities because inbound leads are not guided quickly. This focuses on Agentic Behavior: autonomous decision-making.",
    problemStatement: [
      "Design an Agentic Sales Orchestrator as the first point of contact.",
      "Autonomously capture lead details and evaluate against criteria.",
      "Orchestrate next steps: booking meetings or educating others.",
      "Use a controlled Knowledge Base to prevent hallucinations."
    ],
    keyChallenges: [
      "Agentic Decision Making: Deciding when enough info is gathered.",
      "Tool Orchestration: Reliably triggering external actions (Calendly, Email).",
      "Context Retention: Remembering user details across multiple turns."
    ],
    baselineRequirements: [
      "Natural Intake: Conversational extraction of lead metadata.",
      "Criteria-Driven Routing: Generate Calendly links for qualified leads.",
      "Knowledge Retrieval: Recommend specific product resources.",
      "Lead Log: Maintain a structured interaction state."
    ]
  },
  {
    id: 4,
    title: "Digital Pulse: The Contextual Cultural Intelligence Engine",
    domain: "Data Analytics / Social Intelligence",
    company: "Digital Pulse",
    logo: "https://ui-avatars.com/api/?name=Digital+Pulse&background=random",
    shortDescription: "A contextual analytics platform to identify and visualize viral narratives within social datasets.",
    overview: "Viral metrics often mask significant cultural shifts. This tool reconstructs narratives to see what drives engagement beyond numbers.",
    problemStatement: [
      "Design a platform to ingest social data and reconstruct the 'Viral Narrative'.",
      "Identify, rank, and visualize dominant trends.",
      "Process raw data to group fragmented text into coherent topics.",
      "Enable deep-dives into specific data points."
    ],
    keyChallenges: [
      "Contextual Ingestion: Normalizing diverse datasets (CSV, JSON).",
      "Metric Reconstruction: Calculating 'Virality' within a bounded set.",
      "Cluster Identification: Semantic grouping of unstructured text."
    ],
    baselineRequirements: [
      "Data Pipeline: System to parse and index social datasets.",
      "Viral Ranking Engine: Scoring logic based on engagement.",
      "Hype Dashboard: Visualization of performing trends.",
      "Drill-Down: Inspect specific posts contributing to sentiment spikes."
    ]
  },
  {
    id: 5,
    title: "Gridlock-Breaker: AI-Coordinated Traffic Orchestration",
    domain: "Smart Cities / IoT",
    company: "Traffic AI",
    logo: "https://ui-avatars.com/api/?name=Traffic+AI&background=random",
    shortDescription: "A city-wide orchestration engine that transforms static traffic signals into a synchronized intelligent network.",
    overview: "Urban traffic is characterized by 'chaotic heterogeneity'. Current reactive systems lead to economic loss and delayed emergency services.",
    problemStatement: [
      "Design an AI Control Plane coordinating multiple intersections.",
      "Ingest real-time density data to dynamically adjust phases.",
      "Maximize vehicle throughput across a grid.",
      "Implement emergency priority corridors."
    ],
    keyChallenges: [
      "Green Wave Logic: Coordinating adjacent signals.",
      "Heterogeneous Flow: Handling mixed traffic behaviors (Buses, Bikes).",
      "Emergency Priority: Clearing paths without gridlocking the city."
    ],
    baselineRequirements: [
      "Simulation Environment: Demonstration on SUMO or CityFlow.",
      "Adaptive Logic: RL algorithm adjusting timing based on queue.",
      "Emergency Override: Zero-wait passage for ambulances.",
      "Fail-Safe: Fallback to safety mode if sensors fail."
    ]
  },
  {
    id: 6,
    title: "Credit-Vision: Inclusive Scoring & Trust Protocols",
    domain: "FinTech / Machine Learning",
    company: "Credit Vision",
    logo: "https://ui-avatars.com/api/?name=Credit+Vision&background=random",
    shortDescription: "Alternative credit scoring engine using non-traditional data to assess risk for the 'Credit Invisible'.",
    overview: "Many in emerging economies lack formal credit history. This engine uses daily life financial responsibility signals for risk assessment.",
    problemStatement: [
      "Design a real-time scoring engine using non-traditional signals.",
      "Utilize Explainable AI (XAI) to justify scores.",
      "Assess risk for 'Cold Start' users with zero history.",
      "Ensure transparency and regulatory compliance."
    ],
    keyChallenges: [
      "Data Fusion: Merging structured bureau data with unstructured signals.",
      "Explainability: Outputting causal factors behind a score.",
      "Cold Start: Accurate assessment without historical loan data."
    ],
    baselineRequirements: [
      "Multi-Source Ingestion: Cash flow, utility payments, and metadata.",
      "Hybrid Scoring Logic: ML model weighting alternative data.",
      "Explainability Layer: Factor breakdown for loan officers.",
      "Performance: Near real-time evaluation."
    ]
  },
  {
    id: 8,
    title: "Lifecycle-Ledger: IoT Digital Product Passports",
    domain: "IoT / Sustainability",
    company: "Lifecycle Ledger",
    logo: "https://ui-avatars.com/api/?name=Lifecycle+Ledger&background=random",
    shortDescription: "A 'Living Identity' for electronics recording health, repairs, and ownership on a tamper-resistant ledger.",
    overview: "Electronic waste is accelerated by opacity. Passports enable a Circular Economy by recording internal health and repair history.",
    problemStatement: [
      "Create an IoT Digital Passport System where each device is a dynamic asset.",
      "Update automatically based on device lifecycle health.",
      "Allow authorized centers to log repairs securely.",
      "Enable recyclers to query health to calculate resale value."
    ],
    keyChallenges: [
      "Dynamic Metadata: Synchronizing blockchain with IoT telemetry.",
      "Access Control: Ensuring only authorized shops sign repairs.",
      "Offline Inspection: Verification via passive NFC."
    ],
    baselineRequirements: [
      "Dynamic Asset Standard: Metadata reflecting physical wear.",
      "Repair Signing: Cryptographic workflow for technician signatures.",
      "Telemetry Bridge: Simulation anchoring health to the ledger.",
      "Valuation Logic: Module estimating resale value."
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
  "IoT / Sustainability"
];

export default function ProblemStatements() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedProblem, setSelectedProblem] = useState<typeof problemStatements[0] | null>(null);

  const filteredProblems = selectedDomain === "All" 
    ? problemStatements 
    : problemStatements.filter(p => p.domain === selectedDomain);

  useEffect(() => {
    document.body.style.overflow = selectedProblem ? "hidden" : "unset";
  }, [selectedProblem]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-purple-500/30">
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <DarkVeil speed={1.5} noiseIntensity={0.02} warpAmount={0.3} />
      </div>

      <AppNavbar />

      <main className="relative z-10 px-4 md:px-8 pb-20 max-w-7xl mx-auto">
        <div className="h-28 md:h-36 w-full" />
        
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Problem Statements
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Explore the challenges for Blueprints 2026. Choose your domain and build the future.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={cn(
                "px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border",
                selectedDomain === domain
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Grid: 3 columns, centering the 7th item */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProblem(problem)}
                className={cn(
                  "group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer overflow-hidden flex flex-col justify-between min-h-[320px]",
                  // Centering the 7th item on Large screens
                  selectedDomain === "All" && index === 6 ? "lg:col-start-2" : ""
                )}
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconArrowUpRight className="text-white/50" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
                    {problem.domain.split(' / ')[0]}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                    {problem.title}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-4 leading-relaxed">
                    {problem.shortDescription}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                        <img src={problem.logo} alt={problem.company} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{problem.company}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedProblem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={() => setSelectedProblem(null)}
                    className="absolute top-8 right-8 z-30 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                    <IconX size={20} />
                </button>

                <div className="w-full md:w-2/5 bg-zinc-900/30 p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                    <p className="text-purple-500 font-mono text-[10px] mb-4 uppercase tracking-[0.3em] font-bold">Standard #2026</p>
                    <h2 className="text-4xl font-bold text-white mb-6 leading-[1.1]">{selectedProblem.title}</h2>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 w-fit">
                        <img src={selectedProblem.logo} className="w-6 h-6 rounded-full" />
                        <span className="text-sm font-medium text-white/90">{selectedProblem.company}</span>
                    </div>
                </div>

                <div className="w-full md:w-3/5 p-10 overflow-y-auto custom-scrollbar">
                    <div className="space-y-12">
                        <section>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 font-black">Context</h4>
                            <p className="text-white/60 leading-relaxed text-sm">{selectedProblem.overview}</p>
                        </section>
                        <section>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 font-black">Core Objective</h4>
                            <ul className="space-y-4">
                                {selectedProblem.problemStatement.map((s, i) => (
                                    <li key={i} className="text-sm text-white/80 flex gap-4">
                                        <span className="text-purple-500 font-bold">0{i+1}</span>
                                        <span className="opacity-80">{s}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 font-black">Technical Scope</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedProblem.baselineRequirements.map((r, i) => (
                                    <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-xl text-[11px] text-white/50 leading-snug">
                                        {r}
                                    </div>
                                ))}
                            </div>
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

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}