"use server";

type ScanResult = {
  description: string;
  amount: number;
  items: { name: string; amount: number }[];
  error?: string;
};

export async function scanBill(base64Image: string): Promise<ScanResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      description: "",
      amount: 0,
      items: [],
      error: "Gemini API key not configured. Add GEMINI_API_KEY to your .env file.",
    };
  }

  try {
    // Strip data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

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
                  text: `Analyze this receipt/bill image. Extract the following information and return ONLY a valid JSON object with no markdown formatting, no code fences, no extra text:
{
  "description": "A short 3-6 word description of what the bill is for (e.g. 'Dinner at Pizza Hut', 'Grocery shopping', 'Uber ride')",
  "amount": <total amount as a number, no currency symbols>,
  "currency": "INR or USD or the currency shown",
  "items": [{"name": "item name", "amount": <number>}]
}
If you cannot read the image or it's not a receipt, return:
{"description": "", "amount": 0, "currency": "INR", "items": [], "error": "Could not read bill"}`,
                },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1024,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return {
        description: "",
        amount: 0,
        items: [],
        error: "AI service returned an error. Check your API key.",
      };
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Parse the JSON response, stripping any markdown fences
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      description: parsed.description || "",
      amount: Number(parsed.amount) || 0,
      items: Array.isArray(parsed.items) ? parsed.items : [],
      error: parsed.error,
    };
  } catch (error) {
    console.error("Bill scan failed:", error);
    return {
      description: "",
      amount: 0,
      items: [],
      error: "Failed to process the receipt. Try a clearer photo.",
    };
  }
}
