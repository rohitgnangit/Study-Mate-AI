"use server"

import connectDB from "@/db/connectDB"
import FileUpload from "@/models/FileUpload"

export async function saveFileAction({ fileUrl, publicId, fileName, fileType, fileSize, userId}) {

    await connectDB();

    const newFile = await FileUpload.create({
        userId,
        fileName,
        fileUrl,
        fileType,
        fileSize,
        publicId,
    })
    return ({success : true});
}