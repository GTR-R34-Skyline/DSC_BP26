"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import AppNavbar from "@/components/Navbar";
import DarkVeil from "@/components/DarkVeil";
import { IconX, IconUsers } from "@tabler/icons-react";

const problemStatements = [
    {
        id: 1,
        title: "AI-Powered Diabetic Retinopathy Screening for Eye Camps",
        domain: "ML",
        company: "Clustrex",
        logo: "/logos/clustrex_logo.jpeg",
        shortDescription: "AI-powered triage assistant acting as a 'First Line of Defense' to optimize ophthalmologist time in rural screening camps.",
        overview: "Diabetic Retinopathy (DR) is a leading cause of preventable blindness in India. Rural eye camps screen hundreds of patients daily with limited specialist availability. The core bottleneck is time — ophthalmologists must manually filter mostly healthy cases before reaching severe ones. The intelligence must lie in an AI-powered triage layer that acts as the first line of defense, prioritizing high-risk patients while maintaining clinical trust and safety.",
        problemStatement: [
            "Design an AI-powered screening assistant that analyzes retinal (fundus) images and classifies Diabetic Retinopathy severity.",
            `The system must:\n• Classify images into standard clinical DR stages\n• Identify patients requiring urgent referral\n• Safely filter low-risk cases\n• Provide explainable reasoning for each prediction`
        ],
        keyChallenges: [
            "Trust & Explainability: Doctors must understand why a decision was made (e.g., heatmaps, lesion localization).",
            "Field Robustness: The model must handle real-world noise: blur, uneven lighting, low contrast.",
            "Throughput: Predictions must render quickly to avoid queue congestion.",
            "Safety Framing: Interface must clearly state: 'Screening Support – Non-Diagnostic.'"
        ],
        baselineRequirements: [
            "Core Classification: Automatically analyze retinal images and classify them into standard clinical severity stages.",
            "Actionable Triage: Map the severity score to strict recommendations.",
            "Explainability: Provide a visual or textual rationale for the prediction to aid doctor verification.",
            "Safety Protocol: The interface must explicitly state 'Screening Support – Non-Diagnostic.'"
        ]
    },
    {
        id: 2,
        title: "AI Agent for Intake and Sales Enablement",
        domain: "Agentic AI",
        company: "Revinova",
        logo: "/logos/revinova-logo.png",
        shortDescription: "End-to-End Agentic Sales Orchestrator capable of autonomous qualification and action execution.",
        overview: "Modern buyers rarely move in straight lines. They explore, compare, hesitate, and signal intent indirectly. Traditional sales bots rely on rigid qualification checklists, but real-world selling requires contextual understanding and pacing. The intelligence must lie in an adaptive agent that reconstructs buyer intent from incomplete conversational signals and delays hard sales actions until readiness is evident.",
        problemStatement: [
            "Design an Agentic Sales Consultant that serves as the first point of contact for inbound leads.",
            "Infer Buyer Intent State (Exploring, Comparing, Decision-Ready).",
            "Maintain contextual memory across turns.",
            "Delay qualification and scheduling until intent confidence crosses a defined threshold.",
            "Provide value-aligned content before attempting to close.",
            "Demonstrate reasoning beyond simple keyword triggers."
        ],
        keyChallenges: [
            "Intent Ambiguity: Interpreting vague or mixed signals without relying on rigid keyword rules.",
            "Adaptive Pacing: Suppressing premature scheduling behavior.",
            "Intent Confidence Modeling: Maintaining a dynamic intent score across conversation turns.",
            "Controlled Knowledge Retrieval: Ensuring recommendations come strictly from the approved Knowledge Base.",
            "Citation Accuracy: If a video/spec sheet is recommended, it must genuinely match the user's need.",
            "Context Retention: Remembering earlier signals and evolving user position."
        ],
        baselineRequirements: [
            "Intent Tracking Model: Classify users into Exploring (educational resources), Comparing (spec sheets and differentiation), or Decision-Ready (trigger scheduling).",
            "Knowledge Retrieval Control: Retrieve resources strictly from provided KB (CSV/PDF). No hallucinated content. Every recommendation must include traceable citation.",
            "Tool Orchestration: Trigger Calendly only when intent threshold is met.",
            "Structured Lead Log: Maintain intent score progression, detected signals, recommended content, and triggered actions.",
            "Evaluation Safeguards: Use ambiguous transcripts to test inference depth beyond keyword matching. Ensure all recommended content is citation-verified for semantic relevance."
        ]
    },
    {
        id: 3,
        title: "Digital Pulse: The Contextual Cultural Intelligence Engine",
        domain: "Data Analytics",
        company: "VIU",
        logo: "/logos/viuott_logo.jpeg",
        shortDescription: "Contextual analytics platform reconstructing viral narratives and identifying cultural shifts.",
        overview: "Modern platforms amplify popularity, not significance. Viral content dominates dashboards, while early-stage cultural signals remain buried in low-engagement noise. This challenge focuses on building a dual-mode analytics engine that reconstructs dominant viral narratives while also detecting subtle, emerging cultural shifts before they achieve mass engagement.",
        problemStatement: [
            "Design a Contextual Analytics Platform capable of ingesting structured or unstructured social datasets and reconstructing the 'Viral Narrative' of a defined timeframe or topic.",
            "Normalize uploaded social data (CSV/JSON).",
            "Compute engagement-based virality rankings.",
            "Identify dominant clusters and themes.",
            "Visualize high-impact conversations.",
            "Provide drill-down transparency."
        ],
        keyChallenges: [
            "Contextual Ingestion: Normalizing heterogeneous datasets for unified analysis.",
            "Virality Reconstruction: Accurately calculating engagement-based influence.",
            "Cluster Identification: Grouping fragmented text into coherent topics.",
            "Visualization Clarity: Presenting ranked trends in an interpretable dashboard.",
            "Avoiding Naive Sorting: Moving beyond simple descending order of likes/shares toward weighted influence modeling."
        ],
        baselineRequirements: [
            "Data Pipeline: Parse and index uploaded dataset.",
            "Viral Ranking Engine: Implement scoring logic based on engagement metrics and rank trends using weighted popularity formula.",
            "Hype Dashboard: Visualize top-performing topics, sentiment spikes, and volume growth.",
            "Drill-Down View: Inspect posts contributing to each ranked trend.",
            "Predictive Framing: Include a lightweight forecasting mechanism to predict which high-engagement topics are likely to sustain growth."
        ]
    },
    {
        id: 4,
        title: "Gridlock-Breaker: AI-Coordinated Adaptive Traffic Orchestration",
        domain: "IoT",
        company: "VIU",
        logo: "/logos/viuott_logo.jpeg",
        shortDescription: "City-wide orchestration engine transforming static traffic signals into synchronized intelligent networks.",
        overview: "Urban traffic in Indian metros operates under static timers and manual intervention. These systems are reactive — responding only after congestion forms. This challenge demands a synchronized, city-wide orchestration engine that proactively optimizes traffic flow across an interconnected grid. The objective is flow optimization, not just congestion response.",
        problemStatement: [
            "Design an AI-Driven Traffic Control Plane capable of coordinating multiple intersections simultaneously using a validated traffic simulation environment.",
            "Ingest real-time density and queue data.",
            "Dynamically adjust signal phases (Green/Red durations).",
            "Coordinate adjacent signals for continuous traffic flow.",
            "Reduce overall waiting time and maximize throughput at grid level."
        ],
        keyChallenges: [
            "Green Wave Coordination: Synchronize adjacent intersections so vehicle platoons encounter consecutive green signals.",
            "Heterogeneous Traffic Handling: Manage mixed vehicle dynamics (cars, buses, bikes) with varying acceleration and spacing behaviors.",
            "Emergency Preemption: Instantly clear corridors for ambulances or fire trucks without causing secondary congestion.",
            "Real-Time Adaptation: React to live queue conditions instead of relying solely on historical averages.",
            "Fail-Safe Control: Automatically revert to safety mode if sensor data fails.",
            "Simulation Integrity: Avoid unrealistic physics that artificially inflate AI performance."
        ],
        baselineRequirements: [
            "Validated Simulation Environment: Use industry-standard simulators (e.g., SUMO, CityFlow). Custom engines must justify physics realism.",
            "Adaptive Signal Logic: Adjust signal timing based on live queue length and demonstrate measurable improvement over fixed timers.",
            "Emergency Override: Simulated Ambulance Agent must trigger a green corridor with demonstrated zero-wait passage.",
            "Fail-Safe Mode: If sensor data is lost, revert to predefined safety timing configuration.",
            "Comparative Benchmark: Provide side-by-side simulation (Scenario A: Fixed Timer vs Scenario B: AI Model) with minimum 20% reduction in average wait time."
        ]
    },
    {
        id: 5,
        title: "Credit-Vision: Inclusive Scoring & Trust Protocols",
        domain: "ML",
        company: "Developer Student Community",
        logo: "/DSC_logo.png",
        shortDescription: "Real-time alternative credit scoring engine for the credit invisible using Explainable AI.",
        overview: "Millions in emerging economies remain 'Credit Invisible' due to lack of formal credit history despite responsible financial behavior. Traditional credit models are static, bureau-dependent, and exclusionary. This challenge requires building a real-time, regulator-ready scoring engine that evaluates alternative financial behavior signals while remaining transparent, explainable, and mathematically justified.",
        problemStatement: [
            "Design a Real-Time Alternative Credit Scoring Engine capable of ingesting non-traditional financial signals and generating a Holistic Risk Score.",
            "Fuse traditional bureau data with alternative financial indicators.",
            "Handle zero-credit-history (Cold Start) applicants effectively.",
            "Produce transparent and explainable risk outputs.",
            "Support near real-time credit decision-making."
        ],
        keyChallenges: [
            "Data Fusion: Combine bureau data with cash-flow trends, repayment history, and digital transaction metadata.",
            "Explainability: Provide interpretable reasoning behind every risk score.",
            "Cold Start Modeling: Accurately assess applicants with no prior loan history.",
            "Bias & Overfitting Control: Prevent artificial tuning using synthetic or over-optimized datasets.",
            "Real-Time Performance: Enable instant-finance and micro-lending use cases."
        ],
        baselineRequirements: [
            "Standardized Dataset: Use provided anonymized dataset to prevent synthetic overfitting.",
            "Multi-Source Ingestion: Parse structured and alternative signals into a unified financial profile.",
            "Hybrid Scoring Logic: Dynamically weight alternative signals when bureau data is absent and output calibrated probability of default.",
            "Explainability Layer: Break down risk score into contributing factors with interpretable feature impact visualization.",
            "Performance Constraint: Generate risk score in near real-time."
        ]
    },
    {
        id: 6,
        title: "The Silent Perimeter: Directional Intrusion System",
        domain: "IoT",
        company: "Developer Student Community",
        logo: "/DSC_logo.png",
        shortDescription: "High-precision laser-based directional intrusion detection using timing sequence intelligence.",
        overview: "In high-security environments, a basic tripwire is insufficient. It reacts to noise such as falling debris, animals, or authorized personnel. A military-grade perimeter must distinguish direction and intent. The hardware sensors are simple; the intelligence lies in high-precision timing analysis at the command center. The system must operate at ultra-low latency and ensure reliable data transmission under real-world constraints.",
        problemStatement: [
            "Design a laser-based directional tripwire system using two Light Dependent Resistors (LDRs) spaced 10cm apart.",
            "Detect beam interruptions at high temporal resolution.",
            "Transmit sensor data reliably to a laptop.",
            "Enable real-time monitoring and directional analysis using timing sequence logic."
        ],
        keyChallenges: [
            "Ultra-Low Latency Detection: Polling every 50ms is insufficient; fast-moving objects can cross 10cm between reads.",
            "Ambient Noise Rejection: Prevent false triggers due to lighting fluctuations.",
            "Reliable Data Transmission: Avoid inefficient raw string streaming at high speed.",
            "Signal Integrity: Prevent corrupted packets during rapid transmission.",
            "Directional Intelligence: Infer movement direction using precise interruption sequence timing."
        ],
        baselineRequirements: [
            "High-Speed Sensing: Mandatory polling interval < 10ms OR interrupt-based beam break detection.",
            "Binary Packet Transmission: Transmit compact binary packets instead of raw strings.",
            "Packet Structure: Include Sensor A value, Sensor B value, timestamp, and checksum for integrity validation.",
            "Checksum Verification: Laptop must validate packet integrity before processing.",
            "Threshold Detection: Laptop flags 'BEAM BROKEN' when sensor value drops below calibrated threshold.",
            "Hardware Setup: Rigid dual-laser alignment with 10cm fixed spacing and vibration-stable mounting."
        ]
    },
    {
        id: 7,
        title: "Digital Evidence Integrity System",
        domain: "Blockchain",
        company: "Developer Student Community",
        logo: "/DSC_logo.png",
        shortDescription: "End-to-end blockchain-backed system ensuring cryptographic immutability and transparent chain-of-custody for legal evidence.",
        overview: "Digital evidence is central to modern litigation, yet credibility is frequently challenged due to tampering risks and undocumented custody transfers. This challenge requires building an end-to-end blockchain-backed evidence integrity system that guarantees authenticity, structured custody management, and verifiable audit trails. Every action performed on evidence must be traceable, role-bound, and tamper-evident.",
        problemStatement: [
            "Design a Blockchain-Based Evidence Registry acting as a secure digital vault and custody ledger.",
            "Generate a cryptographic hash for every uploaded file.",
            "Anchor the hash onto a blockchain ledger.",
            "Record custody transfers between authorized roles.",
            "Provide a transparent, chronological audit trail.",
            "Enable integrity verification at any time with tamper detection."
        ],
        keyChallenges: [
            "Evidence Integrity Verification: Ensure even single-bit file modification results in hash mismatch detection.",
            "Chain-of-Custody Transparency: Maintain immutable, timestamped records of every custody transfer.",
            "Role Simulation: Simulate Law Enforcement Officer, Forensic Analyst, Prosecutor, Defense Attorney, and Court Clerk roles.",
            "Secure Access Tracking: Enforce role-based permissions while logging every access attempt.",
            "Tamper Evident Design: Guarantee immediate detection of unauthorized alterations."
        ],
        baselineRequirements: [
            "Hash Anchoring: Upload file → Generate SHA-256 hash → Store hash and metadata on blockchain.",
            "Custody Lifecycle Tracking: Transfer evidence between authorized roles while recording transfer time, sender, receiver, and reason.",
            "Timeline View: Visual chronological history displaying timestamps and role transitions.",
            "Verification Tool: Re-upload file → Recalculate hash → Compare with blockchain entry → Flag 'Integrity Compromised' on mismatch.",
            "Structured Evidence Log: Maintain Evidence ID, original hash, current custodian, full custody chain, and verification status."
        ]
    },
    {
        id: 8,
        title: "Autonomous Machine Economy",
        domain: "Blockchain",
        company: "Developer Student Community",
        logo: "/DSC_logo.png",
        shortDescription: "Blockchain-powered machine-to-machine payment ecosystem with autonomous service consumption and smart contract settlement.",
        overview: "As IoT ecosystems expand, devices increasingly transact without human intervention. However, there is no standardized infrastructure enabling secure and trust-minimized machine-to-machine payments. This challenge requires building a blockchain-powered Autonomous Machine Economy where devices independently consume services, measure usage, calculate costs, and execute real-time payments via smart contracts.",
        problemStatement: [
            "Design a blockchain-based system where devices establish verified digital identities.",
            "Enable devices to request and provide services autonomously.",
            "Record measurable service usage in a verifiable manner.",
            "Automatically calculate service costs based on deterministic pricing logic.",
            "Execute on-chain payments ensuring transparent and tamper-resistant billing."
        ],
        keyChallenges: [
            "Device Identity: Assign unique cryptographic identity and wallet per device.",
            "Micropayments: Efficiently handle small, frequent transactions without excessive fees.",
            "Usage Verification: Ensure trusted and tamper-resistant measurement of service consumption.",
            "Real-Time Billing: Implement deterministic pricing using smart contracts.",
            "Atomic Settlement: Guarantee that usage confirmation and payment execution occur together."
        ],
        baselineRequirements: [
            "Device Registration: Register at least two devices with unique blockchain identities.",
            "Usage Simulation: Simulate measurable service units consumed between devices.",
            "Smart Contract Billing: Calculate cost dynamically using formula (usage × rate).",
            "Automatic Payment Execution: Trigger on-chain transfer upon usage confirmation.",
            "Monitoring Dashboard: Display device balances, usage records, and transaction history.",
            "Structured Ledger Log: Maintain records including device IDs, units consumed, cost, timestamp, and transaction status."
        ]
    },
    {
        id: 9,
        title: "The Autonomous Research Orchestrator: Intelligent Drug Repurposing Platform",
        domain: "AI/ML",
        company: "Developer Student Community",
        logo: "/DSC_logo.png",
        shortDescription: "Multi-domain AI research engine synthesizing clinical, patent, regulatory, and market intelligence for drug repurposing.",
        overview: "In pharmaceutical innovation, identifying repurposing opportunities for approved molecules requires navigating fragmented ecosystems including regulatory filings, clinical trials, patent landscapes, scientific publications, and market intelligence. Traditional platforms retrieve documents; this system must orchestrate retrieval, reasoning, and structured synthesis across domains. The intelligence lies in the orchestration layer that coordinates modular research workflows and produces traceable innovation insights.",
        problemStatement: [
            "Design an intelligent research platform that accepts a molecule name as input.",
            "Autonomously orchestrate multi-domain investigation workflows.",
            "Retrieve structured and unstructured data in real time.",
            "Synthesize cross-domain insights into a unified analytical perspective.",
            "Generate a traceable innovation opportunity report with verifiable sources."
        ],
        keyChallenges: [
            "Research Fragmentation: Integrate structured data (patents, market trends) with unstructured data (scientific literature, regulatory narratives).",
            "Task Orchestration: Coordinate modular research tasks (clinical, patent, market, regulatory) without relying on a monolithic prompt.",
            "Traceability: Ensure every synthesized insight references its original source.",
            "Context Continuity: Maintain memory across research stages for coherent cross-domain reasoning.",
            "Data Heterogeneity: Handle APIs, PDFs, and text datasets without analytical inconsistency."
        ],
        baselineRequirements: [
            "Query Decomposition: Accept molecule-level input and break into domain-specific subtasks (Clinical Analysis, Patent Review, Market Assessment, Regulatory Scan).",
            "Multi-Source Retrieval: Retrieve and analyze data from at least two independent sources (API, simulated dataset, or public database).",
            "Contextual Synthesis: Integrate domain findings into a unified cross-domain insight framework.",
            "Source Citation: Provide clear traceable references for all reported findings.",
            "Structured Reporting: Generate a formatted innovation opportunity report summarizing unmet needs, clinical pipeline status, patent expiry landscape, market potential, and strategic viability."
        ]
    },
    {
        id: 10,
        title: "The Code Insight Engine: AI-Driven Developer Intelligence System",
        domain: "AI/ML",
        company: "Developer Student Community",
        logo: "/DSC_logo.png",
        shortDescription: "AI-powered development analytics engine connecting business intent to code impact with explainable performance intelligence.",
        overview: "Modern software teams rely on subjective effort estimation and performance evaluation. Raw commits and ticket counts fail to capture requirement intent, architectural impact, or evolving delivery complexity. This challenge requires building a continuous intelligence layer that maps business requirements to implementation changes, estimates functional effort, and translates development signals into measurable, explainable impact insights.",
        problemStatement: [
            "Design an intelligent development analytics system that accepts business requirements and evolving code activity as inputs.",
            "Map requirement intent to actual implementation changes.",
            "Estimate development effort based on functional complexity.",
            "Generate objective contribution insights from observable development signals.",
            "Produce transparent, explainable performance indicators."
        ],
        keyChallenges: [
            "Requirement-Code Alignment: Link business requirement documents and change requests to actual code modifications.",
            "Effort Estimation Logic: Estimate effort based on functional complexity rather than commit volume.",
            "Impact Differentiation: Distinguish high-impact architectural work from routine updates.",
            "Workload & Overtime Detection: Identify overload, imbalance, and sustained overtime patterns.",
            "Bias Reduction: Provide explainable metrics reducing subjective evaluation.",
            "Technical-to-Business Translation: Convert engineering activity into manager-friendly summaries.",
            "Knowledge Continuity Detection: Identify contributors with concentrated system expertise."
        ],
        baselineRequirements: [
            "Project Intake: Accept requirement documents, ingest commits/tasks/timelines, and identify roles or ownership.",
            "Requirement–Code Mapping: Associate implemented changes with requirement fulfillment and interpret change impact.",
            "Effort Estimation: Estimate planned functionality effort and dynamically update as development progresses.",
            "Developer Intelligence Metrics: Generate efficiency metrics, workload distribution, overtime contribution, performance trends, and contribution impact over time.",
            "Impact Interpretation: Translate technical changes into managerial contribution summaries.",
            "Transparency Indicators: Provide explainable scoring models for recognition or growth assessment.",
            "Knowledge Risk Detection: Highlight expertise concentration and flag continuity risks if key contributors exit.",
            "Activity Log: Maintain structured project and contribution tracking records."
        ]
    },
    {
        id: 11,
        title: "The Self-Healing Supply Chain: Intelligent BOM Shock Predictor",
        domain: "AI/ML",
        company: "Developer Student Community",
        logo: "/DSC_logo.png",
        shortDescription: "ML-powered predictive engine detecting supply shocks and recommending technically compliant substitute components.",
        overview: "In advanced manufacturing, a single microchip or specialty alloy buried deep within a Bill of Materials (BOM) can halt an entire production line. Engineers currently react by manually scanning datasheets for substitutes — a slow and high-risk process. This challenge requires building a predictive intelligence engine that detects supply shocks early and computationally evaluates technical equivalency to recommend safe, compliant substitute components.",
        problemStatement: [
            "Design an ML-driven system that ingests a structured Bill of Materials (BOM).",
            "Monitor external supply risk signals and predict component-level shortages.",
            "Compute functional equivalency across technical specifications.",
            "Recommend viable and compliant substitute components.",
            "Transition procurement from reactive crisis handling to predictive substitution."
        ],
        keyChallenges: [
            "N-Tier Risk Mapping: Map external disruptions (e.g., supplier shutdowns) to deeply nested BOM components.",
            "Technical Parameter Matching: Interpret functional constraints such as tolerance ranges, voltage limits, and material properties.",
            "Data Normalization: Convert unstructured datasheets and fragmented supplier data into structured, queryable formats.",
            "Similarity Scoring Logic: Build an ML-based equivalency model rather than simple keyword matching.",
            "Hierarchical Dependency Modeling: Maintain relational links across multi-level BOM structures."
        ],
        baselineRequirements: [
            "BOM Ingestion: Accept structured BOM (JSON/CSV) and store hierarchical relationships in a relational database.",
            "Risk Alerting: Process simulated supply shock feed and flag impacted components precisely.",
            "ML Equivalency Engine: Parse technical specifications, compute functional equivalency scores, and recommend top substitute parts.",
            "Database Normalization: Store supplier data, parameters, and component metadata in structured format.",
            "Substitution Interface: Provide dashboard where user inputs failing component ID and receives ranked substitute parts with compatibility scores."
        ]
    }
];

// Domain-based color mapping
const domainStyles: Record<string, { border: string; text: string; accent: string }> = {
    "ML":           { border: "border-blue-500/40",   text: "text-blue-400",   accent: "bg-blue-500" },
    "Agentic AI":   { border: "border-purple-500/40", text: "text-purple-400", accent: "bg-purple-500" },
    "Data Analytics":{ border: "border-cyan-500/40",  text: "text-cyan-400",   accent: "bg-cyan-500" },
    "IoT":          { border: "border-green-500/40",  text: "text-green-400",  accent: "bg-green-500" },
    "Blockchain":   { border: "border-amber-500/40",  text: "text-amber-400",  accent: "bg-amber-500" },
    "AI/ML":        { border: "border-rose-500/40",   text: "text-rose-400",   accent: "bg-rose-500" },
};

function getDomainStyle(domain: string) {
    return domainStyles[domain] ?? { border: "border-white/20", text: "text-white/60", accent: "bg-white" };
}

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
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.05]);
    const style = getDomainStyle(problem.domain);

    return (
        <motion.div
            ref={cardRef}
            style={{ scale }}
            onClick={onClick}
            className={`sticky top-24 mb-16 last:mb-0 w-full rounded-3xl overflow-hidden cursor-pointer group bg-gradient-to-b from-white/5 to-black border ${style.border} hover:shadow-2xl transition-all duration-300 md:h-72`}
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
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${problem.company}&background=random`; }}
                            />
                        </div>
                        <div>
                            <span className="text-white/60 text-xs uppercase tracking-wider font-bold block mb-1">Partner</span>
                            <span className="text-white font-semibold text-lg">{problem.company}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border bg-black/50 w-fit ${style.border} ${style.text}`}>
                            {problem.domain}
                        </span>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-black/50 w-fit ${style.border}`}>
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
    );
}

/* ====================================================
   MAIN COMPONENT
==================================================== */

export default function ProblemStatementsClient({ submissionStats }: { submissionStats: Record<string, number> }) {
    const [selectedProblem, setSelectedProblem] = useState<typeof problemStatements[0] | null>(null);

    const filteredProblems = problemStatements;

    useEffect(() => {
        document.body.style.overflow = selectedProblem ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [selectedProblem]);

    return (
        <div className="relative w-full min-h-screen bg-black text-white selection:bg-white/20">
            <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-50">
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

            {/* MODAL */}
            <AnimatePresence>
                {selectedProblem && (() => {
                    const style = getDomainStyle(selectedProblem.domain);
                    return (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12 bg-black/80 backdrop-blur-2xl"
                            onClick={() => setSelectedProblem(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className={`relative w-full max-w-6xl max-h-[92vh] md:max-h-[85vh] bg-[#0a0a0a] border ${style.border} rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10`}
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
                                    <div className={`absolute top-0 left-0 w-full h-1 ${style.accent} opacity-60`} />

                                    <div>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-black/50 mb-6 ${style.border}`}>
                                            <IconUsers size={16} className="text-white/70" />
                                            <span className="text-sm font-semibold text-white/90">
                                                {submissionStats[selectedProblem.title] || 0} Submissions
                                            </span>
                                        </div>

                                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                            {selectedProblem.title}
                                        </h2>

                                        <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5 w-fit shadow-inner">
                                            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                                                <img
                                                    src={selectedProblem.logo}
                                                    className="w-full h-full object-contain"
                                                    alt={selectedProblem.company}
                                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedProblem.company}&background=random`; }}
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
                                                        <span className={`text-xl font-black opacity-50 font-mono select-none ${style.text}`}>
                                                            0{i + 1}
                                                        </span>
                                                        <span className="opacity-90 leading-relaxed pt-1 whitespace-pre-line">{s}</span>
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
                                                        <div className={`absolute top-0 left-0 w-full h-1 ${style.accent} opacity-30 group-hover:opacity-70 transition-opacity`} />
                                                        {r}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        <section>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="h-[1px] flex-1 bg-white/10" />
                                                <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-black">
                                                    Baseline Requirements
                                                </h4>
                                                <div className="h-[1px] flex-1 bg-white/10" />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {selectedProblem.baselineRequirements.map((r, i) => (
                                                    <div key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed">
                                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${style.accent} opacity-60`} />
                                                        <span>{r}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}
