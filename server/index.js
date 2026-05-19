import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Fix: pdf-parse exports a function in CJS but ESM interop can wrap it in an object
const _pdfLib = require("pdf-parse");
const pdf = typeof _pdfLib === "function" ? _pdfLib : (_pdfLib.default ?? _pdfLib);

const app = express();
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json({ limit: "100mb" }));

// ── Helpers ────────────────────────────────────────────────────────────────

function dataUrlToBuffer(dataUrl) {
  const base64 = dataUrl.split(",")[1];
  return Buffer.from(base64, "base64");
}

// Extract text from ALL attached PDFs, no hard char limit per file
async function extractPdfText(files = []) {
  const pdfFiles = files.filter(
    (file) => file.type === "application/pdf" && file.data
  );

  if (!pdfFiles.length) return null;

  const results = [];

  for (const file of pdfFiles) {
    try {
      const buffer = dataUrlToBuffer(file.data);
      const result = await pdf(buffer);
      const text = result.text?.trim();

      if (text) {
        // Keep up to 20,000 chars per PDF so large docs don't get silently truncated
        results.push(`=== PDF: ${file.name} ===\n${text.slice(0, 20000)}`);
      } else {
        results.push(`=== PDF: ${file.name} === (no extractable text — may be scanned)`);
      }
    } catch (err) {
      console.error(`Failed to parse PDF "${file.name}":`, err.message);
      results.push(`=== PDF: ${file.name} === (could not be parsed)`);
    }
  }

  return results.join("\n\n");
}

// Build a human-readable list of all attached files
function buildFileSummary(files = []) {
  if (!files.length) return "No uploaded files.";
  return files
    .map((f, i) => `${i + 1}. ${f.name || "unnamed"} (${f.type || "unknown"})`)
    .join("\n");
}

// Return image content blocks for the Responses API
function buildImageInputs(files = []) {
  return files
    .filter((f) => f.type?.startsWith("image/") && f.data)
    .map((f) => ({
      type: "input_image",
      image_url: f.data, // full data-URL: "data:image/png;base64,..."
    }));
}

// ── Routes ─────────────────────────────────────────────────────────────────

app.post("/api/estimate-time", async (req, res) => {
  try {
    const { subject, title, details, selectedDate, files = [] } = req.body;

    if (!subject || !title) {
      return res.status(400).json({ error: "Subject and title are required." });
    }

    const fileSummary = buildFileSummary(files);
    const imageInputs = buildImageInputs(files);
    const pdfText = await extractPdfText(files);

    const hasContent = details?.trim() || files.length > 0;
    if (!hasContent) {
      return res.status(400).json({ error: "Please type instructions or upload a file." });
    }

    const prompt = `
You are Rooted, a student assignment planning assistant.

Estimate how long this assignment will take in total.

Subject/Class: ${subject}
Assignment Name: ${title}
Due Date: ${selectedDate || "not specified"}

Typed Instructions from Student:
${details?.trim() || "(none — rely on uploaded files below)"}

Uploaded Files (${files.length}):
${fileSummary}

${pdfText ? `Extracted PDF Text:\n${pdfText}` : ""}

${imageInputs.length > 0 ? `The student also attached ${imageInputs.length} screenshot(s). Read them carefully — they likely contain the actual assignment instructions.` : ""}

Rules:
- If screenshots are attached, carefully read every visible word in them and use the instructions shown.
- If PDFs are attached and text was extracted, use that text.
- Even if instructions are brief or only visual, make a specific realistic estimate.
- Be realistic for a college student completing this outside of class.
- Return only structured JSON with estimatedMinutes (number) and shortReason (string, 1–2 sentences max).
`.trim();

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            ...imageInputs,
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "time_estimate",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              estimatedMinutes: { type: "number" },
              shortReason: { type: "string" },
            },
            required: ["estimatedMinutes", "shortReason"],
          },
        },
      },
    });

    const estimate = JSON.parse(response.output_text);
    res.json(estimate);
  } catch (error) {
    console.error("estimate-time error:", error);
    res.status(500).json({ error: "Failed to estimate time." });
  }
});

// ──────────────────────────────────────────────────────────────────────────

app.post("/api/generate-plan", async (req, res) => {
  try {
    const {
      subject,
      title,
      details,
      files = [],
      days,
      selectedDate,
      estimatedMinutes,
    } = req.body;

    if (!subject || !title) {
      return res.status(400).json({ error: "Subject and title are required." });
    }

    const hasContent = details?.trim() || files.length > 0;
    if (!hasContent) {
      return res.status(400).json({ error: "Please type instructions or upload a file." });
    }

    const fileSummary = buildFileSummary(files);
    const imageInputs = buildImageInputs(files);
    const pdfText = await extractPdfText(files);

    const prompt = `
You are Rooted, a study planning assistant for college students.

Create a detailed, specific assignment plan based on the information below.

Subject/Class: ${subject}
Assignment Name: ${title}
Due Date: ${selectedDate || "not specified"}
Days available to spread the work: ${days || 1}
Total estimated time: ${estimatedMinutes ? `${estimatedMinutes} minutes` : "not specified"}

Typed Instructions from Student:
${details?.trim() || "(none — rely on uploaded files below)"}

Uploaded Files (${files.length}):
${fileSummary}

${pdfText ? `Extracted PDF Text:\n${pdfText}` : ""}

${imageInputs.length > 0 ? `The student attached ${imageInputs.length} screenshot(s). Read every word carefully. These images likely contain the exact assignment instructions — treat them as the primary source.` : ""}

Rules:
- If screenshots are attached, read them first and base the plan entirely on what the instructions say.
- If PDF text was extracted, use the actual content to create specific subtasks (e.g., answer specific questions, read specific chapters, write specific sections).
- If only typed instructions exist, use those to create a specific plan.
- NEVER create vague steps like "work on assignment" or "study material." Every step must name what the student actually does.
- Each subtask should take 15–90 minutes.
- Spread subtasks sensibly across the ${days || 1} available day(s).
- The sum of subtask times should roughly equal the total estimated time.
- dayNumber must be between 1 and ${days || 1} (inclusive).
- Return only valid structured JSON.
`.trim();

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            ...imageInputs,
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "stepwise_plan",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              subject: { type: "string" },
              assignmentTitle: { type: "string" },
              subtasks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    text: { type: "string" },
                    time: { type: "string" },
                    dayNumber: { type: "number" },
                  },
                  required: ["text", "time", "dayNumber"],
                },
              },
            },
            required: ["subject", "assignmentTitle", "subtasks"],
          },
        },
      },
    });

    const plan = JSON.parse(response.output_text);
    res.json(plan);
  } catch (error) {
    console.error("generate-plan error:", error);
    res.status(500).json({ error: "Failed to generate plan." });
  }
});

// ──────────────────────────────────────────────────────────────────────────

app.listen(3001, () => {
  console.log("AI server running on http://localhost:3001");
});