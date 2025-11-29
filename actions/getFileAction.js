"use server"

import connectDB from "@/db/connectDB";
import FileUpload from "@/models/FileUpload";


export async function getFileAction(email) {
    await connectDB();
    const files = await FileUpload.find({ userId: email}).sort({ createdAt: -1})
    // console.log("Files fetched in getFileAction:", files);
    return JSON.parse(JSON.stringify(files));
}