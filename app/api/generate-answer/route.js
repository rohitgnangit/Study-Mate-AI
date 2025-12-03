import { NextResponse } from "next/server";
import OpenAI from "openai";


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
    try {
        const { question, chunks } = await req.json();

        // Combining top chunks into context
        const context = chunks.map((c) =>
            `• ${c.text}`
        ).join("\n\n");

        // Build final prompt
        const prompt = `
You are a helpful study assistant. 
Use ONLY the following context to answer the question.
Your answer MUST follow this exact structured format:

1. **Definition**
   - Give a clear 2–3 line definition.

2. **Headings / Key Points**
   - Convert all important headings from the context into a numbered list.
   - Format like:
     1. Heading One
     2. Heading Two
     3. Heading Three

3. **Detailed Explanation**
   - For each numbered heading, provide a short explanation (3–4 lines).
   - Use the SAME numbers again. Example:
     1. **Heading One:** Explanation here...
     2. **Heading Two:** Explanation here...

4. **Summary**
   - Provide a 1–2 line conclusion.

If the answer is not found in the provided context,
say: "I don't see this information in the provided notes."

--------------------
Context:
${context}

Question: ${question}

Answer:
`;


        //  Calling the OpenAI
        const response = await client.responses.create({
            model: "gpt-4.1-mini",
            input: prompt,
        })

        const answer = response.output_text || response.output[0].content[0].text;
        return NextResponse.json({ answer });

    } catch (error) {
        console.log("Answer Generation ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}