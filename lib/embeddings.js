import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function getEmbedding(textArray) {
    if(!Array.isArray(textArray)) {
        throw new Error("getEmbedding expects an array of text chunks");
    }

    const response = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: textArray,
    });
    return response.data.map(item => item.embedding);
}

export async function getQuestionEmbeddings(question) {

    const response = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: question,
    });
    
    const embedding = response.data[0].embedding;
    return embedding;
}

