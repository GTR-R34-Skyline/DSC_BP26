"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppNavbar from "@/components/Navbar";
import DarkVeil from "@/components/DarkVeil";
import { IconX, IconArrowUpRight, IconDownload } from "@tabler/icons-react";
import jsPDF from "jspdf";

// Simplified Technical Classification
const problemStatements = [
  {
    id: 1,
    title: "AI-Powered Diabetic Retinopathy Screening for Eye Camps",
    domain: "ML",
    company: "Clustrex",
    logo: "/logos/clustrex_logo.jpeg",
    shortDescription: "AI-powered triage assistant acting as a 'First Line of Defense' to optimize ophthalmologist time in rural screening camps.",
    overview: "In India, diabetic retinopathy (DR) is a leading cause of avoidable blindness. Rural eye screening camps serve hundreds of patients daily with limited specialist availability. The critical bottleneck is time: ophthalmologists waste hours screening healthy eyes, leaving less time for patients who need urgent intervention. This challenge seeks an AI solution to act as a 'First Line of Defense,' filtering the patient queue to optimize the doctor's time.",
    problemStatement: [
      "Design an AI-powered triage assistant that analyzes retinal (fundus) images to estimate Diabetic Retinopathy severity.",
      "The system must function as a high-volume filter, identifying which patients need specialist attention ('Refer') and which are safe to send home ('Monitor'), ensuring no severe cases are missed."
    ],
    keyChallenges: [
      "The 'Trust Gap': Doctors are skeptical of 'Black Box' AI. The system must explain why it made a decision (e.g., heatmaps, lesion detection).",
      "Field Conditions: The model must be robust against image quality issues typical of mobile camps (uneven lighting, mild blur, noise).",
      "Throughput: The system must render a decision quickly to prevent queue pile-up."
    ],
    baselineRequirements: [
      "Core Classification: Automatically analyze retinal images and classify them into standard clinical severity stages.",
      "Actionable Triage: Map the severity score to strict recommendations.",
      "Explainability: Provide a visual or textual rationale for the prediction to aid doctor verification.",
      "Safety Protocol: The interface must explicitly state 'Screening Support – Non-Diagnostic.'"
    ],
    expectedOutcome: "A functional prototype that takes a fundus image as input and displays a Severity Score, a Triage Action, and an Explanation Layer."
  },

  {
    id: 2,
    title: "Neuro-Adaptive Workflow: The In-IDE Skill Synthesizer",
    domain: "AI",
    company: "Asking India",
    logo: "https://ui-avatars.com/api/?name=IDE+Skills&background=random",
    shortDescription: "A 'Just-in-Time' Learning Engine that detects cognitive friction and injects contextual micro-skills inside the IDE.",
    overview: "Corporate training has a near-zero ROI because it is disconnected from daily work. Modern developers suffer from constant context switching — leaving their IDE to search for answers, breaking their 'Flow State.' This challenge seeks to build a 'Just-in-Time' Learning Engine that acts as an intelligent layer between the developer and their code, injecting micro-skills exactly when a knowledge gap is detected.",
    problemStatement: [
      "Develop an intelligent IDE plugin (VS Code/JetBrains) that monitors a developer's real-time coding behavior to detect 'Cognitive Friction.'",
      "When struggle is detected (e.g., repeated refactoring, idle time, compilation errors), dynamically generate and present a Micro-Learning Module tailored to unblock them without leaving the editor."
    ],
    keyChallenges: [
      "Struggle Detection: Accurately distinguishing between thinking time and struggling time using behavioral metrics.",
      "Contextual Relevance: Understanding code intent (e.g., implementing a React Hook) to provide useful help.",
      "Privacy & Performance: Efficient local processing without lagging the IDE."
    ],
    baselineRequirements: [
      "IDE Extension: Functional plugin reading active editor state and AST.",
      "Friction Metrics: Scoring system using Error Frequency, Deletion Rate, Documentation Search patterns.",
      "Dynamic Content: Concise interactive snippet/explanation generation.",
      "Dashboard: Summary of 'Struggle Areas' for self-review."
    ],
    expectedOutcome: "A polished IDE extension where the judge codes a buggy function and the system automatically identifies the missing concept and offers a correction without breaking flow."
  },

  {
    id: 3,
    title: "AI Agent for Intake and Sales Enablement",
    domain: "Agentic AI",
    company: "Revinova",
    logo: "/logos/revinova-logo.png",
    shortDescription: "End-to-End Agentic Sales Orchestrator capable of autonomous qualification and action execution.",
    overview: "Sales teams lose valuable opportunities because inbound leads are not guided to the right product quickly. Manual qualification is inconsistent, and scheduling meetings involves tedious back-and-forth. This challenge focuses on building an End-to-End AI Agent that demonstrates autonomous decision-making, context awareness, and safe action execution.",
    problemStatement: [
      "Design an Agentic Sales Orchestrator acting as the first point of contact.",
      "Autonomously capture lead details, evaluate them against explicit qualification criteria, and orchestrate next steps — either booking meetings or educating leads using a controlled knowledge base."
    ],
    keyChallenges: [
      "Agentic Decision Making: Decide when enough information is gathered.",
      "Controlled Generation: Strict retrieval from provided Knowledge Base to prevent hallucinations.",
      "Tool Orchestration: Trigger external actions reliably without breaking conversation.",
      "Context Retention: Maintain structured conversation state."
    ],
    baselineRequirements: [
      "Natural Intake & Qualification: Extract Name, Company, Role, Use Case mapped to explicit criteria.",
      "Criteria-Driven Routing: Perform autonomous followups or provide KB resources.",
      "Knowledge Retrieval: Recommend 2–5 product spec links/videos from provided sources.",
      "Lead Log: Maintain structured interaction state."
    ],
    expectedOutcome: "A fully functioning Sales Agent (Web Interface) capable of end-to-end qualification, recommendation, and meeting scheduling without human intervention."
  },

  {
    id: 4,
    title: "Digital Pulse: The Contextual Cultural Intelligence Engine",
    domain: "Data Analytics",
    company: "VIU",
    logo: "/logos/viuott_logo.jpeg",
    shortDescription: "Contextual analytics platform reconstructing viral narratives and identifying cultural shifts.",
    overview: "Modern social media amplifies popularity over significance. Researchers miss subtle early-stage cultural shifts. This challenge focuses on building a dual-purpose intelligence engine capable of analyzing both viral currents and nascent signals.",
    problemStatement: [
      "Design a Contextual Analytics Platform to ingest structured/unstructured social data.",
      "Reconstruct the Viral Narrative and identify, rank, and visualize dominant trends."
    ],
    keyChallenges: [
      "Contextual Ingestion: Normalize diverse datasets (CSV, JSON, streams).",
      "Metric Reconstruction: Calculate Virality and Impact accurately.",
      "Cluster Identification: Group fragmented unstructured text into coherent topics."
    ],
    baselineRequirements: [
      "Data Pipeline: Parse and index uploaded datasets.",
      "Viral Ranking Engine: Score based on Volume, Likes, Shares, Comments.",
      "Hype Dashboard: Surface top-performing trends.",
      "Drill-Down Capability: Inspect posts contributing to trends."
    ],
    expectedOutcome: "A deployed tool generating a 'State of the Conversation' report instantly from raw uploads."
  },

  {
    id: 5,
    title: "Gridlock-Breaker: AI-Coordinated Adaptive Traffic Orchestration",
    domain: "IoT",
    company: "VIU",
    logo: "/logos/viuott_logo.jpeg",
    shortDescription: "City-wide orchestration engine transforming static traffic signals into synchronized intelligent networks.",
    overview: "Urban traffic in Indian metropolitan areas is chaotic and reactive. This challenge seeks a City-Wide Orchestration Engine that transforms traffic signals into synchronized intelligent systems optimizing flow.",
    problemStatement: [
      "Design an AI-Driven Traffic Control Plane coordinating multiple intersections.",
      "Use simulation (SUMO/CityFlow/custom engine) to ingest real-time density and dynamically adjust signal phases."
    ],
    keyChallenges: [
      "Green Wave Logic: Coordinate adjacent signals.",
      "Heterogeneous Flow: Handle mixed vehicle types.",
      "Emergency Priority: Create green corridors instantly."
    ],
    baselineRequirements: [
      "Simulation Environment: Multi-intersection grid model.",
      "Adaptive Logic: Queue-based timing adjustments.",
      "Emergency Override: Ambulance Agent zero-wait feature.",
      "Fail-Safe: Fallback safety mode."
    ],
    expectedOutcome: "Side-by-side simulation showing 20%+ reduction in average wait time compared to fixed timers."
  },

  {
    id: 6,
    title: "Credit-Vision: Inclusive Scoring & Trust Protocols",
    domain: "ML",
    company: "Credit Vision",
    logo: "https://ui-avatars.com/api/?name=Credit+Vision&background=random",
    shortDescription: "Real-time alternative credit scoring engine for the credit invisible using Explainable AI.",
    overview: "Many in emerging economies remain 'Credit Invisible' due to lack of formal history. Traditional models are static and exclusionary.",
    problemStatement: [
      "Design a Real-Time Alternative Credit Scoring Engine ingesting non-traditional financial signals.",
      "Fuse structured and alternative data to generate a holistic risk assessment using Explainable AI."
    ],
    keyChallenges: [
      "Data Fusion: Merge structured bureau data with alternative signals.",
      "Explainability: Output causal factors behind scores.",
      "Cold Start: Accurate assessment without historical loans."
    ],
    baselineRequirements: [
      "Multi-Source Ingestion: Cash flow, utility payments, digital metadata.",
      "Hybrid Scoring Logic: ML weighting alternative data dynamically.",
      "Explainability Layer: Breakdown of contributing factors.",
      "Performance: Near real-time evaluation."
    ],
    expectedOutcome: "A deployed system generating mathematically justified Risk Scores for users with zero formal credit history."
  },

  {
    id: 8,
    title: "Lifecycle-Ledger: IoT Digital Product Passports",
    domain: "IoT",
    company: "Kloud Katalyst",
    logo: "logos/kloud_katalyst_logo.jpeg",
    shortDescription: "IoT-enabled Digital Product Passport providing a tamper-resistant lifecycle identity for electronics.",
    overview: "Electronic waste is accelerated by opacity; devices are discarded due to unknown internal health and repair history. This challenge builds a Digital Product Passport system — a Living Identity for electronics.",
    problemStatement: [
      "Design an IoT-Enabled Digital Passport System where each device is represented by a dynamic asset that updates automatically based on lifecycle telemetry.",
      "Allow authorized service centers to log repairs and enable recyclers to query verified health status to determine resale value."
    ],
    keyChallenges: [
      "Dynamic Metadata: Updating blockchain record from IoT telemetry without spamming network.",
      "Access Control: Restrict repair signing to authorized shops.",
      "Offline Inspection: NFC-based verification even without battery/network."
    ],
    baselineRequirements: [
      "Dynamic Asset Standard: Metadata reflecting physical health changes.",
      "Repair Signing: Cryptographic workflow for technician signatures.",
      "Telemetry Bridge: IoT agent anchoring health checkpoints to ledger.",
      "Valuation Logic: Resale value estimation module."
    ],
    expectedOutcome: "A deployed system where scanning a device shows a verified history timeline and automatically calculates its refurbished grade."
  }
];

const domains = ["All", "ML", "AI", "Data Analytics", "IoT", "Agentic AI"];

/* ====================================================
   PDF GENERATOR FUNCTION
==================================================== */
// Helper: fetch an image URL and return a base64 data URL
const toBase64 = (url: string): Promise<string> =>
  fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const generatePDF = async (problem: typeof problemStatements[0]) => {
  const doc = new jsPDF();

  // ── Fetch logos ──
  let dscBase64 = "";
  let bpBase64 = "";
  try {
    [dscBase64, bpBase64] = await Promise.all([
      toBase64("/DSC_logo.png"),
      toBase64("/Blueprints_Logo.png"),
    ]);
  } catch (_) {
    // logos optional — continue without them if fetch fails
  }

  // ── PDF Header with logos ──
  const HEADER_H = 22; // height of the header band in mm
  // Dark background strip
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, HEADER_H, "F");

  // DSC logo — left side
  if (dscBase64) {
    doc.addImage(dscBase64, "PNG", 10, 3, 36, 16);
  }

  // Blueprints logo — right side
  if (bpBase64) {
    doc.addImage(bpBase64, "PNG", 164, 3, 36, 16);
  }

  // Thin purple accent line below header
  doc.setDrawColor(147, 51, 234);
  doc.setLineWidth(0.8);
  doc.line(0, HEADER_H, 210, HEADER_H);

  let y = HEADER_H + 10;

  // ── Title ──
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 20);
  const titleLines = doc.splitTextToSize(problem.title, 170);
  doc.text(titleLines, 20, y);
  y += titleLines.length * 8 + 4;

  // ── Meta ──
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 80, 200);
  doc.text(`Domain: ${problem.domain}`, 20, y);
  y += 6;
  doc.text(`Company: ${problem.company}`, 20, y);
  y += 12;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);
  y += 10;

  // ── Overview ──
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text("Context / Overview", 20, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const overviewLines = doc.splitTextToSize(problem.overview, 170);
  doc.text(overviewLines, 20, y);
  y += overviewLines.length * 6 + 10;

  const addSection = (title: string, items: string[]) => {
    if (y > 250) { doc.addPage(); y = 20; }

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(title, 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);

    items.forEach((item, index) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const prefix = title.includes("Objective") ? `0${index + 1}.  ` : "•  ";
      const lines = doc.splitTextToSize(`${prefix}${item}`, 165);
      doc.text(lines, 22, y);
      y += lines.length * 6 + 3;
    });

    y += 8;
  };

  addSection("Core Objectives", problem.problemStatement);
  addSection("Key Challenges", problem.keyChallenges);
  addSection("Baseline Requirements", problem.baselineRequirements);

  // ── Footer ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Blueprints 2026 — ${problem.company}`, 20, 290);
    doc.text(`Page ${i} of ${pageCount}`, 175, 290);
  }

  doc.save(`${problem.title}.pdf`);
};

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

        {/* Grid */}
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
              {/* Close button */}
              <button
                onClick={() => setSelectedProblem(null)}
                className="absolute top-8 right-8 z-30 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
              >
                <IconX size={20} />
              </button>

              {/* Left Panel */}
              <div className="w-full md:w-2/5 bg-zinc-900/30 p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />

                <div>
                  <p className="text-purple-500 font-mono text-[10px] mb-4 uppercase tracking-[0.3em] font-bold">Standard #2026</p>
                  <h2 className="text-4xl font-bold text-white mb-6 leading-[1.1]">{selectedProblem.title}</h2>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 w-fit">
                    <img src={selectedProblem.logo} className="w-6 h-6 rounded-full" alt={selectedProblem.company} />
                    <span className="text-sm font-medium text-white/90">{selectedProblem.company}</span>
                  </div>
                </div>

                {/* ── PDF Download Button ── */}
                <button
                  onClick={() => generatePDF(selectedProblem).catch(console.error)}
                  className="mt-10 flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all text-sm font-semibold text-white shadow-[0_0_24px_rgba(147,51,234,0.35)]"
                >
                  <IconDownload size={16} />
                  Download PDF
                </button>
              </div>

              {/* Right Panel */}
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
                          <span className="text-purple-500 font-bold">0{i + 1}</span>
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
