"use server"

import connectDB from "@/db/connectDB"
import FileUpload from "@/models/FileUpload"
import { extractTextFromPdfUrl } from "@/lib/pdfExtract"



export async function saveFileAction({ fileUrl, publicId, fileName, fileType, fileSize, userId, filePath}) {

    await connectDB();

    let extractedTextFromUrl = "";
    if(fileType === "application/pdf") {
        extractedTextFromUrl = await extractTextFromPdfUrl(fileUrl);
    }

    const newFile = await FileUpload.create({
        userId,
        fileName,
        fileUrl,
        fileType,
        fileSize,
        publicId,
        extractedText: extractedTextFromUrl,
    })
    return JSON.parse(JSON.stringify(newFile));
}
