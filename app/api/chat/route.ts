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
RESPONSE FORMAT RULES (VERY IMPORTANT):
- NEVER use markdown syntax of any kind — no #, ##, ###, **, *, _, __, ~~, >, \`, or bullet symbols like - or *.
- Use plain text only.
- Use line breaks to separate points.
- For lists, number them like: 1. 2. 3. or write them as plain sentences.
- Keep responses clean, short, and website-friendly.
- Do NOT use bold, italic, headers, or any formatting characters.
EVENT DETAILS:
- Event: Blueprints 2026 (24-hour hackathon)
PARTICIPATION RULES:
- Team size: 4 to 6 members
- Eligible years: 1st to 4th year
- Other colleges are welcome
- Registration only via Google Form on the website
- No fee for Round 1 and Round 2 
- Fee of ₹450 applies ONLY for teams that qualify for the Grand Finale
ROUNDS:
- Round 1: Initial screening (no fee)
- Round 2: Top 50 teams (no fee)
- Grand Finale: Final event (fee applicable only for finalists)

VENUE:
- The Grand Finale will be held at Tekclan Software Solutions Pvt Ltd.
PROBLEM DOMAINS:
- Machine Learning
- Cyber Security
- IoT
If a question violates these rules, reply:
"I'm here to help only with Blueprints 2026 hackathon queries."
`;
/* ---------------- MARKDOWN STRIPPER ---------------- */
function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s*/g, "")        // remove # headings
    .replace(/\*\*(.+?)\*\*/g, "$1")  // remove **bold**
    .replace(/\*(.+?)\*/g, "$1")      // remove *italic*
    .replace(/__(.+?)__/g, "$1")      // remove __bold__
    .replace(/_(.+?)_/g, "$1")        // remove _italic_
    .replace(/~~(.+?)~~/g, "$1")      // remove ~~strikethrough~~
    .replace(/`{1,3}[^`]*`{1,3}/g, "") // remove `code`
    .replace(/^\s*[-*+]\s+/gm, "")   // remove bullet points - * +
    .replace(/^\s*>\s*/gm, "")        // remove blockquotes >
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // remove [links](url) → just text
    .replace(/\n{3,}/g, "\n\n")       // collapse excess blank lines
    .trim();
}
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
  "member",
  "participate",
  "domain",
  "prize",
  "winners",
  "submit",
  "dsc",
  "svce",
  "venue",
  "location",
  "tekclan",
  "where",
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
    const isValid = KEYWORDS.some((k) => lower.includes(k));
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
    const raw =
      result.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Please ask a Blueprints 2026 related question.";

    // Strip any markdown the model sneaks in despite instructions
    const reply = stripMarkdown(raw);

    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { response: "Internal error. Please try again later." },
      { status: 500 }
    );
  }
}
