"use server"

import connectDB from "@/db/connectDB"
import FileUpload from "@/models/FileUpload"
import { extractTextFromPdfUrl } from "@/lib/pdfExtract"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


export async function saveFileAction({ fileUrl, publicId, fileName, fileType, fileSize, userId, filePath}) {

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

    const newFile = await FileUpload.create({
        userId,
        fileName,
        fileUrl,
        fileType,
        fileSize,
        publicId,
        extractedText: rawText,
        chunks: texts || [],
    })
    return JSON.parse(JSON.stringify(newFile));
}
