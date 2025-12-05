"use server"

import connectDB from "@/db/connectDB";
import FileUpload from "@/models/FileUpload";
import AIEmbeddings from "@/models/AIEmbeddings";
import ChatHistory from "@/models/ChatHistory";
import { revalidatePath } from "next/cache";

export async function deleteFileAction(formData) {
    await connectDB();
    const fileId = formData.get("fileId")
    const deletedFile = await FileUpload.findByIdAndDelete(fileId);
    const deletedEmbeddings = await AIEmbeddings.deleteMany({ fileId })
    const deletedChat = await ChatHistory.deleteMany({ fileId })
    revalidatePath('/home');
    return { success: true};
}