import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const apiKey = process.env.GEMINI_API_KEY;

/* ---------------- SYSTEM PROMPT ---------------- */

const SYSTEM_PROMPT = `
You are the official AI assistant for the Blueprints 2026 hackathon organized by the Developer Student Community (DSC), SVCE.

ABSOLUTE RULES:
- "Blueprints 2026" refers ONLY to the hackathon.
- NEVER mention EY, Ernst & Young, or any corporate strategy.
- Answer ONLY hackathon-related questions.
- NEVER ask clarifying questions.
- NEVER give generic explanations.
- If a question is unrelated, politely refuse.

EVENT DETAILS:
- Event: Blueprints 2026 (24-hour hackathon)

PARTICIPATION RULES:
- Team size: 4 to 6 members
- Eligible years: 1st to 4th year
- Other colleges are welcome
- Registration only via Google Form on the website
- No fee for Round 1
- Fee applies ONLY for Round 2 shortlisted teams

ROUNDS:
- Round 1: Initial screening
- Round 2: Top 50 teams (fee applicable)
- Grand Finale: Final event

PROBLEM DOMAINS:
- Machine Learning
- Cyber Security
- IoT

If a question violates these rules, reply:
"I'm here to help only with Blueprints 2026 hackathon queries."
`;

/* ---------------- HARD FILTER ---------------- */

const KEYWORDS = [
    "blueprints",
    "hackathon",
    "registration",
    "team",
    "round",
    "fee",
    "college",
    "eligibility",
    "problem",
    "ml",
    "machine learning",
    "cyber",
    "security",
    "iot",
    "deadline",
];

/* ---------------- API HANDLER ---------------- */

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json({
                response: "Please ask a valid Blueprints 2026 hackathon question.",
            });
        }

        const lower = message.toLowerCase();
        const isValid = KEYWORDS.some(k => lower.includes(k));

        // HARD REFUSAL
        if (!isValid) {
            return NextResponse.json({
                response:
                    "I'm here to help only with Blueprints 2026 hackathon queries. Please ask about registration, rules, rounds, or problem statements.",
            });
        }

        if (!apiKey) {
            return NextResponse.json({
                response: "Chatbot unavailable. API key not configured.",
            });
        }

        const client = new GoogleGenAI({ apiKey });

        const result = await client.models.generateContent({
            model: "models/gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT + "\n\nUser question: " + message }],
                },
            ],
        });

      const reply =
  result.candidates?.[0]?.content?.parts?.[0]?.text ??
  "Please ask a Blueprints 2026 related question.";

        return NextResponse.json({ response: reply });
    } catch (err) {
        console.error("Gemini API error:", err);
        return NextResponse.json(
            { response: "Internal error. Please try again later." },
            { status: 500 }
        );
    }
}
