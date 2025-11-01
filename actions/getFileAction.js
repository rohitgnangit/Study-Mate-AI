"use server"

import connectDB from "@/db/connectDB";
import FileUpload from "@/models/FileUpload";


export async function getFileAction() {
    await connectDB();
    const files = await FileUpload.find().sort({ createdAt: -1})
    // console.log("Files fetched in getFileAction:", files);
    return JSON.parse(JSON.stringify(files));
}