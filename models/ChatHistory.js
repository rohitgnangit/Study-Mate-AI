import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ChatHistorySchema = new Schema({
    userId: {type: String, required: true},
    fileId: {type: String, required: true},
    messages: [
        {
        sender: { type: String, enum: ['user', 'ai'], required: true },
        text: {type:String, required: true },
        createdAt: {type: Date, default: Date.now }
        }
    ],
    updatedAt: { type: Date, default: Date.now }
});

export default models?.ChatHistory || model("ChatHistory", ChatHistorySchema);