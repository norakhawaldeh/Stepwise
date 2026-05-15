import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";

const app = express();
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post("/api/estimate-time", async (req, res) => {
  try {
    const { subject, title, details, selectedDate } = req.body;

    if (!subject || !title || !details) {
      return res.status(400).json({ error: "Subject, title, and details are required." });
    }

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: `
You are Stepwise, a student assignment planning assistant.

Estimate how long this assignment will take in total.

Subject/Class: ${subject}
Assignment Name: ${title}
Assignment Details: ${details}
Due Date: ${selectedDate || "not provided"}

Rules:
- Estimate total work time in minutes.
- Be realistic for a college student.
- Do not overestimate dramatically.
- Do not underestimate large assignments.
- Return only structured JSON.
      `,
      text: {
        format: {
          type: "json_schema",
          name: "time_estimate",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              estimatedMinutes: { type: "number" },
              shortReason: { type: "string" }
            },
            required: ["estimatedMinutes", "shortReason"]
          }
        }
      }
    });

    const estimate = JSON.parse(response.output_text);
    res.json(estimate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to estimate time." });
  }
});

app.post("/api/generate-plan", async (req, res) => {
  try {
    const { subject, title, details, days, selectedDate, estimatedMinutes } = req.body;

    if (!subject || !title || !details) {
      return res.status(400).json({ error: "Subject, title, and details are required." });
    }

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: `
You are Stepwise, a study planning assistant for students.

Create a realistic assignment plan.

Subject/Class: ${subject}
Assignment Name: ${title}
Assignment Details: ${details}
Number of days to spread it across: ${days}
Due Date: ${selectedDate || "not provided"}
Confirmed total estimated time: ${estimatedMinutes || "not provided"} minutes

Rules:
- Break the work into small, clear subtasks.
- Each subtask should be doable in one sitting.
- Put subtasks across the available days.
- Use estimated minutes between 15 and 90 per subtask.
- Make the plan specific to the actual assignment details.
- Use the confirmed total estimated time as a guide.
- Do not include vague steps like "work on assignment."
- Return only structured JSON.
      `,
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
                    dayNumber: { type: "number" }
                  },
                  required: ["text", "time", "dayNumber"]
                }
              }
            },
            required: ["subject", "assignmentTitle", "subtasks"]
          }
        }
      }
    });

    const plan = JSON.parse(response.output_text);
    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate plan." });
  }
});

app.listen(3001, () => {
  console.log("AI server running on http://localhost:3001");
});