"use server"

import connectDB from "@/db/connectDB"
import FileUpload from "@/models/FileUpload"
import { extractTextFromPdfUrl } from "@/lib/pdfExtract"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEmbedding } from "@/lib/embeddings";
import { revalidatePath } from "next/cache";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";


export async function saveFileAction({ fileUrl, publicId, fileName, fileType, fileSize, userId, filePath}) {
    // const session = await getServerSession(authOptions);

    await connectDB();

    let rawText = "";
    if(fileType === "application/pdf") {
       const pdfData = await extractTextFromPdfUrl(fileUrl);
       rawText = pdfData;
    }

    // Converting Extracted text into Chunks
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 800, chunkOverlap: 80 })
    const texts = await splitter.splitText(rawText)
    console.log("📚 Split into", texts.length, "chunks");

    // Generating Embeddings for each chunk
    const batchSize = 100;
    const chunksWithEmbeddings = [];
    for(let i=0;i<texts.length;i+=batchSize) {
        const batch = texts.slice(i, i + batchSize);
        const embeddingVector = await getEmbedding(batch);
        // combine the chunks with its vectors for saving
        batch.forEach((text, index) => {
            chunksWithEmbeddings.push({
                text: text,
                embedding: embeddingVector[index],  // Clean vector array
                index: i + index
            })
        })
    }
    
    console.log("⚙️ Generated embeddings for chunks", chunksWithEmbeddings.length);
    
    
    const newFile = await FileUpload.create({
        userId,
        fileName,
        fileUrl,
        fileType,
        fileSize,
        publicId,
        extractedText: rawText,
        chunks: chunksWithEmbeddings,
    })
    revalidatePath("/home"); 
    return JSON.parse(JSON.stringify(newFile));
}
