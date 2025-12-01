import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import ChatHistory from "@/models/ChatHistory";


export async function POST(req) {
    try {
        await connectDB();
        const { userId, fileId, sender, text } = await req.json();
        
        // Finding existing chat for this file & user
        let chat = await ChatHistory.findOne({ userId, fileId});

        // If no chat exists, create new. Else, update existing chat
        if(!chat) {
            chat = await ChatHistory.create({
                userId,
                fileId,
                messages: [{ sender, text }],
            });
        } else {
            chat.messages.push({ sender, text });
            chat.updatedAt = Date.now();
            await chat.save();
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("Save Message ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}