import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); 

export async function getEmbedding(texts) { 
    // Ensure input is always an array of texts for efficient batching
    const contents = Array.isArray(texts) ? texts : [texts]; 

    if (contents.length === 0) return [];

    try {
        const response = await ai.models.embedContent({
            model: "gemini-embedding-001", // embedding model
            contents: contents, // Sending all chunks in one batch
        });
        
        // The API returns an array of embedding objects. We extract the values.
        return response.embeddings.map(embedding => embedding.values); 

    } catch (error) {
        console.error("Gemini API Embedding Error:", error);
        throw new Error("Failed to generate Gemini embeddings. Check your API key and network connection.");
    }
}