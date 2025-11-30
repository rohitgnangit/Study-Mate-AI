import { NextResponse } from "next/server";
import OpenAI from "openai";


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
    try {
        const {question, chunks } = await req.json();

        // Combining top chunks into context
        const context = chunks.map((c) =>
      `• ${c.text}`
        ).join("\n\n");

        // Build final prompt
        const prompt = `You are a helpful study assistant. 
Use ONLY the following context to answer the question.
If the answer is not in the context, say "I don't see this information in the provided notes."

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