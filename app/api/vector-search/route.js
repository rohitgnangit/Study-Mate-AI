import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import AIEmbeddings from "@/models/AIEmbeddings";

export async function POST(req) {
  try {
    await connectDB();

    const { questionEmbedding, fileId, userId } = await req.json();

    if (!questionEmbedding || !fileId || !userId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Vector Search using MongoDB's $vectorSearch aggregation
    const results = await AIEmbeddings.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: questionEmbedding,
          numCandidates: 200,
          limit: 5
        }
      },
      { $match: { fileId, userId } }, 
      {
        $project: {
          _id: 0,
          text: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ]);

    return NextResponse.json({ results });

  } catch (error) {
    console.log("VECTOR SEARCH ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
