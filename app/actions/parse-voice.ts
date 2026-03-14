"use server";

type ParsedExpense = {
  description: string;
  amount: number;
  payerName: string;
  category: string;
  splitMethod: "EQUAL" | "PERCENT" | "CUSTOM";
  splits: { name: string; value: number }[]; // percentage or exact amount per person
  error?: string;
};

export async function parseVoiceExpense(
  transcript: string,
  memberNames: string[],
): Promise<ParsedExpense> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      description: "",
      amount: 0,
      payerName: "",
      category: "OTHER",
      splitMethod: "EQUAL",
      splits: [],
      error: "Gemini API key not configured. Add GEMINI_API_KEY to .env.",
    };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a smart expense parser for a bill-splitting app. Parse this voice transcript into a structured expense.

TRANSCRIPT: "${transcript}"

GROUP MEMBERS: ${memberNames.map((n) => `"${n}"`).join(", ")}

Return ONLY a valid JSON object (no markdown, no code fences):
{
  "description": "Short 3-8 word description of the expense (e.g. 'Dinner at Pizza Hut')",
  "amount": <total amount as a number>,
  "payerName": "<exact name from the GROUP MEMBERS list who paid — match as closely as possible>",
  "category": "<one of: FOOD, TRANSPORT, STAY, ENTERTAINMENT, UTILITIES, SHOPPING, OTHER>",
  "splitMethod": "<EQUAL if no specific split mentioned, PERCENT if percentages mentioned, CUSTOM if exact amounts per person mentioned>",
  "splits": [{"name": "<exact member name>", "value": <percentage or exact amount>}]
}

RULES:
- Match names from the transcript to the closest GROUP MEMBERS name (fuzzy match OK)
- If no split info is given, use "EQUAL" and return an empty splits array
- If percentages are mentioned, splitMethod = "PERCENT" and values should sum to 100
- If exact amounts per person are mentioned, splitMethod = "CUSTOM" and values should sum to total amount
- If you can't parse something, make your best guess
- payerName MUST be an exact match from GROUP MEMBERS`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 512,
          },
        }),
      },
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return {
        description: "",
        amount: 0,
        payerName: "",
        category: "OTHER",
        splitMethod: "EQUAL",
        splits: [],
        error: "AI service error. Check your API key.",
      };
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);

    return {
      description: parsed.description || "",
      amount: Number(parsed.amount) || 0,
      payerName: parsed.payerName || "",
      category: parsed.category || "OTHER",
      splitMethod: parsed.splitMethod || "EQUAL",
      splits: Array.isArray(parsed.splits) ? parsed.splits : [],
    };
  } catch (error) {
    console.error("Voice parse failed:", error);
    return {
      description: "",
      amount: 0,
      payerName: "",
      category: "OTHER",
      splitMethod: "EQUAL",
      splits: [],
      error: "Failed to parse voice input. Try again.",
    };
  }
}
