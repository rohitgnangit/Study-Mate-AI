import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import ChatHistory from "@/models/ChatHistory";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const fileId = searchParams.get("fileId");

        const chat = await ChatHistory.findOne({ userId, fileId });

        return NextResponse.json({ messages: chat?.messages || [] });
    } catch (error) {
        console.log("Get Chat ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}