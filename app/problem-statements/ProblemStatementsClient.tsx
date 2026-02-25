"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import AppNavbar from "@/components/Navbar";
import DarkVeil from "@/components/DarkVeil";
import { IconX, IconUsers } from "@tabler/icons-react";

// Technical Classification with expanded color details
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
        expectedOutcome: "A functional prototype that takes a fundus image as input and displays a Severity Score, a Triage Action, and an Explanation Layer.",
        gradient: "from-purple-600/20 via-purple-900/40 to-black",
        colorRef: "border-purple-500/50"
    },
    {
        id: 2,
        title: "Neuro-Adaptive Workflow: The In-IDE Skill Synthesizer",
        domain: "AI",
        company: "Asking India",
        logo: "https://ui-avatars.com/api/?name=Asking+India&background=random",
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
        expectedOutcome: "A polished IDE extension where the judge codes a buggy function and the system automatically identifies the missing concept and offers a correction without breaking flow.",
        gradient: "from-purple-600/20 via-purple-900/40 to-black",
        colorRef: "border-purple-500/50"
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
        expectedOutcome: "A fully functioning Sales Agent (Web Interface) capable of end-to-end qualification, recommendation, and meeting scheduling without human intervention.",
        gradient: "from-purple-600/20 via-purple-900/40 to-black",
        colorRef: "border-purple-500/50"
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
        expectedOutcome: "A deployed tool generating a 'State of the Conversation' report instantly from raw uploads.",
        gradient: "from-purple-600/20 via-purple-900/40 to-black",
        colorRef: "border-purple-500/50"
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
        expectedOutcome: "Side-by-side simulation showing 20%+ reduction in average wait time compared to fixed timers.",
        gradient: "from-purple-600/20 via-purple-900/40 to-black",
        colorRef: "border-purple-500/50"
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
        expectedOutcome: "A deployed system generating mathematically justified Risk Scores for users with zero formal credit history.",
        gradient: "from-purple-600/20 via-purple-900/40 to-black",
        colorRef: "border-purple-500/50"
    },
    {
        id: 8,
        title: "Lifecycle-Ledger: IoT Digital Product Passports",
        domain: "IoT",
        company: "Kloud Katalyst",
        logo: "/logos/kloud_katalyst_logo.jpeg",
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
        expectedOutcome: "A deployed system where scanning a device shows a verified history timeline and automatically calculates its refurbished grade.",
        gradient: "from-purple-600/20 via-purple-900/40 to-black",
        colorRef: "border-purple-500/50"
    }
];



// Sticky Card Component for Overlapping Effect
function ProblemCard({
    problem,
    index,
    total,
    totalSubmissions,
    onClick
}: {
    problem: typeof problemStatements[0]
    index: number
    total: number
    totalSubmissions: number
    onClick: () => void
}) {
    const cardRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"]
    })

    // Start shrinking earlier based on index to create stack effect
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.05])

    return (
        <motion.div
            ref={cardRef}
            style={{ scale }}
            onClick={onClick}
            className={`sticky top-24 mb-16 last:mb-0 w-full rounded-3xl overflow-hidden cursor-pointer group bg-gradient-to-b ${problem.gradient} border ${problem.colorRef} hover:shadow-2xl transition-all duration-300 md:h-72`}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />

            <div className="p-8 md:p-10 h-full flex flex-col md:flex-row gap-8 items-start relative z-10 bg-black/40 backdrop-blur-sm">

                {/* Left Info: Logo, Domain & Stats */}
                <div className="w-full md:w-[250px] shrink-0 flex flex-col justify-between h-full space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-xl overflow-hidden">
                            <img
                                src={problem.logo}
                                alt={problem.company}
                                className="w-full h-full object-contain"
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${problem.company}&background=random` }}
                            />
                        </div>
                        <div>
                            <span className="text-white/60 text-xs uppercase tracking-wider font-bold block mb-1">Partner</span>
                            <span className="text-white font-semibold text-lg">{problem.company}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border bg-black/50 w-fit ${problem.colorRef}`}>
                            {problem.domain}
                        </span>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-black/50 w-fit ${problem.colorRef}`}>
                            <IconUsers size={16} className="text-white/70" />
                            <span className="text-sm font-semibold text-white/90">
                                {totalSubmissions || 0} <span className="text-white/50 font-normal">Submissions</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Info: Text Content */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                        {problem.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl">
                        {problem.shortDescription}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

/* ====================================================
   MAIN COMPONENT
==================================================== */

export default function ProblemStatementsClient({ submissionStats }: { submissionStats: Record<string, number> }) {
    const [selectedProblem, setSelectedProblem] = useState<typeof problemStatements[0] | null>(null);

    const filteredProblems = problemStatements;

    useEffect(() => {
        document.body.style.overflow = selectedProblem ? "hidden" : "unset";
    }, [selectedProblem]);

    return (
        <div className="relative w-full min-h-screen bg-black text-white selection:bg-white/20">
            <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-50">
                {/* Adds subtle base grain */}
                <DarkVeil speed={1.5} noiseIntensity={0.03} warpAmount={0.2} />
            </div>

            <AppNavbar />

            <main className="relative z-10 px-4 md:px-8 pb-32 max-w-6xl mx-auto">
                <div className="h-32 md:h-40" />

                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-sm leading-tight relative z-10">
                        Problem Statements
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
                        Explore the challenges brought forward by our industry partners.
                    </p>
                </div>



                {/* STACKING LIST */}
                <div className="relative pb-24">
                    <AnimatePresence>
                        {filteredProblems.map((problem, i) => (
                            <motion.div
                                key={problem.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <ProblemCard
                                    problem={problem}
                                    index={i}
                                    total={filteredProblems.length}
                                    totalSubmissions={submissionStats[problem.title] || 0}
                                    onClick={() => setSelectedProblem(problem)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredProblems.length === 0 && (
                        <div className="text-center text-white/40 py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                            No problem statements found for this domain.
                        </div>
                    )}
                </div>
            </main>

            {/* MODAL / BOTTOM SHEET */}
            <AnimatePresence>
                {selectedProblem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12 bg-black/80 backdrop-blur-2xl"
                        onClick={() => setSelectedProblem(null)}
                    >
                        {/* Dynamic Glossy Background behind modal */}
                        <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${selectedProblem.gradient} pointer-events-none mix-blend-screen`} />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={`relative w-full max-w-6xl max-h-[92vh] md:max-h-[85vh] bg-[#0a0a0a] border ${selectedProblem.colorRef} rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedProblem(null)}
                                className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-black/50 hover:bg-white/10 backdrop-blur-md text-white transition-all border border-white/10 group"
                            >
                                <IconX size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Left Panel */}
                            <div className="w-full md:w-2/5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between relative overflow-hidden bg-white/5">
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${selectedProblem.gradient.replace('to-black', 'to-transparent')}`} />

                                <div>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-black/50 mb-6 ${selectedProblem.colorRef}`}>
                                        <IconUsers size={16} className="text-white/70" />
                                        <span className="text-sm font-semibold text-white/90">
                                            {submissionStats[selectedProblem.title] || 0} Submissions
                                        </span>
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight">{selectedProblem.title}</h2>

                                    <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5 w-fit shadow-inner">
                                        <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                                            <img
                                                src={selectedProblem.logo}
                                                className="w-full h-full object-contain"
                                                alt={selectedProblem.company}
                                                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedProblem.company}&background=random` }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Industry Partner</p>
                                            <span className="text-base font-bold text-white/90">{selectedProblem.company}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-black/60 backdrop-blur-xl">
                                <div className="space-y-12 max-w-3xl">
                                    <section>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-black">Overview</h4>
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                        </div>
                                        <p className="text-white/70 leading-relaxed text-base md:text-lg">{selectedProblem.overview}</p>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-black">Core Objective</h4>
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                        </div>
                                        <ul className="space-y-5">
                                            {selectedProblem.problemStatement.map((s, i) => (
                                                <li key={i} className="text-base md:text-lg text-white/80 flex gap-5 items-start bg-white/5 p-5 rounded-2xl border border-white/5">
                                                    <span className={`text-xl font-black opacity-50 font-mono select-none bg-gradient-to-b ${selectedProblem.gradient} bg-clip-text text-transparent`}>
                                                        0{i + 1}
                                                    </span>
                                                    <span className="opacity-90 leading-relaxed pt-1">{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-black">Key Challenges</h4>
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedProblem.keyChallenges.map((r, i) => (
                                                <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white/60 leading-relaxed hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
                                                    {/* Top accent line matching card color */}
                                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${selectedProblem.gradient.replace('to-black', 'to-transparent')} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                                    {r}
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-black">Baseline Requirements</h4>
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedProblem.baselineRequirements.map((r, i) => (
                                                <div key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed">
                                                    <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white/20`} />
                                                    <span>{r}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className={`p-6 rounded-2xl bg-gradient-to-br ${selectedProblem.gradient} border ${selectedProblem.colorRef} flex flex-col md:flex-row gap-6 items-center`}>
                                        <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-white/10">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeOpacity="0.8" strokeWidth="2" />
                                                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-black mb-2">Expected Outcome</h4>
                                            <p className="text-white text-base md:text-lg font-medium leading-relaxed drop-shadow-sm">{selectedProblem.expectedOutcome}</p>
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
