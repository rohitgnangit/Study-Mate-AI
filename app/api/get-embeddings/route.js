import { getQuestionEmbeddings } from "@/lib/embeddings"

// Sending question to getQuestionEmbeddings
export async function POST(req) {
    const { question } = await req.json();
    const embeddings = await getQuestionEmbeddings(question);

    return Response.json({ embeddings })
}